import prop from "ramda/src/prop";
import identity from "ramda/src/identity";

export const PREFIX = "nab";
export const DEFAULT_POW_COMPLEXITY=22;
export const COMMENT_BODY_MAX = 10000;
export const SUBMISSION_TITLE_MAX = 300;
export const SUBMISSION_BODY_MAX = 40000;
export const TOPIC_NAME_MAX = 42;

export const keyIs = val => key => key === val;
export const valIs = checkVal => (_k, val) => checkVal === val;
export const isSoul = soul => (key, val, parent, parentKey, msg, peer) => {
  const isMatch =  peer.souls[soul].isMatch(prop("#", val) || key);
  if (isMatch) {
    const schemaCheck = peer.schema[soul](key, val, parent, parentKey, msg, peer);
    return isMatch && schemaCheck;
  }
};
export const soulMatchesKey = (key, val) => (prop("#", val) === key);
export const valFromSoul= (soul, routeKey) => (key, val, parent, pKey, _msg, peer) =>
  val === peer.souls[soul].isMatch(prop("#", parent) || pKey)[routeKey];

export const allowFields = (...validators) => (pKey, val, _parent, _pKey, msg, peer) => Promise.all(
  Object.keys(val || {}).map(key => Promise.all(
    [keyIs("_"), keyIs("#"), ...validators]
      .map(fn => Promise.resolve(fn(key, val[key], val, pKey, msg, peer)))
  )
    .then(results => {
      if (!results.find(identity)) {
        if (key.indexOf("~") === -1) {
          // console.warn("sanitizing message", pKey, key); // eslint-disable-line
          delete val[key]; // eslint-disable-line
        } else {
          // console.warn("sea", pKey, key, msg); // eslint-disable-line
        }
      }
    })))
    .then(() => val);

export const and = (...fns) => (...args) => {
  let result;
  return !fns.find((fn, idx) => idx === 0 // eslint-disable-line
    ? !(result = fn(...args))
    : !fn(...args))
      ? result
      : false;
};
