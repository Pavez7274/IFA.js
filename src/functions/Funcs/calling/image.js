module.exports = d=>{
  const data=d.util.openFunc(d)
	if(data.err) return d.error(data.err)
  let[URL,I=1]=data.inside.splits;
	I=Number(I)-1
	if(isNaN(I)||I<0||I>10) return d.aoiError.fnError(d,'index',{inside:data.inside})
	if(!d.embeds[I])d.embeds[I]=new d.embed()
	d.embeds[I].setImage(URL.addBrackets())
	return{code:d.util.setCode(data),embeds:d.embeds}
}
