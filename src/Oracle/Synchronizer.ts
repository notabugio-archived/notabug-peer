import * as R from 'ramda';
import { ThingQueue } from './ThingQueue';
import { Schema } from '../Schema';
import { GunChain, GunNodeType } from '../types';

class SynchronizerQueue extends ThingQueue {
  constructor(peer: any, config = '', scopeOpts = {}) {
    super(peer, config, scopeOpts);
    this.findThingsToSync();
  }

  findThingsToSync() {
    // TODO Allow setting partial ranges
    const dayStr = '';
    const souls = ['nab/topics/all', 'nab/topics/comments:all', 'nab/topics/chat:all'].map(
      soul => soul + dayStr
    );

    const enqueue = (node: GunNodeType) => {
      const soul: string = R.pathOr('', ['_', '#'], node);
      const thingId: string = R.propOr('', 'thingId', Schema.Thing.route.match(soul));
      if (!thingId) return;
      this.enqueue(thingId);
    };

    souls.forEach(soul =>
      this.peer.gun
        .get(soul)
        .map()
        .once(enqueue)
    );
  }

  async processNext() {
    if (this.processingId) return;
    const thingId = (this.processingId = this.dequeue());
    const thingSoul = Schema.Thing.route.reverse({ thingId });
    await new Promise(ok => {
      function fastGet(chain: GunChain) {
        return new Promise(ok => {
          chain.not(ok).once(ok);
        });
      }

      this.peer.gun
        .get(thingSoul)
        .not(ok)
        .once(function(this: any) {
          Promise.all([
            fastGet(this.get('data')),
            fastGet(this.get('votesup')),
            fastGet(this.get('votesdown')),
            fastGet(this.get('allcomments')),
            fastGet(this.get('comments'))
          ])
            .then(ok)
            .catch(ok);
        });
    });
    console.log('fetched', thingId, this.length());

    this.processingId = '';
    // tslint:disable-next-line: no-floating-promises
    this.processNext();
  }
}

export const Synchronizer = {
  Queue: SynchronizerQueue
};
