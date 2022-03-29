module.exports=async d=>{
  const data=d.util.openFunc(d)
  if(data.err)return d.error(data.err)
  let[L,S,C,D=!1,E=null,R=1]=data.inside.splits
  if(isNaN(R)||Number(R)<1)return d.aoiError.fnError(d,'index',{inside:data.inside})
  R=Number(R)-1;D=d.util.toBoolean(D);S=isNaN(S)?d.util.constants.ButtonStyleOptions[S]:Number(S)
  if(!S||S>5||S<1)return d.aoiError.fnError(d,'custom',{inside:data.inside},'Invalid Style Provided In')
  if(!d.components[R])d.components[R]={type:1,components:[]}
  const button={label:L,type:2,style:S,disabled:D,emoji:E};button[S===5?'url':'customId']=C
  d.components[R].components.push(button)
  return{code:d.util.setCode(data),components:d.components,}
}