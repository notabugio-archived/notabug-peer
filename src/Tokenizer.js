import * as R from "ramda";

const tokenize = source => {
  const tokenMap = (source || "").split("\n").reduce((def, line) => {
    const tokens = line
      .trim()
      .split(" ")
      .map(R.trim)
      .filter(x => x);

    if (!tokens.length) return def;
    return R.assocPath(tokens, {}, def);
  }, {});

  const isPresent = p => {
    let check = p;

    if (typeof p === "string") check = p.split(" ");
    return check && R.path(check, tokenMap);
  };

  const getValues = p => R.keysIn(isPresent(p));
  const getValue = p => getValues(p)[0] || null;
  const getLastValue = p => getValues(p).pop() || null;

  const getValueChain = p => {
    const keys = typeof p === "string" ? p.split(" ") : p;
    const values = [];
    let next = p;

    while (next) {
      next = getValue([...keys, ...values]);
      next && values.push(next);
    }

    return values;
  };

  const getPairs = p => {
    const keys = typeof p === "string" ? p.split(" ") : p;

    return getValues(keys).reduce((pairs, key) => {
      const val = getValue([...keys, key]);

      return [...pairs, [key, val]];
    }, []);
  };

  return {
    source,
    isPresent,
    getValue,
    getValues,
    getLastValue,
    getValueChain,
    getPairs
  };
};

export const Tokenizer = { tokenize };
