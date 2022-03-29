module.exports = async d => {
  var t=d.util.openFunc(d);
	var[arg]=t.inside.splits;	if(arg&&isNaN(arg)){
		t.result=eval(`Object.assign({},d.message)?.${arg}`)
	}else{
		if(arg<1)return d.aoiError.fnError(d,'index',{inside:t.inside})
		t.result=arg?d.args[arg-1]?.deleteBrackets():d.args.join(' ')?.deleteBrackets()
	}
  return{code:d.util.setCode(t)}
}