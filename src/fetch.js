export const fetchThingData = peer => thingid => new Promise((resolve, reject) => {
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
  });
});
