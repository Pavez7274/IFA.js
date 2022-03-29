module.exports=d=>{
  var data=d.util.openFunc(d)
  if(data.err)return d.error(data.err);
	let[C,I=1]=data.inside.splits
	if(d.util.isValidIndex(I))return d.aoiError.fnError(d,'index',{inside:data.inside});
	I=Number(I)-1
  if(!d.embeds[I])d.embeds[I]=new d.embed()
  d.embeds[I].setColor(C.addBrackets())
	return{code:d.util.setCode(data),embeds:d.embeds}
}