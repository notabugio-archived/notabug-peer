import * as R from "ramda";
import { parse as parseURI } from "uri-js";

const body = R.propOr("", "body");
const url = R.propOr("", "url");
const domain = R.compose(
  urlStr => {
    if (!urlStr) return "";
    const parsed = parseURI(urlStr);

    return (parsed.host || parsed.scheme || "").replace(/^www\./, "");
  },
  url
);

export const ThingDataNode = { body, url, domain };
