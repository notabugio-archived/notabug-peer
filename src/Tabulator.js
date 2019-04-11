import * as R from "ramda";
import { query, all } from "gun-scope";
import { Schema } from "./Schema";
import { Query } from "./Query";
import { CommentCommand } from "./CommentCommand";

const tabulatorQuery = query(async (scope, route) => {
  const thingSoul = Schema.Thing.route.reverse(route.match);
  const [up, down, comment, replySouls] = await all([
    scope.get(`${thingSoul}/votesup`).count(),
    scope.get(`${thingSoul}/votesdown`).count(),
    scope.get(`${thingSoul}/allcomments`).count(),
    scope.get(`${thingSoul}/comments`).souls()
  ]);
  const thingData = await Query.thingDataFromSouls(scope, replySouls);
  const commandMap = CommentCommand.map(thingData);
  const result = {
    up,
    down,
    comment,
    replies: replySouls.length,
    score: up - down
  };

  if (R.keys(commandMap).length) result.commands = JSON.stringify(commandMap);
  return result;
});

export const Tabulator = { query: tabulatorQuery };
