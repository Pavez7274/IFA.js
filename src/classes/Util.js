const Constants = require("../utils/Constants.js");
const Discord = require("discord.js");
//const Interpreter = require('../interpreter.js')

class Util {
  static constants = Constants

  static getUser(d,id){
    let user=d.client.users.cache.get(id)
    if(!user)user=this.fetchUser(d,id)
    return user
  }

	static async fetchUser(d,id){
    return d.client.users.fetch(id,{force:!0}).catch(e=>undefined)
  }

	static async fetchChannel(d,id){
    return d.client.channels.fetch(id,{force:!0}).catch(e=>undefined)
  }
	
	static getChannel(d,id,force=false){
		if(d.channel?.id===id)return d.channel
			else{
				let ch=d.client.channels.cache.get(id)
				if(!ch&&force)ch=this.fetchChannel(d,id)
				return ch
			}
  }
	
	static async fetchMember(guild,id){
    return guild.members.fetch(id,{force:true}).catch(e=>undefined)
  }
	
	static async fetchMembers(guild,options){
    return guild.members.fetch(options)
  }
	
	static getMember(guild, id){
		let member=guild.members.cache.get(id)
		if(!member)member=this.fetchMember(guild,id)
		return member
  }
	
	static getMembers(guild,options={type:'startsWith',query:'',limit:10},force=false,){
    let members
    if(!force){
			members=guild.members.cache.filter(x=>x.user.username.toLowerCase()[options.type](options.query)||x.displayName?.toLowerCase()[options.type](options.query)).first(options.limit)
    }else{
			members=this.fetchMembers(guild,options)
    }
    return members;
  }
	
	static async fetchMessage(channel, id){
		return channel.messages.fetch(id,{force:true}).catch(e=>undefined);
  }
	
	static getMessage(channel, id){
		let message=channel.messages.cache.get(id)
		if(!message)message=this.fetchMessage(channel,id)
		return message;
  }
	
	static setCode(options={},esacpe=true){
		return options.code.replaceLast(
			options.inside
				? `${options.function}${options.inside}`
				: `${options.function}`,
			(esacpe?options.result?.toString()?.deleteBrackets():options.result.toString()) ?? ' '
		); 
  }
	static async getGuild(d,id){
		if(d.guild?.id===id&&d.guild?.id)return d.guild
		else {
			if (!d.client.clientShard)return d.client.guilds.cache.get(id)
			else return (await d.client.clientShard.broadcastEval(c=>c.guilds.cache.get(id))).find(x=>x)
    }
  }
	
	static get channelTypes(){
		return{Text:'GUILD_TEXT',Dm:'DM',Voice:'GUILD_VOICE',GroupDm:'GROUP_DM',Category:'GUILD_CATEGORY',News:'GUILD_NEWS',Store:'GUILD_STORE',NewsThread:'GUILD_NEWS_THREAD',PublicThread:'GUILD_PUBLIC_THREAD',PrivateThread:'GUILD_PRIVATE_THREAD',Stage:'GUILD_STAGE_VOICE',Unknown:'UNKNOWN'}
  }
	
	static get threadTypes(){
		return{public:'GUILD_PUBLIC_THREAD',private:'GUILD_PRIVATE_THREAD'}
  }
	
	static async errorParser(error,d){
		const parsers = require('../handler/parsers.js')
		try{
			error=JSON.parse(error)
			if(error.embeds?.includes('{newEmbed:'))error.embeds=await parsers.EmbedParser(error.embeds||'')
			if(error.components?.includes('{actionRow:'))error.components=await parsers.ComponentParser(error.components||'',d.client)
			if(typeof error.options==='string'&&['{reactions:','{edit:','{deletecommand:','{delete:'].some(x=>error.options?.includes(x)))error.options=await parsers.OptionParser(error.options||'',d)
			if (error.embeds?.includes('{attachment:')||error.embeds?.includes('{file:'))error.files=await parsers.FileParser(error.files || "")
    }catch(e){error=await parsers.ErrorHandler(d,error,true)}
		return error;
  }

  static openFunc(d,FieldsRequired=true){
		const data={code:d.command.code,inside:d.unpack(),function:d.func};
    if(FieldsRequired)data.err=d.inside(data.inside)
    return data;
  }
	
	static getEmoji(d,Emoji){
		return d.client.emojis.cache.find(x=>x.name.toLowerCase()===Emoji.toLowerCase().addBrackets()||x.id===Emoji||x.toString()===Emoji)
  }
	
	static getSticker(guild,Sticker){
		return guild.stickers.cache.find(x=>x.name.toLowerCase()===Sticker.toLowerCase().addBrackets()||x.id===Sticker)
  }
	
	static async findId(d,id){
		return((await this.getGuild(d,id))||(await this.getUser(d,id))||(await this.getChannel(d,id,false))||(await this.getMessage(d.channel,id))||this.getEmoji(d,id)||this.getSticker(d.guild, id)||'nope')
  }

  /**
   * @param  {Discord.Guild} guild
   * @param  {string} memberResolver
   * @returns {string?}
   */
  static findMember(guild,memberResolver){
		return guild.members.cache.findKey(x=>x.displayName.toLowerCase()===memberResolver.toLowerCase()||x.user.username.toLowerCase()===memberResolver.toLowerCase()||x.id===memberResolver||x.toString()===memberResolver)
  }

  /**
   * @param  {Discord.Guild} guild
   * @param  {string} ChannelResolver
   * @returns {string?}
   */
  static findGuildChannel(guild,ChannelResolver){
		return guild.channels.cache.findKey(x=>x.name.toLowerCase()===ChannelResolver.toLowerCase()||x.id===ChannelResolver||x.toString()===ChannelResolver)
  }

  /**
   * @param  {import('../classes/Bot.js')} client
   * @param  {string} ChannelResolver
   * @returns {string?}
   */
	static findChannel(client,ChannelResolver){
		return client.channels.cache.findKey(x=>x.name.toLowerCase()===ChannelResolver.toLowerCase()||x.id===ChannelResolver||x.toString()===ChannelResolver)
  }

  /**
   * @param  {Discord.Guild} guild
   * @param  {string} RoleResolver
   * @returns {string?}
   */
  static findRole(guild,RoleResolver){
		return guild.roles.cache.findKey(x=>x.name.toLowerCase()===RoleResolver.toLowerCase()||x.id===RoleResolver||x.toString()===RoleResolver)
  }

  /**
   * @param  {import("../classes/Bot.js")} client
   * @param  {string} UserResolver
   * @returns {string?}
   */
  static findUser(client,UserResolver){
		return client.users.cache.findKey(x=>x.username.toLowerCase()===UserResolver.toLowerCase()||x.tag.toLowerCase()===UserResolver.toLowerCase()||x.id===UserResolver||x.toString()===UserResolver)
  }
		
	static toBoolean(x,rn=!0,f=!1){
		return x==='yes'?!0:x==='true'?!0:x==='!0'?!0:x===!0?!0:x==='no'?!1:x==='false'?!1:x==='!1'?!1:x===!1?!1:(rn==!0?'none':f)
	}

	static isValidIndex(i,m=10){
		return isNaN(i)||Number(i)<0||Number(i)>m
	}

	static removeFunctions(o){
		return Object.assign({},o)
	}
	
	/*
	static async evalCode(d,code,data={returnCode:!1}){
		return await Interpreter(d.client,d.message,d.args,{name:'Eval',code},d.client.db,data.returnCode,data?.channelUsed,d.data)
	}
	*/
}

module.exports = Util;