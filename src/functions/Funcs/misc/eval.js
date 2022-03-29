module.exports = async d => {
	var t = d.util.openFunc(d);
	if(t.err) return d.error(t.err);
	var [
		code,
		opt = '{"returnCode":false,"sendMessage":true,"returnExecution":false,"returnId":false,"readFromTop":true}'
	] = t.inside.splits;
	code = code.addBrackets();
	try {
		var opts = new Object();
		Object.assign(
			opts, {
				returnCode: false, 
				returnExecution: false, 
				returnId: false, 
				sendMessage: true, 
				readFromTop: true, 
			}, opt.toObject()
		)
	} catch {
		return d.aoiError
			.fnError(
				d, 
				'custom',
				{ inside: t.inside }, 
				'Invalid JSON Provided In'
			);
	};
	var r = await d.interpreter(
		d.client, 
		d.message, 
		d.args,
		{
			name: 'Eval', 
			code,
			readFromTop: opts.readFromTop
		}, 
		d.client.db,
		opts.returnCode,
		void 0, {}, void 0, void 0, 
		opts.returnExecution, 
		opts.returnId,
		opts.sendMessage
	);
	typeof r === 'object' && Object.keys(r).length === 1 && (r = r[Object.keys(r)[0]]);
	typeof r === 'object' && Object.keys(r).length > 1 && (r = require('util').inspect(r, { depth: 0 }));
	t.result = r
	return { code: d.util.setCode(t) }
}