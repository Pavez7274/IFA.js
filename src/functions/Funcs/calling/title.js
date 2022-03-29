module.exports = async d => {
  const data=d.util.openFunc(d)
  if(data.err)return d.error(data.err)
  let[N,U,I=1]=data.inside.splits
  I=Number(I)-1
  if(isNaN(I)||I<0)d.aoiError.fnError(d,'index',{inside:data.inside})
  if(!d.embeds[I])d.embeds[I]=new d.embed()
  d.embeds[I].setTitle(N.addBrackets())
	if(U&&U.trim()!=='')d.embeds[I].setURL(U.addBrackets());
	return{code:d.util.setCode(data),embeds:d.embeds}
}