module.exports=async d=>{
  var t=d.util.openFunc(d);
  if(t.err)return d.error(t.err);
	var[n,o]=t.inside.splits;
	var c = d.client.cmd.default
		.find(x=>(
			x.name.toLowerCase()===n.toLowerCase())||(Array.isArray(x.aliases)?x.aliases?.includes(n.toLowerCase()):(x.aliases?.toLowerCase()===n.toLowerCase()))
		);
  try{
    t.result=eval(`c?.${o}`)
  }catch(e){
    result = ""
  };
	return{code:d.util.setCode(t)}
} 