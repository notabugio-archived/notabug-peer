import * as R from 'ramda';
import { ListingSpec } from '../Listing';
import { ListingSpecType } from '../types';

export class ThingQueue {
  newIds: string[];
  updatedIds: string[];
  peer: any;
  user: { pub: string; alias: string };
  spec: ListingSpecType;
  scopeOpts: any;
  processingId: string;

  constructor(peer: any, config = '', scopeOpts = {}) {
    this.spec = ListingSpec.fromSource(config);
    this.peer = peer;
    this.user = peer.isLoggedIn();
    this.newIds = [];
    this.updatedIds = [];
    this.processingId = '';
    this.scopeOpts = R.mergeLeft(scopeOpts || {}, { onlyOnce: true });
  }

  length() {
    return this.newIds.length + this.updatedIds.length + (this.processingId ? 1 : 0);
  }

  contains(id: string) {
    return this.newIds.indexOf(id) !== -1 || this.updatedIds.indexOf(id) !== -1;
  }

  enqueue(id: string, isNew = false) {
    if (this.contains(id)) return;
    (isNew ? this.newIds : this.updatedIds).splice(0, 0, id);
    // tslint:disable-next-line: no-floating-promises
    this.processNext();
  }

  dequeue() {
    return this.newIds.pop() || this.updatedIds.pop() || '';
  }

  // tslint:disable-next-line: no-empty
  async processNext() {}

  // tslint:disable-next-line: no-empty
  onPut(msg: any) {}
}
