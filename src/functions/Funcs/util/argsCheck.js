module.exports = async d => {
  var t = d.util.openFunc(d)
  if(t.err) return d.error(t.err);
  var [c, e = ''] = t.inside.splits;
	var r = Number(c.replace(/[<>=]/g, ''))
  var C = {
    a: d.args.length < r,
    b: d.args.length > r,
    c: d.args.length <= r,
    d: d.args.length >= r,
    e: d.args.length === r
  };
  var check = c.startsWith('<=')
		? C.c 
		: c.startsWith('>=') 
		? C.d 
		: c.startsWith('<') 
		? C.a 
		: c.startsWith('>') 
		? C.b 
		: C.e;
  if (!check && e !== ''){
		var s = await d.util.errorParser(e, d);
		d.aoiError.makeMessageError(d.client, d.channel, s, s.options, d)
  }
  return { code: d.util.setCode(t), error: !check };
};