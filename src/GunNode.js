/* globals Gun */
import * as R from "ramda";

const soul = R.pathOr("", ["_", "#"]);
const state = R.pathOr({}, ["_", ">"]);

const latest = R.compose(
  R.last,
  R.sortBy(R.identity),
  R.values,
  state
);

const edges = R.compose(
  R.map(R.prop("#")),
  R.values
);

function decodeSEA(rawData) {
  const data = rawData ? { ...rawData } : rawData;
  const soul = R.path(["_", "#"], data);

  if (!soul || !Gun.SEA || soul.indexOf("~") === -1) return rawData;
  R.without(["_"], R.keys(data)).forEach(key => {
    Gun.SEA.verify(
      Gun.SEA.opt.pack(rawData[key], key, rawData, soul),
      false,
      res => (data[key] = Gun.SEA.opt.unpack(res, key, rawData))
    );
  });
  return data;
};

export const GunNode = { soul, state, latest, edges, decodeSEA };
