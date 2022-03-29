module.exports=d=>{
	var data=d.util.openFunc(d)
	let[name,value]=data.inside.splits,lh=!1;
	if(name.endsWith('++')){
		name=name.slice(0,name.length-2);
		lh=!0;
	}
	if(!value){
		//data.result=d.data.vars[name?.addBrackets()]
		var VAR=eval(`d.data.vars?.${name.addBrackets()}`);
		if(!VAR){
			return d.aoiError.fnError(d,'custom',data,`Variable ${name} does exists!`)
		}
		if(lh){
			eval(`++d.vars?.${name.addBrackets()}`);
			d.data.vars=d.vars
		}else data.result=typeof VAR=='object'?JSON.stringify(VAR):VAR;
		return{code:d.util.setCode(data),data:d.data}
	}else{
		try{
			value=value.toObject()
		}catch(e){}
		try{
			if(typeof value!=='object')value=JSON.parse(value)
		}catch(e){}
		eval(`d.vars.${name.addBrackets()}=typeof value=='string'?value.addBrackets():value`)
		d.data.vars=d.vars;
		return{code:d.util.setCode(data),data:d.data};
	} 
}