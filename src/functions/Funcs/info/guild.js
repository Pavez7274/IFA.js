module.exports=async d => {
  var t=d.util.openFunc(d);
	var[o='name',i=d.guild?.id,j=!1]=t.inside.splits;
  var s=await d.util.getGuild(d,i);
	if(!s)return d.aoiError.fnError(d,'guild',t)
	t.result=eval(`Object.assign({},s)?.${o}`)??'';
	if(t.result?.guild)delete t.result.guild;
	if(typeof t.result==='object'){
		t.result=d.util.toBoolean(j)
			? JSON.stringify(t.result)
			: require('util').inspect(t.result,{depth:1});
	};
  return{code:d.util.setCode(t)};
}