import * as R from 'ramda';
import { parse as parseURI } from 'uri-js';
import { GunNodeType } from '../types';
import { Constants } from '../Constants';

const kind = R.propOr('submission', 'kind');
const body = R.propOr('', 'body');
const isCommand = R.compose(
  R.test(Constants.COMMAND_RE),
  body
);
const url = R.propOr('', 'url');
const topic = R.propOr('', 'topic') as (node: GunNodeType) => string;
const domain = R.compose(
  urlStr => {
    if (!urlStr) return '';
    const parsed = parseURI(urlStr);

    return (parsed.host || parsed.scheme || '').replace(/^www\./, '');
  },
  url as (node: GunNodeType) => string
);
const authorId = R.propOr('', 'authorId');
const opId = R.propOr('', 'opId');
const replyToId = R.propOr('', 'replyToId');

export const ThingDataNode = {
  kind,
  body,
  isCommand,
  url,
  topic,
  domain,
  authorId,
  opId,
  replyToId
};
