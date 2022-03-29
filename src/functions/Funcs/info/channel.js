module.exports=async d=>{
  var t=d.util.openFunc(d)
  if(t.err)return d.error(t.err)
	let[opt,ch=d?.channel.id]=t.inside.splits
	ch=await d.util.getChannel(d,ch)
	if(!ch)return d.aoiError.fnError(d,'channel',{inside:t.inside})
	t.result=eval(`d.util.removeFunctions(ch)?.${opt}`);
	return{code:d.util.setCode(t)}
}