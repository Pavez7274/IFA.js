module.exports=async d=>{
	var t = d.util.openFunc(d);
	if(t.err)return d.error(t.err);
  var[type,name,table=d.client.db.tables[0]]=t.inside.splits;
	var _=(await d.client.db.db.get(table,type+'_'+name))?.value
	if(!_)return d.aoiError.fnError(d,'custom',{},`Variable '${name}' does not exist!`)
	await d.client.db.db.delete(table,type+'_'+name);
	return{code: d.util.setCode(t)}
}