"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fetchThingData = exports.fetchThingData = function fetchThingData(peer) {
  return function (thingid) {
    return new Promise(function (resolve, reject) {
      var existing = peer.getThingData(thingid);

      if (existing) {
        resolve(existing);
        return;
      }

      var chain = peer.souls.thingData.get({ thingid: thingid });
      chain.on(function (data) {
        if (!data) return;
        peer.mergeState({ data: _defineProperty({}, thingid, data) });
        resolve(data);
        chain.off();
      });
    });
  };
};