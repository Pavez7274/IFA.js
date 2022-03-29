var IF = require('./utils/helpers/if.js');
var Discord = require('discord.js');
var { CustomFunction } = require('./classes/Functions.js');
var AoiError = require('./classes/AoiError.js');
var Util = require('./classes/Util.js');
var { Time } = require('./utils/helpers/customParser.js');
var { CheckCondition } = require('./utils/helpers/checkCondition.js');
var { mustEscape } = require('./utils/helpers/mustEscape.js');
var { Command } = require('./classes/Commands.js');
var Interpreter = async(
	client,
	message,
	args,
	command,
	_db,
	returnCode = !1,
	channelUsed,
	data = {},
	useChannel,
	returnMessage,
	returnExecution,
	returnID,
	sendMessage = !1
) => {
	try{
		//defining vars//
		let code=command.code
			?.split('\n').map(l=>l.split('//')[0]).join('\n')
			?.replaceAll("\\]", "#LEFT#").split("\\[").join("#RIGHT#")
			.replaceAll("\\,", "#COMMA#")
			.replaceAll("\\;", "#SEMI#");

    let [
			randoms,
			timezone,
			letVars,
			object,
			disableMentions,
			array,
			reactions,
			channel,
			author,
			guild,
			mentions,
			member,
			msg
		] = [
			data.randoms||{},
      'UTC',
			data.vars||{},
			data.object||{},
			['roles','users','everyone'],
			data.array||[],
			[],
			message.channel,
			message.author,
			message.guild,
			message.mentions,
			message.member,
			message
    ]
    let anErrorOccuredPlsWait,embeds,deleteIn,suppressErrors,editIn=undefined,error,attachments=[],components=[],reply,allowedMentions=disableMentions,FuncData,msgobj,funcLine,returnData={},funcs
		command.codeLines=client.functionManager.serializeCode(command.code)
		funcs=command.functions?.length?command.functions:client.functionManager.findFunctions(command.code)
		// debug system //
		const debug={code,functions:command.functions},start=Date.now()
		if(client?.aoiOptions?.debugs?.interpreter){
			console.log(`|------------------------------------------|`);
      console.time(`interpreter-${start}`) 
		}
		if(command['$if']==='v4'){
			code=(await IF({client,code,message,channel,args})).code;
			funcs=client.functionManager.findFunctions(code)
		}

		///////////////////////////////////////////////////////////////////
		var rft = command.readFromTop || (client.options.readFromTop && !command.readFromBottom);
		if(rft){
			/*for(var line of command.codeLines){
				var funcsInLine = client.functionManager.findFunctions(line);
				var lineIndex = command.codeLines.indexOf(line);
				var n = 1;
				if(!line.trim().length || !funcsInLine || readBlocks.includes(lineIndex)) continue;
				console.log(funcsInLine.map());
				for(var i = 0;funcsInLine > i; i++){
					var e = unpack(code, funcsInLine[i-1]).lines;
					console.log(e);
					if(e>n) n = e;
				};
				n = n + lineIndex;
				for(var i = n-1;i>0;i--){
					!readBlocks.includes(i) && readBlocks.push(i)
				}
				var block = command.codeLines.slice(lineIndex, n).join('\n');
				blocks.push(block);
			};*/
			var _cl = command.codeLines.reverse();
			funcs = client.functionManager.findFunctions(_cl.join('\n'));
		}

		var T = funcs.filter(f=>f==='$nonEscape').length;
		for(let i=0;T>i;i++){
			funcs = client.functionManager.prioritizeFunction(code,'$nonEscape',i-1,rft);
		};
		
		var T2 = funcs.filter(f=>f==='$if').length;
		for(let i=0;T2>i;i++){
			funcs = client.functionManager.prioritizeFunction(code,'$if',i-1,rft);
		};
		console.log(funcs);

		///////////////////////////////////////////////////////////////////

		// parsing functions //
		for(let i=funcs.length;i>0;i--){
			if (!funcs.length)break;
			if (i>funcs.length&&funcs.length!==0)i=funcs.length
			let func=funcs[i-1]
			if(error)break;
			const regex=new RegExp('\\'+func.replace('[','\\['),'gi')
			code=code.replace(regex,func)
			// more debug //
			debug[func]={regex,func}
			command.codeLines?.map(x=>x.replace(regex,func))
			funcLine=command.codeLines.length-command.codeLines?.reverse().findIndex(x=>x.toLowerCase().split(' ').includes(func.toLowerCase()))
			const functionObj=client.functionManager.cache.get(func.replace('$','').replace('[',''))
			if(functionObj instanceof CustomFunction&&functionObj.type==='aoi.js'){
				const d = {};
				Object.assign(d, functionObj);
				let param = [];
				for(let p=functionObj.params.length-1;p>=0;p--){
					d.code=d.code.replaceAll(`{${functionObj.params[p]}}`,unpack(code,func).splits[p])
					param.push(functionObj.params[p])
				}
				FuncData=await client.functionManager.interpreter( 
					client,
					message,
					args,
					d,
					client.db,
					true,
					channelUsed,
					{
						randoms:randoms,
						command:{
							name:command.name,
							code:code,
							error:command.error,
							async:command.async||!1,
							functions:command.functions,
							codeLines:command.codeLines
						},
						helpers:{time:Time,checkCondition:CheckCondition,mustEscape},
						args:args,
						aoiError:require('./classes/AoiError.js'),
						data:data,
						func:func,
						funcLine,
						util:Util,
						allowedMentions:allowedMentions,
						embeds:embeds||[],
						components:components,
						files:attachments||[],
						timezone:timezone,
						channelUsed:channelUsed,
						vars:letVars,
						object:object,
						disableMentions:disableMentions,
						returnID:returnID,
						array:array,
						reactions:reactions,
						message:message.message||message,
						msg:msg.message || msg,
						author:author,
						guild:guild,
						channel:channel,
						member:member,
						mentions:mentions, 
						unpack(Code=code,Func=func){
							var last=Code.split(Func.replace('[','')).length-1
							var sliced=Code.split(Func.replace('[',''))[last]
							return sliced.after()
						},
						inside(unpacked){
							if(typeof unpacked.inside!=='string'){
								if(suppressErrors)return suppressErrors
								else return client.options.suppressAllErrors?client.options.errorMessage:`\`${func}: Invalid Usage (line : ${funcLine})\``
							} else return !1
						},
						noop(){},
						async error(err){
							error=!0
							client.emit('functionError',{
								error: err?.addBrackets(),
								function: func,
								command: command.name,
								channel,
								guild
							},client)
							if(client.options.suppressAllErrors){
								if(client.options.errorMessage){
									const{EmbedParser,FileParser,ComponentParser}=require('./handler/parsers.js')
									if(!message||!message.channel){
										console.error(client.options.errorMessage.addBrackets())
									}else{
										let[con,em,com,fil]=[' ','','',''],isArray=Array.isArray(client.options.errorMessage)
										if(isArray){
											isArray=client.options.errorMessage
											con=isArray[0]===''||!isArray[0]?' ':isArray[0]
											em=isArray[1]!==''&&isArray[1]?await EmbedParser(isArray[1]||''):[]
											fil=isArray[3]!==''&&isArray[3]?await FileParser(isArray[3]||''):[]
											com=isArray[2]!==''&&isArray[2]?await ComponentParser(isArray[2]||''):[]
										}else con=client.options.errorMessage.addBrackets()===''?' ':client.options.errorMessage.addBrackets()
										if(!anErrorOccuredPlsWait){
											message.channel.send({
												content:con,
												embeds:em||[],
												components:com||[],
												files:fil||[]
											})
										}
										anErrorOccuredPlsWait=!0
									}
								}else ;
							}else{
								if(!message||!message.channel){
									console.error(err.addBrackets());
								}
								if(suppressErrors&&!anErrorOccuredPlsWait){
									const{ErrorHandler}=require('./handler/parsers.js')
									await ErrorHandler(
										{channel:channel,message:message,guild:guild,author:author},
										suppressErrors?.split('{error}').join(err.addBrackets())
									);
								}else message.channel.send(typeof err==='object'?err:err?.addBrackets());
								anErrorOccuredPlsWait=!0
							}
						},
						interpreter:Interpreter,
						client:client,
						embed:Discord.MessageEmbed
					},
					useChannel,
					returnMessage,
					returnExecution,
					returnID,
					sendMessage
				);
				FuncData.code=code.replaceLast(functionObj.params.length?`${func}${param.join(';')}`:func,FuncData.code);
      }else{
				FuncData=await client.functionManager.cache
					.get(func.replace('$','').replace('[',''))
					?.code({
						randoms:randoms,
						command:{
							name:command.name,
							code:code,
							error:command.error,
							async:command.async||!1,
							functions:command.functions,
							codeLines:command.codeLines
            },
						helpers:{
							time:Time,
							checkCondition:CheckCondition,
							mustEscape
            },
						args:args,
						aoiError:require('./classes/AoiError.js'),
						data:data,
						func:func,
						funcLine,
						util:Util,
						allowedMentions:allowedMentions,
						embeds:embeds||[],
						components:components,
						files:attachments||[],
						timezone:timezone,
						channelUsed:channelUsed,
						vars:letVars,
						object:object,
						disableMentions:disableMentions,
						array:array,
						reactions:reactions,
						message:message.message||message,
						msg:msg.message||msg,
						author:author,
						guild:guild,
						channel:channel,
						member:member,
						mentions:mentions,
						Unpack: unpack, 
						unpack(){
							const last=code.split(func.replace('[','')).length-1,sliced=code.split(func.replace('[',''))[last]
							return sliced.after()
						},
						inside(unpacked){
							if(typeof unpacked.inside!=='string'){
								if(suppressErrors)return suppressErrors
								else return client.options.suppressAllErrors?client.options.errorMessage:`\`${func}: Invalid Usage (line : ${funcLine})\``
							} else return !1
						},
						noop(){},
            async error(err){
							error=!0
							client.emit('functionError',{
								error: err?.addBrackets(),
								function: func,
								command: command.name,
								channel,
								guild
							},client)
							if(client.options.suppressAllErrors){
								if(client.options.errorMessage){
									const{EmbedParser,FileParser,ComponentParser}=require('./handler/parsers.js')
									if(!message||!message.channel){
										console.error(client.options.errorMessage.addBrackets())
									}else{
										let[con,em,com,fil]=[' ','','',''],isArray=Array.isArray(client.options.errorMessage)
										if(isArray){
											isArray=client.options.errorMessage
											con=isArray[0]===''||!isArray[0]?' ':isArray[0]
											em=isArray[1]!==''&&isArray[1]?await EmbedParser(isArray[1]||''):[]
											fil=isArray[3]!==''&&isArray[3]?await FileParser(isArray[3]||''):[]
											com=isArray[2]!==''&&isArray[2]?await ComponentParser(isArray[2]||''):[]
										}else con=client.options.errorMessage.addBrackets()===''?' ':client.options.errorMessage.addBrackets()
										if(!anErrorOccuredPlsWait){
											message.channel.send({
												content:con,
												embeds:em||[],
												components:com||[],
												files:fil||[]
											})
										}
										anErrorOccuredPlsWait=!0
									}
								}else ;
							}else{
								if(!message||!message.channel){
									console.error(err.addBrackets());
								}
								if(suppressErrors&&!anErrorOccuredPlsWait){
									const{ErrorHandler}=require('./handler/parsers.js')
									await ErrorHandler(
										{channel:channel,message:message,guild:guild,author:author},
										suppressErrors?.split('{error}').join(err.addBrackets())
									);
								}else message.channel.send(typeof err==='object'?err:err?.addBrackets());
								anErrorOccuredPlsWait=!0
							}
						},
						interpreter:Interpreter,
						client:client,
						embed:Discord.MessageEmbed
					});
        }
				if(client?.aoiOptions?.debugs?.interpreter){
					debug[func].funcData=require('util').inspect(FuncData,{depth:0});
				}
				code=FuncData?.code??code
				if(FuncData?.randoms)randoms=FuncData.randoms
				if(FuncData?.data){
					data=FuncData.data;
					array=FuncData.data?.array??array;
					object=FuncData?.data?.object??object;
					letVars=FuncData?.data?.vars??letVars;
        }
				if(FuncData?.timezone)timezone=FuncData.timezone;
        if(FuncData?.allowedMentions)allowedMentions=FuncData.allowedMentions;
        if(FuncData?.embeds)embeds=FuncData.embeds;
        if(FuncData?.reactions)reactions=FuncData.reactions;
        if(FuncData?.disableMentions)disableMentions=FuncData.disableMentions;
        if(FuncData?.editIn)editIn=FuncData.editIn;
				if(FuncData?.deleteIn)deleteIn=FuncData.deleteIn;
        if(FuncData?.files)attachments=FuncData.files;
        if(FuncData?.suppressErrors)suppressErrors=FuncData.suppressErrors;
        if(FuncData?.components)components=FuncData.components;
				if(FuncData?.reply)reply=FuncData.reply;
        if(FuncData?.useChannel)useChannel=FuncData.useChannel;
				if(FuncData?.returnID)returnID=FuncData.returnID;
        if(FuncData?.error)error=FuncData?.error;
			}
			if(client?.aoiOptions?.debugs?.interpreter){
				debug.executionTime=Date.now()-start+' ms';
				console.timeEnd(`interpreter-${start}`);
			}
				
			// Embed parser //
			embeds=JSON.parse(JSON.stringify(embeds||[])?.replaceAll('$executionTime',Date.now()-start));

      debug.executionTime=Date.now()-start+' ms';
      code=code?.replace(/\$executiontime/gi,debug.executionTime.split('ms')[0]);

      code=code.trim();
      if(embeds?.some(x=>x===undefined)){
				error=!0;
				return AoiError.consoleError('EmbedError','Some Indexes Are Empty');
      }
      if(returnCode)returnData.code=code;
      if(returnExecution)returnData.data=data;
      if((code.length||embeds?.length||attachments?.length)&&!anErrorOccuredPlsWait&&!error){
				try{
					const send={
						embeds:embeds,
						files:attachments,
						components:components,
						allowedMentions:{
							parse:allowedMentions,
							repliedUser:reply?.user||!1,
						},
						reply:{
							messageReference: reply?.message,
						}
					};
					if(code.trim()!=='')send.content=code.addBrackets()===''?' ':code.addBrackets();
					if(returnCode&&!sendMessage){}else{
						if(!useChannel){
							msgobj=await message.channel?.send(send)
						}else if(reply?.type==='interaction'){
							msgobj=await data?.interaction?.reply(send)
						}else{
							msgobj=await useChannel.send(send)
						}
					}
					if(client?.aoiOptions?.debugs?.interpreter){
						console.log(debug);
						console.log(`|------------------------------------------|`);
					}
					if(reactions?.length){
						const react=setInterval(()=>{
							const r=reactions.shift();
							msgobj.react(r);
							if(!reactions.length)clearInterval(react)
						},1500)
          }
					if(editIn){
						const ee=setInterval(()=>{
              const m=editIn.msgs;
              msgobj.edit(m.shift());
              if(!m.length)clearInterval(ee)
            },editIn.time)
					}
					if(deleteIn)setTimeout(()=>msgobj.delete(),deleteIn);
					if(returnID)returnData.id=msgobj?.id;
					if(returnMessage)returnData.message=msgobj;
        }catch(e){
					console.error(e);
      	}
      }
    return Object.keys(returnData).length ? returnData : undefined;
  }catch(e){
		console.error(e);
	}
}
module.exports=Interpreter;

function unpack(code,func) {
	const last=code.split(func.replace('[','')).length-1,sliced=code.split(func.replace('[',''))[last]
	return sliced.after()
}