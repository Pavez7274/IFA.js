module.exports = async d => {
  const{code}=d.command;const inside=d.unpack();const err=d.inside(inside)
  if(err)return d.error(err)
	let[N,URL,I=1]=inside.splits;
  I=Number(I)-1
	if(isNaN(I)||I<0)d.aoiError.fnError(d,'index',{inside})
	if(!d.embeds[I])d.embeds[I]=new d.embed()
	d.embeds[I].setFooter(N.addBrackets(),URL?.addBrackets())
	return{code:d.util.setCode({function:d.func,code,inside}),embeds:d.embeds}
}