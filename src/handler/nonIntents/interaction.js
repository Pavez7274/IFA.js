const{Interaction,ButtonInteraction,SelectMenuInteraction,ContextMenuInteraction,CommandInteraction}=require('discord.js');const Interpreter=require('../../interpreter.js');const{InteractionTypes,MessageComponentTypes}=require('../../utils/InteractionConstants.js');
/**
 * @param  {Interaction | ButtonInteraction | SelectMenuInteraction | ContextMenuInteraction | CommandInteraction} interaction
 * @param  {import('../../classes/Bot.js')} client
 */
module.exports=async(I,C)=>{
  C.interactionManager.resolve(I)
  if(I.isMessageComponent())C.interactionManager.emit('messageComponentInteraction',I);let cmds
  if(InteractionTypes[I.type]==='component'){
    cmds=C.cmd.interaction[MessageComponentTypes[I.componentType]].filter(x=>x.name?Array.isArray(x.name)?x.name?.includes(I.customId):x.name===I.customId:!x.name).allValues()
  }else cmds=C.cmd.interaction.slash.filter(x=>x.name?.toLowerCase()===I.commandName?.toLowerCase()).allValues()
	if(!cmds.length) return
	const data={client:C,guild:I.guild,message:I?.message,channel:I.channel,author:I.author,member:I.member}
	for(const cmd of cmds){
		if(cmd.name?.includes("$"))cmd.name=(await Interpreter(C,data,[],{code:cmd.name,name:'NameParser'},C.db,!0))?.code
		await Interpreter(C,data,I.values||I.options?._hoistedOptions?.map(x=>x.value)||[],cmd,C.db,!1,undefined,{interaction:I},undefined)
	}
}