module.exports=async d=>{
	const{code}=d.command;const inside=d.unpack();const err=d.inside(inside)
  if(err)return d.error(err)
	let [L,V,D='',DE=!1,E=null,R=d.components.length-1] = inside.splits
	DE=d.util.toBoolean(DE)
	if(DE=='none')return d.aoiError.fnError(d,'boolean',{inside})
	let I=d.components[R]?.components.length-1
	try{d.components[R].components[I].options.push({label:L,value:V,description:D,default:DE,emoji:E})}catch(e){d.aoiError.fnError(d,'custom',{},'Failed to add option: '+e)}
	return{code:d.util.setCode({function:d.func,code,inside}),components:d.components}
}