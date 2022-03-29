module.exports = async d => {
  var t = d.util.openFunc(d);
  if(t.err)return d.error(t.err)
	var[o]=t.inside.splits;
	t.result=eval(`Object.assign({},d.client)?.${o}`)??'';
	return{code:d.util.setCode(t)}
}