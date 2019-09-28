import * as R from 'ramda';
import { ListingSpec } from '../Listing';
import { ListingSpecType } from '../types';

const TARGET_RECENT_SIZE = 1000;
const CLEANUP_INTERVAL = 60000;
const THROTTLE = 1000;

export class ThingQueue {
  newIds: string[];
  updatedIds: string[];
  peer: any;
  user: { pub: string; alias: string };
  spec: ListingSpecType;
  scopeOpts: any;
  processingId: string;
  recent: { [soul: string]: number };
  isProcessing: boolean;

  constructor(peer: any, config = '', scopeOpts = {}) {
    this.spec = ListingSpec.fromSource(config);
    this.peer = peer;
    this.user = peer.isLoggedIn();
    this.newIds = [];
    this.updatedIds = [];
    this.processingId = '';
    this.recent = {};
    this.isProcessing = false;
    this.scopeOpts = R.mergeLeft(scopeOpts || {}, { onlyOnce: true });
    setInterval(this.cleanupRecent.bind(this), CLEANUP_INTERVAL);
  }

  cleanupRecent() {
    const ids = R.sortWith([R.descend(R.prop(R.__, this.recent))], R.keys(this.recent));

    while (ids.length > TARGET_RECENT_SIZE) {
      delete this.recent[ids.pop() || ''];
    }
  }

  length() {
    return this.newIds.length + this.updatedIds.length + (this.processingId ? 1 : 0);
  }

  contains(id: string) {
    return this.newIds.indexOf(id) !== -1 || this.updatedIds.indexOf(id) !== -1;
  }

  getShouldDefer(id: string) {
    const now = new Date().getTime();
    const last: number = R.propOr(0, id, this.recent);
    if (now - last < THROTTLE) return true;
    this.recent[id] = now;
    return false;
  }

  enqueue(id: string, isNew = false) {
    if (this.contains(id)) return;
    (isNew ? this.newIds : this.updatedIds).splice(0, 0, id);

    // tslint:disable-next-line: no-floating-promises
    this.processQueue();
  }

  dequeue() {
    const newIds = this.newIds.slice();
    const updatedIds = this.updatedIds.slice();

    let id = '';
    // tslint:disable-next-line: no-conditional-assignment
    while ((id = newIds.pop() || updatedIds.pop() || '')) {
      //if (!this.getShouldDefer(id)) {
      const newIdx = this.newIds.indexOf(id);
      const updatedIdx = this.updatedIds.indexOf(id);

      if (newIdx !== -1) this.newIds.splice(newIdx, 1);
      if (updatedIdx !== -1) this.updatedIds.splice(updatedIdx, 1);
      return id;
      //}
    }

    setTimeout(this.processNext.bind(this), THROTTLE);
    return '';
  }

  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    while ((this.newIds.length || this.updatedIds.length) && !this.processingId) {
      try {
        await this.processNext();
      } finally {
        this.processingId = '';
      }
    }
    this.isProcessing = false;
  }

  // tslint:disable-next-line: no-empty
  async processNext() {}

  // tslint:disable-next-line: no-empty
  onPut(msg: any) {}
}
