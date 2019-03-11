import * as R from "ramda";
import { Tokenizer } from "../Tokenizer";
import { Config } from "../Config";

const fromSource = (source, ownerId = null, spaceName = null) => {
  const tokenized = Tokenizer.tokenize(source);
  const obj = { ...tokenized };
  const { isPresent, getValue, getValues, getValueChain, getPairs } = tokenized;

  [
    obj.fromPageAuthor = ownerId,
    obj.fromPageName = spaceName ? `space:${spaceName}` : undefined
  ] = getValueChain("sourced from page");
  obj.displayName = tokenized.getValue("name") || spaceName;
  obj.indexer = getValue("tabulator") || Config.indexer;
  obj.tabulator = getValue("tabulator") || obj.indexer;
  obj.tabs = getPairs("tab");
  obj.sort = getValue("sort");
  obj.uniqueByContent = !!isPresent("unique by content");
  obj.curators = getValues("curator");
  obj.moderators = getValues("mod");
  obj.includeRanks = !!isPresent("show ranks");
  obj.stickyIds = getValues("sticky");
  obj.isIdSticky = id => !!tokenized.isPresent(["sticky", id]);
  obj.submitTopics = getValues("submit to");
  obj.submitTopic = getValue("submit to");
  obj.chatTopic = getValue("chat in");

  if (ownerId && spaceName) {
    obj.spaceName = spaceName;
    obj.owner = ownerId;
    obj.useForComments = !tokenized.isPresent("comments leave space");
    obj.path = `/user/${ownerId}/spaces/${spaceName}`;
    obj.defaultTab = tokenized.getValue("tab");
    obj.defaultTabPath = obj.defaultTab
      ? tokenized.getValue(["tab", obj.defaultTab])
      : null;
  }

  obj.filters = {
    functions: [],
    allow: {
      repliesTo: getValue("replies to author"),
      type: getValue("type"), // TODO: this field seems redundant with kind and should be deprecated
      ops: getValues("op"),
      aliases: getValues("alias"),
      authors: getValues("author"),
      domains: getValues("domain"),
      topics: getValues("topic"),
      listings: getValues("listing"),
      kinds: getValues("kind"),
      anon: !isPresent("require signed"),
      signed: !isPresent("require anon")
    },
    deny: {
      aliases: getValues("ban alias"),
      authors: getValues("ban author"),
      domains: getValues("ban domain"),
      topics: getValues("ban topic"),
      anon: !!isPresent("require signed"),
      signed: !!isPresent("require anon"),
      tags: getPairs("can remove")
    }
  };

  obj.voteFilters = {
    functions: [],
    upsMin: parseInt(getValue("ups above"), 10) || null,
    upsMax: parseInt(getValue("ups below"), 10) || null,
    downsMin: parseInt(getValue("downs above"), 10) || null,
    downsMax: parseInt(getValue("downs below"), 10) || null,
    scoreMin: parseInt(getValue("score above"), 10) || null,
    scoreMax: parseInt(getValue("score below"), 10) || null
  };

  obj.censors = R.uniq(R.map(R.prop(1), obj.filters.deny.tags));
  return obj;
};

export const ListingDefinition = { fromSource };
