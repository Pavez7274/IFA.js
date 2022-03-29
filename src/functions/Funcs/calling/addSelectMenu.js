module.exports=async d=>{
	const{code}=d.command;const inside=d.unpack();const err=d.inside(inside)
  if(err)return d.error(err)
	let[Id,Ph,Miv,Mav,D=!1,R=d.components.length-1]=inside.splits
	if(R<0)R=0
	D=d.util.toBoolean(D)
	if(D=='none')return d.aoiError.fnError(d,'boolean',{inside})
	if(Miv>25||Miv<0)return d.aoiError.fnError(d,'custom',{inside:inside},'minValues must be between 0 and 25 (both inclusive). Provided Invalid In')
  if(Mav>25||Mav<1)return d.aoiError.fnError(d,'custom',{inside:inside},'maxValues must be between 1 and 25 (both Inclusive). Provided Invalid In')
	if (Ph?.length>100)return d.aoiError.fnError(d,'custom',{},'Placeholder should be at most 100 char long',)
	d.components[R]=d.components[R]||{type:1,components:[]}
	d.components[R].components.push({type:'SELECT_MENU',custom_id:Id,options:[],placeholder:Ph,min_values:Number(Miv),max_values:Number(Mav),disabled:D})

	return{code:d.util.setCode({function: d.func, code, inside}),components:d.components}
}