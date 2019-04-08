import * as R from "ramda";
import { Constants } from "./Constants";

export const Config = {
  tabulator: Constants.INDEXER,
  indexer: Constants.INDEXER,
  owner: Constants.INDEXER,
  update: R.compose(
    R.map(([key, val]) => (Config[key] = val)),
    R.toPairs
  )
};
