import * as R from "ramda";
import { Constants } from "./Constants";

const tokenize = R.compose(
  R.map(R.trim),
  R.split(" "),
  R.replace(Constants.COMMAND_RE, ""),
  R.propOr("", 0),
  R.split("\n")
);

const map = thingData =>
  R.reduce(
    (cmdMap, id) => {
      const body = R.path([id, "body"], thingData);
      const authorId = R.path([id, "authorId"], thingData) || "anon";
      const timestamp = parseFloat(R.path([id, "timestamp"], thingData));

      if (!R.test(Constants.COMMAND_RE, body)) return cmdMap;
      const tokenized = [authorId, ...tokenize(body), id];

      return R.assocPath(tokenized, timestamp || 0, cmdMap);
    },
    {},
    R.keys(thingData)
  );

export const CommentCommand = { tokenize, map };
