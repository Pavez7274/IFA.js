module.exports=async d=>{
	const{code}=d.command;const inside=d.unpack()
	let[T=new Date(),I=1]=inside.splits;I=Number(I)-1;
  if(isNaN(I)||I<0)d.aoiError.fnError(d,'index',{inside})
	if(!d.embeds[I])d.embeds[I]=new d.embed()
	d.embeds[I].setTimestamp(T)
	return{code:d.util.setCode({function:d.func,inside,code}),embeds:d.embeds}
}