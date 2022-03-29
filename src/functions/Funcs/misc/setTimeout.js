var{Time}=require('../../../utils/helpers/customParser.js');
var{Timeout}=require('../../../utils/helpers/functions.js')
module.exports=async d=>{
	var t = d.util.openFunc(d);
	if(t.err)return d.error(t.err);
	var[time,code]=t.inside.splits;
	require("timers/promises").setTimeout(()=>console.log('adsfasf'),10000);
	return{code:d.util.setCode(t)}
}
/*
module.exports=d=>{
	var data = d.util.openFunc(d);
	if(data.err) return d.error(data.err);
	var[name, duration, timeoutData, pulse] = data.inside.splits;

    const time = isNaN(duration) ? Time.parse(duration)?.ms : Number(duration);
    const pulseEvery = pulse ? (isNaN(pulse) ? Time.parse(pulse)?.ms : Number(pulse)) : undefined;
    const timeoutName = name.trim() === '' ? undefined : name.addBrackets();
    let tdata = {};

    if (timeoutData.addBrackets().startsWith('{')) {
        try {
            tdata = JSON.parse(timeoutData.addBrackets());
        } catch (e) {
            d.aoiError.fnError(d, 'custom', {inside: data.inside});
        }
    } else {
        for (let timeData of timeoutData.split('\n')) {
            timeData = timeData.split(':');

            tdata[timeData[0].trim()] = timeData[1].trim();
        }
    }

    Timeout(d, name.addBrackets(), time, tdata, pulseEvery);

    return {
        code: d.util.setCode(data)
    }
}
*/