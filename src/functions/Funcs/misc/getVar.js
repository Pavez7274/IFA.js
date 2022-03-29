module.exports = async d => {
  var t=d.util.openFunc(d);
  if(t.err)return d.error(t.err);
	var[
		type,
		name,
		def='null',
		table=d.client.db.tables[0]
	]=t.inside.splits
		.map(_=>_?.addBrackets());
	t.result=(await d.client.db.db.get(
		table,
		type+'_'+name
	))?.value||def;

  t.result=typeof t.result==='object'
		?JSON.stringify(t.result)
		:t.result;
  return{code:d.util.setCode(t)}
}