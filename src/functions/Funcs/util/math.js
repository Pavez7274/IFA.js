module.exports = async (d) => {
  const t = d.util.openFunc(d);
	if (t.err) return d.error(t.err);
  const OPERATORS = /([0-9]|\/|\+|\*|-|%|<|\(|\)|\[|\]|\.)/g;
  try {
    const operation = t.inside.inside.match(OPERATORS).join('');
    if (operation.replace(OPERATORS, "").trim().length) return d.aoiError
			.fnError( d, 'custom', {inside: t.inside}, `Invalid operation in`);
    t.result = eval(operation);
  } catch (e) {
    return d.aoiError.fnError(d, 'custom', {}, `Failed to calculate in`);
  }
  return { code: d.util.setCode(t) };
};
