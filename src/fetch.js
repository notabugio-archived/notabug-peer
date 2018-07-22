const RECORD_TIMEOUT = 10000;

export const get = peer => (soul, timeout=RECORD_TIMEOUT, wait=1) =>
  (new Promise((resolve, reject) => {
    if (peer.gun.redis) {
      peer.gun.redis.get(soul).then(resolve).catch(reject);
    }
    peer.gun.get(soul).once((data) => resolve(data), { wait });
    setTimeout(() => reject(`record timeout after ${timeout}`), timeout);
  })).catch(error => {
    console.error(`getRecord error ${soul}`, error.stack || error); // eslint-disable-line
    return null;
  });

export const fetchThingData = peer => (thingid, opts) => new Promise((resolve, reject) => {
  const existing = peer.getThingData(thingid);

  if (existing) {
    resolve(existing);
    return;
  }

  const chain = peer.souls.thingData.get({ thingid });
  chain.on(data => {
    if (!data) return;
    peer.mergeState({ data: { [thingid]: data } });
    resolve(data);
    chain.off();
  }, opts);
});
