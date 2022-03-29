module.exports = async d => {
  const{code}=d.command;const inside=d.unpack();
  const err=d.inside(inside);
  if(err)return d.error(err);
  let[T,I=1]=inside.splits;
  if(isNaN(I)||I<1||I>10)return d.aoiError.fnError(d,'index',{inside})
  I=I-1
	if(!d.embeds[I])d.embeds[I]=new d.embed()
  d.embeds[I].setDescription(T.addBrackets())
	return{code: d.util.setCode({function:d.func,code,inside}),embeds:d.embeds}
}