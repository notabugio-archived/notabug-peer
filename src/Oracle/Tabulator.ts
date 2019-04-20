import * as R from 'ramda';
import { query, all } from 'gun-scope';
import { Config } from '../Config';
import { GunNode } from '../GunNode';
import { Schema } from '../Schema';
import { Query } from '../Query';
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
    const tabulator = this.spec.tabulator;
    if (!thingId) return;
    const countsSoul = Schema.ThingVoteCounts.route.reverse({ thingId, tabulator });

    try {
      const scope = this.peer.newScope(this.scopeOpts);
      const existingCounts = await scope.get(countsSoul).then();
      const updatedCounts = await tabulate(scope, thingId);
      const diff = GunNode.diff(existingCounts, updatedCounts);
      if (R.keysIn(diff).length) this.peer.gun.get(countsSoul).put(diff);
    } catch (e) {
      console.error('Tabulator error', thingId, e.stack || e);
    }

    this.processingId = '';
    // tslint:disable-next-line: no-floating-promises
    this.processNext();
  }

  onPut(msg: any) {
    R.compose(
      R.map(R.tap(([id, isNew]: [string, boolean]) => id && this.enqueue(id, isNew))),
      R.uniqBy(R.nth(0) as (i: any) => any),
      R.map((soul: string) => {
        const meta = R.pathOr({}, ['put', soul, '_', '>'], msg);
        const latest = R.values(meta)
          .sort()
          .pop();
        const now = new Date().getTime();
        const age = now - latest;
        if (age > Config.oracleMaxStaleness) return [];
        const thingMatch = Schema.Thing.route.match(soul);
        const votesUpMatch = Schema.ThingVotesUp.route.match(soul);
        const votesDownMatch = Schema.ThingVotesDown.route.match(soul);
        const allCommentsMatch = Schema.ThingAllComments.route.match(soul);
        const commentsMatch = Schema.ThingComments.route.match(soul);
        const thingId: string = R.propOr(
          '',
          'thingId',
          thingMatch || votesUpMatch || votesDownMatch || allCommentsMatch || commentsMatch
        );

        return [thingId, !(votesUpMatch || votesDownMatch || allCommentsMatch || commentsMatch)];
      }),
      R.keysIn,
      R.propOr({}, 'put')
    )(msg);
  }
}

export const Tabulator = { Queue: TabulatorQueue, query: tabulate };
