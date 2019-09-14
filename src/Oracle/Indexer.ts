import * as R from 'ramda';
import { GunScope, ThingDataNodeType, ThingVoteCountsType } from '../types';
import { Config } from '../Config';
import { Query } from '../Query';
import { ListingSort, ListingNode, ListingSpec } from '../Listing';
import { Schema } from '../Schema';
import { ThingDataNode } from '../Thing';
import { ThingQueue } from './ThingQueue';

async function getListings(scope: GunScope, thingId: string) {
  if (!thingId) return [];
  const listings: string[] = [];
  const [data, scores]: [ThingDataNodeType | null, ThingVoteCountsType] = await Promise.all([
    Query.thingData(scope, thingId),
    Query.thingScores(scope, thingId)
  ]);
  if (!data) return [];
  const kind = ThingDataNode.kind(data);
  const authorId = ThingDataNode.authorId(data);
  const topic = ThingDataNode.topic(data)
    .trim()
    .toLowerCase();

  if (kind === 'submission') {
    const domain = ThingDataNode.domain(data);
    const taggedBy = R.compose(
      R.without(['anon']),
      R.keysIn,
      x => (typeof x === 'string' ? {} : x),
      R.propOr({}, 'commands')
    )(scores);

    if (topic) listings.push(`/t/${topic}`);
    if (topic !== 'all') listings.push('/t/all');
    if (domain) listings.push(`/domain/${domain}`);
    if (authorId) {
      listings.push(`/user/${authorId}/submitted`);
      listings.push(`/user/${authorId}/overview`);
    }

    taggedBy.forEach(tagAuthorId => listings.push(`/user/${tagAuthorId}/commented`));
  } else if (kind === 'comment') {
    const opId = ThingDataNode.opId(data);
    const replyToId = ThingDataNode.replyToId(data);
    const isCommand = ThingDataNode.isCommand(data);

    if (opId) listings.push(`/things/${opId}/comments`);
    if (topic) listings.push(`/t/comments:${topic}`);
    if (topic !== 'all') listings.push('/t/comments:all');

    if (replyToId) {
      const replyToThingData = await Query.thingData(scope, replyToId);
      const replyToAuthorId = ThingDataNode.authorId(replyToThingData);

      if (replyToAuthorId) {
        const replyToKind = ThingDataNode.kind(replyToThingData);
        listings.push(`/user/${replyToAuthorId}/replies/overview`);
        if (replyToKind === 'submission') {
          listings.push(`/user/${replyToAuthorId}/replies/submitted`);
        } else if (replyToKind === 'comment') {
          listings.push(`/user/${replyToAuthorId}/replies/comments`);
        }
      }
    }

    if (authorId) {
      listings.push(`/user/${authorId}/comments`);
      listings.push(`/user/${authorId}/overview`);
      if (isCommand) listings.push(`/user/${authorId}/commands`);
      // TODO: update commented
    }
  } else if (kind === 'chatmsg') {
    if (topic) listings.push(`/t/chat:${topic}`);
    if (topic !== 'all') listings.push('/t/chat:all');
  }

  return listings;
}

async function describeThingId(scope: GunScope, thingId: string) {
  if (!thingId) return;
  const spec = ListingSpec.fromSource('');
  const includes: string[] = await getListings(scope, thingId);
  if (!includes.length) return;

  return {
    id: thingId,
    includes,
    sorts: await Promise.all(
      R.toPairs(ListingSort.sorts).map(async ([name, sortFn]) => [
        name,
        await sortFn(scope, thingId, spec)
      ])
    )
  };
}

const descriptionToListingMap = (declarativeUpdate: any) => {
  const id = R.propOr('', 'id', declarativeUpdate);
  const includes: string[] = R.propOr([], 'includes', declarativeUpdate);
  const sorts: [string, number][] = R.propOr([], 'sorts', declarativeUpdate);
  const results = [];

  for (let i = 0; i < includes.length; i++) {
    const listing = includes[i];

    for (let j = 0; j < sorts.length; j++) {
      const [sortName, value] = sorts[j];

      results.push([`${listing}/${sortName}`, [[id, value]]]);
    }
  }

  return results;
};

class IndexerQueue extends ThingQueue {
  async processNext() {
    if (this.processingId) return;
    const id = (this.processingId = this.dequeue());
    if (!id) return;

    const startedAt = new Date().getTime();

    try {
      const scope = this.peer.newScope(this.scopeOpts);
      const description = await describeThingId(scope, id);
      const listingMap: any[] = descriptionToListingMap(description);

      const putData: any = {};

      // tslint:disable-next-line: await-promise
      await Promise.all(
        listingMap.map(async item => {
          const [listingPath, updatedItems]: [string, [string, number][]] = item;
          const soul = ListingNode.soulFromPath(this.user.pub, listingPath);
          const existing = await scope.get(soul).then();
          const diff = await ListingNode.diff(existing, updatedItems, []);
          if (!diff) return;
          putData[listingPath] = {
            _: {
              '#': soul
            },
            ...diff
          };

          return new Promise(ok => this.peer.gun.get(soul).put(diff, ok));
        })
      );

      /*
      if (Object.keys(putData).length) {
        const listingsSoul = Schema.ThingListingsMeta.route.reverse({
          thingId: id,
          tabulator: this.user.pub
        });
        console.log("writing", listingsSoul, putData);
        await new Promise(ok =>
          this.peer.gun.get(listingsSoul).put(putData, ok)
        );
      }
      */
    } catch (e) {
      console.error('Indexer error', e.stack || e);
    }

    const endedAt = new Date().getTime();
    console.log('indexed', (endedAt - startedAt) / 1000, this.length(), id);
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
        const thingDataMatch = Schema.ThingDataSigned.route.match(soul);
        const countsMatch = Schema.ThingVoteCounts.route.match(soul);
        const thingId: string = R.propOr(
          '',
          'thingId',
          thingMatch || thingDataMatch || countsMatch
        );

        return [thingId, !countsMatch];
      }),
      R.keysIn,
      R.propOr({}, 'put')
    )(msg);
  }
}

export const Indexer = {
  Queue: IndexerQueue,
  describeThingId
};
