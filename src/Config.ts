import * as R from 'ramda';
import { Constants } from './Constants';

type UpdateFunction = (updates: any) => void;
interface ConfigType {
  [idx: string]: string | UpdateFunction;
  tabulator: string;
  indexer: string;
  owner: string;
  update: UpdateFunction;
}

export const Config: ConfigType = {
  tabulator: Constants.INDEXER,
  indexer: Constants.INDEXER,
  owner: Constants.INDEXER,
  update: R.compose(
    R.map(([key, val]: [string, string]) => (Config[key] = val)),
    R.toPairs
  )
};
