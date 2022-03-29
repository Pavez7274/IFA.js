const Interpreter=require('../../../interpreter.js');
async function evalCode(d,code,Data={returnCode:!0}){
	return await Interpreter(d.client,d.message,d.args,{name:'Eval',code},d.client.db,Data.returnCode,Data?.channelUsed,d.data,undefined,!1,!1,!1,Data?.send)
} 
module.exports=async d=>{
  const data=d.util.openFunc(d)
	if(data.err)return d.error(data.err)
	let[condition,trueawait,falseawait='']=data.inside.splits
	condition=(await evalCode(d,`$checkCondition[${condition?.addBrackets()}]`)).code.addBrackets()
	data.result=d.util.toBoolean(condition)?trueawait:falseawait
	data.result=
(await evalCode(d,data.result?.addBrackets(),{returnCode:!0,send:!0}))?.code.addBrackets()
  return{code:d.util.setCode(data)};
};

/*
	if(data.result.includes("{execute:")) {
        const cmd = d.client.cmd.awaited.find(
            (x) =>
                x.name.toLowerCase() ===
                data.result
                    .addBrackets()
                    .split("{execute:")[1]
                    .split("}")[0]
                    .toLowerCase(),
        );
        if (!cmd)
            return d.aoiError.fnError(
                d,
                "custom",
                {},
                `Invalid Awaited Command: '${data.result.addBrackets().split("{execute:")[1].split("}")[0]}' Provided`,
            );
        await Interpreter(
            d.client,
            d.message,
            d.args,
            cmd,
            d.client.db,
            false,
            undefined,
            d.data,
        );
        data.result = data.result
            .addBrackets()
            .replace(
                `{execute:${
                    data.result.addBrackets().split("{execute:")[1].split("}")[0]
                }}`,
                "",
            );
	} else 
*/