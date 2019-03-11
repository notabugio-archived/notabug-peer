import * as R from "ramda";
import { Constants } from "./Constants";

export const Config = {
  tabulator: Constants.DEV_INDEXER,
  indexer: Constants.DEV_INDEXER,
  owner: Constants.DEV_INDEXER,
  update: R.compose(
    R.map(([key, val]) => (Config[key] = val)),
    R.toPairs
  )
};
