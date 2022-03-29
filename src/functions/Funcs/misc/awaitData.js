module.exports=d=>{
	var t = d.util.openFunc(d);
	var [o] = t.inside.splits;
	try{
		t.result = eval(`d.data.awaitData?.${o.addBrackets()}`);
  }catch(e){
		t.result = undefined;
  }
	return{code:d.util.setCode(t)};
};
