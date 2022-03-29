const{MessageAttachment}=require("discord.js")
module.exports=async d=>{
  const{code}=d.command;const inside=d.unpack();const err=d.inside(inside)
  if(err)return d.error(err)
	let[G,U,N,R=!1,tags,description,reason]=inside.splits
	G=await d.util.getGuild(d,G)
  if(!G)return d.aoiError.fnError(d,'guild',{inside})
	const A=new MessageAttachment(U)
	const sticker=await G.stickers
		.create(A,N,tags,{description,reason})
			.catch((e)=>d.aoiError.fnError(d,'custom',{},'Failed To Create Sticker With Reason: '+e))
	if(d.util.toBoolean(R))d.stickers.push(sticker)
	return{code:d.util.setCode({function:d.func,code,inside}),sticker:d.stickers}
}