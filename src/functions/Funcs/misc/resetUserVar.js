module.exports = async (d) => {
  const data=d.util.openFunc(d)
  if(data.err)return d.error(data.err)
	let[N,G=d.guild?.id,T=d.client.db.tables[0]]=data.inside.splits;N=N.addBrackets()
	if(!d.client.variableManager.cache.has(N))return d.aoiError.fnError(d,'custom',{},`Variable '${N}' Doesn't Exist!`)
	G=await d.util.getGuild(d,G)
	if(!G)return d.aoiError.fnError(d,'guild',{inside:data.inside})
	(await d.client.db.all(T,N,2,[1,G])).forEach(async x=>await d.client.db.delete(T,x.key||x[N]||x.id||x.ID||x.Id))
  return {code: d.util.setCode(data)}
}