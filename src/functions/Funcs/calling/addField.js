module.exports=async d=>{
  const{code}=d.command;const inside=d.unpack();const err=d.inside(inside);
  if(err)return d.error(err);
	let[N,V,IN=!1,I=1]=inside.splits;
  I=Number(I)-1
	if(isNaN(I)||I<0)
	d.aoiError.fnError(d,'index',{inside})
	if(!d.embeds[I])d.embeds[I]=new d.embed()
	d.embeds[I].addField(N.addBrackets(),V.addBrackets(),d.util.toBoolean(IN))
	return{code:d.util.setCode({function:d.func,inside,code}),embeds:d.embeds};
};
