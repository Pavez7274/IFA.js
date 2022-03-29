module.exports=async d=>{
	const{code}=d.command;const inside=d.unpack();const err=d.inside(inside)
	if(err)return d.error(err);
	let I=inside.splits[inside.splits.length-1];let data=[];I=Number(I)-1
	isNaN(I)||I<0?I=0:inside.splits.pop()
	for(const f of inside.splits){
		let[N,V,IN]=f.split(':')
		data.push({name:N.addBrackets(),value:V.addBrackets(),inline:d.util.toBoolean(IN)})
	}
	if(!d.embeds[I])d.embeds[I]=new d.embed()
	d.embeds[I].addFields(data)
	return{code:d.util.setCode({function:d.func,inside,code}),embeds:d.embeds}
}
