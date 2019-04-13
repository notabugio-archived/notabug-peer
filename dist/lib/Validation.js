"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
var object_hash_1 = require("object-hash");
var gun_suppressor_1 = require("gun-suppressor");
var sea = require("gun-suppressor-sear");
var Schema_1 = require("./Schema");
var isLegacyThing = function (_schema, data) {
    var dataSoul = R.pathOr('', ['data', '#'], data);
    var newest = R.without(['comments', 'allcomments', 'votesup', 'votesdown'], R.keys(R.path(['_', '>'], data)))
        .map(function (key) { return R.path(['_', '>', key], data); })
        .sort()
        .pop();
    var thingId = R.propOr('', 'thingId', Schema_1.Schema.ThingData.route.match(dataSoul));
    var id = R.prop('id', data);
    return id && id === thingId && newest && newest < 1543102814945;
};
var thingHashMatchesSoul = function (_schema, data) {
    var id = R.prop('id', data);
    return (id &&
        id ===
            object_hash_1.default({
                authorId: (R.pathOr('', ['author', '#'], data) || '').substr(1) || undefined,
                timestamp: parseInt(R.prop('timestamp', data), 10),
                kind: R.prop('kind', data),
                topic: R.propOr(undefined, 'topicName', Schema_1.Schema.Topic.route.match(R.pathOr('', ['topic', '#'], data))),
                opId: R.propOr(undefined, 'thingId', Schema_1.Schema.Thing.route.match(R.pathOr('', ['op', '#'], data))),
                replyToId: R.propOr(undefined, 'thingId', Schema_1.Schema.Thing.route.match(R.pathOr('', ['replyTo', '#'], data))),
                originalHash: R.prop('originalHash', data)
            }));
};
var signedThingDataMatches = function (_schema, data) {
    var authorId = (R.pathOr('', ['author', '#'], data) || '').substr(1) || undefined;
    var signedId = R.propOr('', 'authorId', Schema_1.Schema.ThingDataSigned.route.match(R.pathOr('', ['data', '#'], data)));
    return authorId && authorId === signedId;
};
var thingDataMatchesOriginalHash = function (_schema, data) {
    var originalHash = R.prop('originalHash', data);
    var id = R.propOr('', 'thingId', Schema_1.Schema.ThingData.route.match(R.pathOr('', ['data', '#'], data)));
    return id && id === originalHash;
};
var getIsThingRelatedEdge = function (ajv) { return function (nodeTypeName, data, _pSchema, _cPath, parentData) {
    var thingId = R.propOr('', 'thingId', Schema_1.Schema.Thing.route.match(R.path(['_', '#'], parentData) || ''));
    var NodeType = R.propOr(null, nodeTypeName, Schema_1.Schema);
    var propThingId = R.propOr('', 'thingId', NodeType.route.match(R.propOr('', '#', data)));
    if (!thingId || thingId !== propThingId)
        return false;
    return ajv.compile({ $ref: "schema.json#/definitions/" + nodeTypeName + "Edge" })(data);
}; };
var thingDataHashMatches = function (_schema, data) {
    var record = R.dissoc('_', data);
    record.timestamp = parseFloat(record.timestamp);
    var thingId = R.propOr('', 'thingId', Schema_1.Schema.ThingData.route.match(R.path(['_', '#'], data) || ''));
    return thingId && thingId === object_hash_1.default(record);
};
var isVoteValid = function (argon2, schema, prefix, vote) {
    var _a = schema || {}, _b = _a.algorithm, algorithm = _b === void 0 ? 'argon2d' : _b, _c = _a.config, config = _c === void 0 ? {} : _c;
    // const nonce = Buffer.hasOwnProperty('from') ? Buffer.from(vote, 'hex') : new Buffer(vote, 'hex');
    var nonce = Buffer.from(vote, 'hex');
    // const salt = Buffer.hasOwnProperty('from') ? Buffer.from(nonce, 'hex') : new Buffer(nonce, 'hex');
    var salt = nonce;
    var hash = argon2.hash(prefix, {
        salt: salt,
        hashLength: config.hashLength,
        timeCost: config.timeCost,
        memoryCost: config.memoryCost,
        parallelism: config.parallelism,
        raw: true,
        type: argon2[algorithm]
    });
    var off = 0;
    var i;
    for (i = 0; i <= config.complexity - 8; i += 8, off++) {
        if (hash[off] !== 0)
            return false;
    }
    var mask = 0xff << (8 + i - config.complexity);
    return (hash[off] & mask) === 0;
};
var keysAreProofsOfWork = function (schema, data) {
    var argon2 = require('argon2');
    if (!argon2)
        return true; // in browser don't bother for now
    var _a = (schema || {}).algorithm, algorithm = _a === void 0 ? 'argon2d' : _a;
    var prefix = R.pathOr('', ['_', '#'], data);
    if (algorithm !== 'argon2d') {
        throw new Error('Only argon2 supported for vote hashes');
    }
    R.without(['_'], R.keysIn(data)).forEach(function (vote) {
        if (!isVoteValid(argon2, schema, prefix, vote)) {
            console.log('invalid vote', prefix, vote);
            delete data[vote];
        }
    });
    return true;
};
var deleteNonNumericKeys = function (schema, data) {
    var keys = R.without(['_'], R.keysIn(data));
    var meta = R.pathOr({}, ['_', '>'], data);
    keys.forEach(function (key) {
        var val = parseInt(key, 10);
        if (!val && val !== 0) {
            delete meta[key];
            delete data[key];
        }
    });
    return true;
};
var deleteMetaForMissing = function (schema, data) {
    var keys = R.without(['_'], R.keysIn(data));
    var meta = R.pathOr({}, ['_', '>'], data);
    var metaKeys = R.keysIn(meta);
    var missing = R.difference(metaKeys, keys);
    if (missing.length)
        data['_']['>'] = R.omit(missing, meta);
    return true;
};
var initAjv = R.compose(function (ajv) {
    ajv.addKeyword('isLegacyThing', {
        validate: isLegacyThing
    });
    ajv.addKeyword('thingHashMatchesSoul', {
        validate: thingHashMatchesSoul
    });
    ajv.addKeyword('signedThingDataMatchesThing', {
        validate: signedThingDataMatches
    });
    ajv.addKeyword('thingDataMatchesOriginalHash', {
        validate: thingDataMatchesOriginalHash
    });
    ajv.addKeyword('thingRelatedEdge', {
        validate: getIsThingRelatedEdge(ajv)
    });
    ajv.addKeyword('thingDataHashMatchesSoul', {
        validate: thingDataHashMatches
    });
    ajv.addKeyword('keysAreProofsOfWork', {
        validate: keysAreProofsOfWork,
        modifying: true
    });
    ajv.addKeyword('deleteNonNumericKeys', {
        validate: deleteNonNumericKeys,
        modifying: true
    });
    ajv.addKeyword('deleteMetaForMissing', {
        validate: deleteMetaForMissing,
        modifying: true
    });
    return ajv;
}, sea.initAjv);
exports.suppressor = gun_suppressor_1.createSuppressor({
    definitions: Schema_1.Schema.definitions,
    init: initAjv
});
var gunWireInput = R.curry(function (peer, context) {
    return context.on('in', function wireInput(msg) {
        var _this = this;
        var _ = msg['_'];
        delete msg['_'];
        if ('ping' in msg || 'leech' in msg)
            return;
        if (msg.put && !R.keys(msg.put).length)
            return;
        var promise = peer.config.disableValidation ? Promise.resolve(msg) : exports.suppressor.validate(msg);
        promise
            .then(function (validated) {
            if (!validated)
                return console.log("msg didn't validate", msg);
            msg['_'] = _;
            return _this.to.next(msg);
        })
            .catch(function (err) { return console.error('validate err', msg, err.stack || err); });
    });
});
exports.Validation = {
    isLegacyThing: isLegacyThing,
    thingHashMatchesSoul: thingHashMatchesSoul,
    signedThingDataMatches: signedThingDataMatches,
    thingDataMatchesOriginalHash: thingDataMatchesOriginalHash,
    getIsThingRelatedEdge: getIsThingRelatedEdge,
    thingDataHashMatches: thingDataHashMatches,
    isVoteValid: isVoteValid,
    keysAreProofsOfWork: keysAreProofsOfWork,
    initAjv: initAjv,
    suppressor: exports.suppressor,
    gunWireInput: gunWireInput
};
//# sourceMappingURL=Validation.js.map