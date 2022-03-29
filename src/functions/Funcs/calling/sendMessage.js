module.exports=async d=>{
	var data=d.util.openFunc(d);
	if(data.err)return d.error(data.err);
	let[msg,ch=d?.channel.id,returnId='!1']=data.inside.splits
	ch=d.util.getChannel(d,ch,!0)
	if(!ch)return d.aoiError.fnError(d,'channel',{inside:data.inside});
	returnId=d.util.toBoolean(returnId)
	let result=await d.interpreter(d.client,d.message,d.args,{
        name:'Eval',
        code:msg.addBrackets()
    },d.client.db,!0,ch,d.data,ch,!1,!1,returnId,!0)
	data.result=returnId?result?.id:undefined

    return {
        code: d.util.setCode(data)
    }
} 
/*module.exports = async d => {
    const {code} = d.command;
    const inside = d.unpack();
    const err = d.inside(inside);
    if (err) return d.error(err);

    let [message, returnId = "no"] = inside.splits;

    message = await d.util.errorParser(message, d);

    const msg = await d.aoiError.makeMessageError(d.client, d.channel, message, message.options, d);


    const result = (returnId === "yes" ? msg?.id : "") || "";

    return {
        code: d.util.setCode({function: d.func, code, inside, result})
    }
}*/