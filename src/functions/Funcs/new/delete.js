module.exports=d=>{
	var data=d.util.openFunc(d)
	let[name]=data.inside.splits
	eval(`delete d.vars.${name.addBrackets()}`)
  d.data.vars=d.vars
	return{code:d.util.setCode(data),data:d.data}
}