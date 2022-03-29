module.exports=async d=>{
	var t=d.util.openFunc(d)
	if(t.err)return d.error(t.err)
	var[
		type,
		name,
		value,
		ttl=undefined,
		table=d.client.db.tables[0]
	]=t.inside.splits
	if(!type||!name||!value)return d.aoiError.fnError(d,'custom',{inside:t.inside},`The variable requires a type, name and value!`)
	if(ttl){
		ttl=Number(ttl)
		if(isNaN(ttl))return d.aoiError.fnError(
			d, 
			'number', 
			{inside:t.inside}
		)
	}
	try{
		await d.client.db.db.set(
			table,
			type?.addBrackets()+'_'+name?.addBrackets(),
			value, 
			ttl
		);
  }catch(e){
		d.aoiError.fnError(
			d,
			'custom',
			{},
			`Failed To Set Value To The Variable '${name.addBrackets()}'. With Reason: ${e}`
		);
  }
	return{code:d.util.setCode(t)}
}