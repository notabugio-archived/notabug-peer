import * as R from 'ramda';
import objHash from 'object-hash';
import { createSuppressor } from 'gun-suppressor';
import * as sea from 'gun-suppressor-sear';
import { NabProtocolMsg, GunNodeType, SchemaNodeType, ThingDataNodeType } from './types';
import { Schema } from './Schema';

const isLegacyThing = (_schema: any, data: GunNodeType) => {
  const dataSoul = R.pathOr('', ['data', '#'], data);
  const newest = R.without(
    ['comments', 'allcomments', 'votesup', 'votesdown'],
    R.keys(R.path(['_', '>'], data))
  )
    .map(key => R.path(['_', '>', key], data))
    .sort()
    .pop();
  const thingId = R.propOr('', 'thingId', Schema.ThingData.route.match(dataSoul));
  const id = R.prop('id', data);

  return id && id === thingId && newest && newest < 1543102814945;
};

const thingHashMatchesSoul = (_schema: any, data: GunNodeType) => {
  const id = R.prop('id', data);

  return (
    id &&
    id ===
      objHash({
        authorId: (R.pathOr('', ['author', '#'], data) || '').substr(1) || undefined,
        timestamp: parseInt(R.prop('timestamp', data), 10),
        kind: R.prop('kind', data),
        topic: R.propOr(
          undefined,
          'topicName',
          Schema.Topic.route.match(R.pathOr('', ['topic', '#'], data))
        ),
        opId: R.propOr(
          undefined,
          'thingId',
          Schema.Thing.route.match(R.pathOr('', ['op', '#'], data))
        ),
        replyToId: R.propOr(
          undefined,
          'thingId',
          Schema.Thing.route.match(R.pathOr('', ['replyTo', '#'], data))
        ),
        originalHash: R.prop('originalHash', data)
      })
  );
};

const signedThingDataMatches = (_schema: any, data: GunNodeType) => {
  const authorId = (R.pathOr('', ['author', '#'], data) || '').substr(1) || undefined;
  const signedId = R.propOr(
    '',
    'authorId',
    Schema.ThingDataSigned.route.match(R.pathOr('', ['data', '#'], data))
  );

  return authorId && authorId === signedId;
};

const thingDataMatchesOriginalHash = (_schema: any, data: GunNodeType) => {
  const originalHash = R.prop('originalHash', data);
  const id = R.propOr(
    '',
    'thingId',
    Schema.ThingData.route.match(R.pathOr('', ['data', '#'], data))
  );

  return id && id === originalHash;
};

const getIsThingRelatedEdge = (ajv: any) => (
  nodeTypeName: string,
  data: any,
  _pSchema: any,
  _cPath: any,
  parentData: any
) => {
  const thingId = R.propOr(
    '',
    'thingId',
    Schema.Thing.route.match(R.path(['_', '#'], parentData) || '')
  );
  const NodeType: SchemaNodeType = R.propOr(null, nodeTypeName, Schema);
  const propThingId = R.propOr('', 'thingId', NodeType.route.match(R.propOr('', '#', data)));

  if (!thingId || thingId !== propThingId) return false;
  return ajv.compile({ $ref: `schema.json#/definitions/${nodeTypeName}Edge` })(data);
};

const thingDataHashMatches = (_schema: any, data: any) => {
  const record: ThingDataNodeType = R.dissoc('_', data);

  record.timestamp = parseFloat(record.timestamp as string);
  const thingId = R.propOr(
    '',
    'thingId',
    Schema.ThingData.route.match(R.path(['_', '#'], data) || '')
  );
  return thingId && thingId === objHash(record);
};

const isVoteValid = (argon2: any, schema: any, prefix: string, vote: string) => {
  const { algorithm = 'argon2d', config = {} } = schema || {};

  // const nonce = Buffer.hasOwnProperty('from') ? Buffer.from(vote, 'hex') : new Buffer(vote, 'hex');
  const nonce = Buffer.from(vote, 'hex');
  // const salt = Buffer.hasOwnProperty('from') ? Buffer.from(nonce, 'hex') : new Buffer(nonce, 'hex');
  const salt = nonce;

  const hash = argon2.hash(prefix, {
    salt,
    hashLength: config.hashLength,
    timeCost: config.timeCost,
    memoryCost: config.memoryCost,
    parallelism: config.parallelism,
    raw: true,
    type: argon2[algorithm]
  });
  let off = 0;
  let i;

  for (i = 0; i <= config.complexity - 8; i += 8, off++) {
    if (hash[off] !== 0) return false;
  }
  const mask = 0xff << (8 + i - config.complexity);

  return (hash[off] & mask) === 0;
};

const keysAreProofsOfWork = (schema: any, data: any) => {
  const argon2 = require('argon2');

  if (!argon2) return true; // in browser don't bother for now
  const { algorithm = 'argon2d' } = schema || {};
  const prefix = R.pathOr('', ['_', '#'], data);

  if (algorithm !== 'argon2d') {
    throw new Error('Only argon2 supported for vote hashes');
  }

  R.without(['_'], R.keysIn(data)).forEach(vote => {
    if (!isVoteValid(argon2, schema, prefix, vote)) {
      console.log('invalid vote', prefix, vote);
      delete data[vote];
    }
  });
  return true;
};

const deleteNonNumericKeys = (schema: any, data: any) => {
  const keys = R.without(['_'], R.keysIn(data));
  const meta = R.pathOr({}, ['_', '>'], data);

  keys.forEach(key => {
    const val = parseInt(key, 10);

    if (!val && val !== 0) {
      delete meta[key];
      delete data[key];
    }
  });
  return true;
};

const deleteMetaForMissing = (schema: any, data: any) => {
  const keys = R.without(['_'], R.keysIn(data));
  const meta = R.pathOr({}, ['_', '>'], data);
  const metaKeys = R.keysIn(meta);
  const missing = R.difference(metaKeys, keys);

  if (missing.length) data['_']['>'] = R.omit(missing, meta);
  return true;
};

const initAjv = R.compose(
  (ajv: any) => {
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
  },
  sea.initAjv
);

const create = () =>
  createSuppressor({
    definitions: Schema.definitions,
    init: initAjv
  });

const gunWireInput = R.curry((peer, context) => {
  const suppressor = create();

  context.on('in', function wireInput(this: any, msg: NabProtocolMsg) {
    const _ = msg['_'];

    delete msg['_'];
    if ('ping' in msg || 'leech' in msg) return;
    if (msg.put && !R.keys(msg.put).length) return;
    const promise = peer.config.disableValidation ? Promise.resolve(msg) : suppressor.validate(msg);

    promise
      .then((validated: boolean) => {
        if (!validated) return console.log("msg didn't validate", msg);
        msg['_'] = _;
        return this.to.next(msg);
      })
      .catch((err: Error) => console.error('validate err', msg, err.stack || err));
  });
});

export const Validation = {
  createSuppressor: create,
  isLegacyThing,
  thingHashMatchesSoul,
  signedThingDataMatches,
  thingDataMatchesOriginalHash,
  getIsThingRelatedEdge,
  thingDataHashMatches,
  isVoteValid,
  keysAreProofsOfWork,
  initAjv,
  gunWireInput
};
