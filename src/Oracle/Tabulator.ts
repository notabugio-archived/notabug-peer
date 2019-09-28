import * as R from 'ramda';
import { query, all } from '@notabug/gun-scope';
import { Config } from '../Config';
import { GunNode } from '../GunNode';
import { Schema } from '../Schema';
import { Query } from '../Query';
import { ThingDataNode } from '../Thing';
import { CommentCommand } from '../CommentCommand';
import { ThingQueue } from './ThingQueue';
import { ThingVoteCountsType } from '../types';

const tabulate = query(async (scope, thingId) => {
  if (!thingId) return null;
  const [up, down, comment, replySouls] = await all([
    scope.get(Schema.ThingVotesUp.route.reverse({ thingId })).count(),
    scope.get(Schema.ThingVotesDown.route.reverse({ thingId })).count(),
    scope.get(Schema.ThingAllComments.route.reverse({ thingId })).count(),
    scope.get(Schema.ThingComments.route.reverse({ thingId })).souls()
  ]);
  const thingData = await Query.thingDataFromSouls(scope, replySouls);
  const result: ThingVoteCountsType = {
    up,
    down,
    comment,
    replies: replySouls.length,
    score: up - down
  };

  if (thingData) {
    const commandMap = CommentCommand.map(thingData);
    if (R.keys(commandMap).length) result.commands = JSON.stringify(commandMap);
  }

  return result;
});

class TabulatorQueue extends ThingQueue {
  async processNext() {
    if (this.processingId) return;
    const thingId = (this.processingId = this.dequeue());
    if (!thingId) return;

    const countsSoul = Schema.ThingVoteCounts.route.reverse({
      thingId,
      tabulator: this.user.pub
    });

    try {
      const scope = this.peer.newScope(this.scopeOpts);
      const [existingCounts, data] = await all([
        scope.get(countsSoul).then(),
        scope
          .get(Schema.Thing.route.reverse({ thingId }))
          .get('data')
          .then()
      ]);
      const opId = ThingDataNode.opId(data);
      const replyToId = ThingDataNode.replyToId(data);

      const updatedCounts = await tabulate(scope, thingId);
      const diff = GunNode.diff(existingCounts, updatedCounts);
      if (R.keysIn(diff).length) {
        await new Promise(ok => this.peer.gun.get(countsSoul).put(diff, ok));
      }
      if (replyToId && replyToId !== thingId) this.enqueue(opId);
    } catch (e) {
      console.error('Tabulator error', thingId, e.stack || e);
    }

    console.log('tabulated', this.processingId);

    this.processingId = '';
  }

  onPut(msg: any) {
    R.compose(
      R.map(R.tap(([id, isNew]: [string, boolean]) => id && this.enqueue(id, isNew))),
      R.uniqBy(R.nth(0) as (i: any) => any),
      R.map((soul: string) => {
        const meta = R.pathOr({}, ['put', soul, '_', '>'], msg);
        if (R.prop('@', msg)) return [];
        const latest = R.values(meta)
          .sort()
          .pop();
        const now = new Date().getTime();
        const age = now - latest;
        if (age > Config.oracleMaxStaleness) return [];
        const thingDataMatch = Schema.ThingDataSigned.route.match(soul);
        const votesUpMatch = Schema.ThingVotesUp.route.match(soul);
        const votesDownMatch = Schema.ThingVotesDown.route.match(soul);
        const allCommentsMatch = Schema.ThingAllComments.route.match(soul);
        const thingId: string = R.propOr(
          '',
          'thingId',
          thingDataMatch || votesUpMatch || votesDownMatch || allCommentsMatch
        );

        return [thingId, !(votesUpMatch || votesDownMatch || allCommentsMatch)];
      }),
      R.keysIn,
      R.propOr({}, 'put')
    )(msg);
  }
}

export const Tabulator = { Queue: TabulatorQueue, query: tabulate };
