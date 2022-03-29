const I=require('../../interpreter.js');require('colors')
module.exports=async c_=>{
  let chan;const data={client:c_}
  for(const c of c_.cmd.ready.allValues()){if(c.channel?.includes('$')){const id=await I(c_,data,[],{name:'ChannelParser',code:c.channel},c_.db,true);chan=c_.channels.cache.get(id?.code);data.channel=chan;data.guild=chan.guild}else chan=c_.channels.cache.get(c.channel);await I(c_,data,[],c,c_.db,false,chan?.id,{},chan)
  }
  console.log(`Initialized on ${'ifa.js'.cyan} | ${require("../../../package.json").version.cyan}`);console.log('Akarui Development'.red,'official server:','https://aoi.js.org/invite'.blue);console.log('Kaede Studio'.red,'official server:','https://discord.gg/qCNgyTDJp5'.blue)
}