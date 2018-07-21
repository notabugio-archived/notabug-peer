"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RECORD_TIMEOUT = 10000;

var get = exports.get = function get(peer) {
  return function (soul) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : RECORD_TIMEOUT;
    var wait = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return new Promise(function (resolve, reject) {
      if (peer.gun.redis) {
        peer.gun.redis.get(soul).then(resolve).catch(reject);
      }
      peer.gun.get(soul).once(function (data) {
        return resolve(data);
      }, { wait: wait });
      setTimeout(function () {
        return reject("record timeout after " + timeout);
      }, timeout);
    }).catch(function (error) {
      console.error("getRecord error " + soul, error.stack || error); // eslint-disable-line
      return null;
    });
  };
};

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