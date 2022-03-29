module.exports = d => {
	var t = d.util.openFunc(d);
	if(t.err) return d.error(t.err);
	var [n, v, s = 'no'] = t.inside.splits;
	var VAR = eval(`d.data.vars?.${n.addBrackets()}`)
	if(!VAR){
		return d.aoiError.fnError(
			d,
			'custom',
			{},
			`Variable '${n}' Does Exists!`
		)
	}
	if(!Array.isArray(VAR)){
		if(!s.toBoolean(!1)){
			return d.aoiError.fnError(
				d, 
				'custom', 
				{},
				`Variable '${n}' Is Not An Array`
			)
		} else return{code:d.util.setCode(t)};
	}
	try{
			v=v.toObject()
	}catch(e){}
	try{
		if(typeof v!=='object')v=JSON.parse(v)
	}catch(e){}
	v=typeof v==='string'?v.addBrackets():v
	eval(`d.vars.${n.addBrackets()}.push(v)`)
  d.data.vars=d.vars
	return{code:d.util.setCode(t),data:d.data}
}