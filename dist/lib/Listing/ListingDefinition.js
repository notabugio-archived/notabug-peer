"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var Tokenizer_1 = require("../Tokenizer");
var Config_1 = require("../Config");
var fromSource = function (source, ownerId, spaceName) {
    var _a, _b, _c;
    if (ownerId === void 0) { ownerId = ''; }
    if (spaceName === void 0) { spaceName = ''; }
    var tokenized = Tokenizer_1.Tokenizer.tokenize(source);
    var obj = __assign({}, tokenized);
    var isPresent = tokenized.isPresent, getValue = tokenized.getValue, getValues = tokenized.getValues, getValueChain = tokenized.getValueChain, getPairs = tokenized.getPairs;
    _a = getValueChain('sourced from page'), _b = _a[0], obj.fromPageAuthor = _b === void 0 ? ownerId : _b, _c = _a[1], obj.fromPageName = _c === void 0 ? spaceName ? "space:" + spaceName : undefined : _c;
    obj.displayName = tokenized.getValue('name') || spaceName;
    obj.indexer = getValue('tabulator') || Config_1.Config.indexer;
    obj.tabulator = getValue('tabulator') || obj.indexer;
    obj.tabs = getPairs('tab');
    obj.sort = getValue('sort');
    // TODO: breaks with custom names
    if (obj.sort === 'default')
        obj.sort = getValue('tab');
    obj.uniqueByContent = !!isPresent('unique by content');
    obj.curators = getValues('curator');
    obj.moderators = getValues('mod');
    obj.includeRanks = !!isPresent('show ranks');
    obj.stickyIds = getValues('sticky');
    obj.isIdSticky = function (id) { return !!tokenized.isPresent(['sticky', id]); };
    obj.isChat = !!isPresent('display as chat');
    obj.submitTopics = getValues('submit to');
    obj.submitTopic = getValue('submit to');
    obj.chatTopic = getValue('chat in');
    if (ownerId && spaceName) {
        obj.spaceName = spaceName;
        obj.owner = ownerId;
        obj.useForComments = !tokenized.isPresent('comments leave space');
        obj.basePath = "/user/" + ownerId + "/spaces/" + spaceName;
        if (obj.submitTopic)
            obj.submitPath = obj.basePath + "/submit";
        obj.defaultTab = tokenized.getValue('tab');
        obj.defaultTabPath = obj.defaultTab ? tokenized.getValue(['tab', obj.defaultTab]) : null;
    }
    obj.filters = {
        functions: [],
        allow: {
            repliesTo: getValue('replies to author'),
            type: getValue('type'),
            ops: getValues('op'),
            aliases: getValues('alias'),
            authors: getValues('author'),
            domains: getValues('domain'),
            topics: getValues('topic'),
            listings: getValues('listing'),
            kinds: getValues('kind'),
            anon: !isPresent('require signed'),
            signed: !isPresent('require anon')
        },
        deny: {
            aliases: getValues('ban alias'),
            authors: getValues('ban author'),
            domains: getValues('ban domain'),
            topics: getValues('ban topic'),
            anon: !!isPresent('require signed'),
            signed: !!isPresent('require anon'),
            tags: getPairs('can remove')
        }
    };
    obj.voteFilters = {
        functions: [],
        upsMin: parseInt(getValue('ups above') || '', 10) || null,
        upsMax: parseInt(getValue('ups below') || '', 10) || null,
        downsMin: parseInt(getValue('downs above') || '', 10) || null,
        downsMax: parseInt(getValue('downs below') || '', 10) || null,
        scoreMin: parseInt(getValue('score above') || '', 10) || null,
        scoreMax: parseInt(getValue('score below') || '', 10) || null
    };
    obj.censors = R.uniq(R.map(R.nth(1), obj.filters.deny.tags));
    return obj;
};
exports.ListingDefinition = { fromSource: fromSource };
//# sourceMappingURL=ListingDefinition.js.map