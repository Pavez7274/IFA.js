module.exports=async d=>{
	const code=d.command.code;const inside=d.unpack();const err=d.inside(inside);
  if(err)return d.error(err)
	let[MID,U,IDS,CMDS,EM='',US=1,D='']=inside.splits
	if(EM?.trim!==''&&EM)EM=await d.util.errorParser(EM,d)
	if(D!=='')try{D=JSON.parse(D)}catch(e){d.aoiError.fnError(d,'custom',{inside},'Invalid Data Provided In')}
	CMDS=CMDS.split(',')
	CMDS.forEach(x=>{
		if(!d.client.cmd.awaited.find(y=>y.name.toLowerCase()===x.toLowerCase()))d.aoiError.fnError(d,'custom',{},`Could Not Find AwaitedCommand '${x}'`)
	})
	IDS=IDS.split(',');
	const emsg=await d.util.errorParser(EM)
	const Component=new d.client.interactionManager.awaitComponents({msgId:MID,filter:U,customIds:IDS,cmds:CMDS,errorMessage:emsg,uses:US},d.client,D)
	d.client.interactionManager.on('messageComponentInteraction',interact)
	Component.on('AwaitComponent',async interaction=>{
		const index=CMDS[IDS?.indexOf(interaction.customId)]
		const cmd=d.client.cmd.awaited.find(x=>x.name.toLowerCase()===index.toLowerCase())
		if(!cmd)return;
		await d.interpreter(d.client,interaction,interaction.message.content?.split(' '),cmd,d.client.db,!1,undefined,{awaitData: Component.data, interaction:interaction});
  })
	async function interact(interaction){
		if(Component.uses<=Component.tries){
			d.client.interactionManager.removeListener('messageComponentInteraction',interact)
    }else Component.await(interaction.message.id,interaction.user.id,interaction.customId,interaction)
  }
	
	return{code:d.util.setCode({function:d.func,code,inside})};
};