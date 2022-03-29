const{toBoolean}=require('../classes/Util.js')
class SlashOption {
  static choice(O) {
		const C=[];O=O.split('{choice:').slice(1)
		for(let o of O){o=o.split('}')[0].split(':');const N=o.shift()?.addBrackets();const V=o.shift()?.addBrackets()}
		return C
	}
	
	static async string(O) {
		O=O.split('{string:').slice(1);const SO=[]
		for(let o of O){o=o.split(':');const N=o.shift()?.addBrackets();const D=o.shift()?.addBrackets();const R=toBoolean(o?.shift()?.addBrackets(),!1,!0);const C=o.join(':');let Cs;C.trim().length?Cs=this.choice(C):Cs=[];SO.push({type:3,N,D,R,Cs})}
		return SO
  }

  static async integer(O){
		O=O.split('{integer:').slice(1);const IO=[]
		for(let o of O){o=o.split(':');const N=o.shift()?.addBrackets();const D=o.shift()?.addBrackets();const R=toBoolean(o?.shift()?.addBrackets(),!1,!0);const C=o.join(':');let Cs;C.trim().length?Cs=this.choice(C):Cs=[];SO.push({type:4,N,D,R,Cs})}
		return IO
  }

  static async number(O){
    O=O.split('{number:').slice(1);const NO=[]
    for(const o of O){const N=o.shift()?.addBrackets();const D=o.shift()?.addBrackets();const R=toBoolean(o?.shift()?.addBrackets(),!1,!0);const C=o.join(":");let Cs;C.trim().length?Cs=this.choice(C):Cs=[];NO.push({type:10,N,D,R,Cs})}
    return NO
  }

  static async boolean(O){
    O=O.split('{boolean:').slice(1);const BO=[];
    for(const o of O){const N=o.shift()?.addBrackets();const D=o.shift()?.addBrackets();const R=toBoolean(o?.shift()?.addBrackets(),!1,!0);BO.push({type:5,N,D,R})}
    return BO
  }

  static async user(O) {
    O=O.split('{user:').slice(1);const US=[];
    for(const o of O){const N=o.shift()?.addBrackets();const D=o.shift()?.addBrackets();const R=toBoolean(o?.shift()?.addBrackets(),!1,!0);US.push({type:6,N,D,R})}
    return US
  }

  static async channel(O){
    O=O.split('{channel:').slice(1);const CO=[];
    for(const o of O){const N = o.shift()?.addBrackets();const D = o.shift()?.addBrackets();const R=toBoolean(o?.shift()?.addBrackets(),!1,!0);CO.push({type:7,N,D,R})}
    return CO
  }

  static async role(O){
    O=O.split('{role:').slice(1);const RO=[];
    for(const o of O){const N=o.shift()?.addBrackets();const D=o.shift()?.addBrackets();const R=toBoolean(o?.shift()?.addBrackets(),!1,!0);RO.push({type:8,N,D,R})}
    return RO
  }

  static async mentionable(O) {
    O=O.split('{mentionable:').slice(1);const MO=[];
    for(let o of O){o = o.split('}')[0].split(':');const N=o.shift()?.addBrackets();const D=o.shift()?.addBrackets();const R=toBoolean(o?.shift()?.addBrackets(),!1,!0);MO.push({type:9,N,D,R})}
    return MO
  }

  static async subCommand(O){
    O=O.split('{subCommand:').slice(1);const SO=[];
    for(let o of O){const I=o.lastIndexOf('}');o=o.slice(0, I).split(':');const N=o.shift()?.addBrackets();const D=o.shift()?.addBrackets();const os=o.join(':');let _op=[];let opt=os;const Checker=(o)=>opt.includes(o);if(Checker('string')) _op = _op.concat(await this.string(opt));if(Checker('integer'))_op=_op.concat(await this.integer(opt));if(Checker('boolean'))_op=_op.concat(await this.boolean(opt));if(Checker('user'))_op=_op.concat(await this.user(opt));if(Checker('channel'))_op=_op.concat(await this.channel(opt));if(Checker('role'))_op=_op.concat(await this.role(opt));if(Checker('mentionable'))_op=_op.concat(await this.mentionable(opt));if(Checker("number"))_op=_op.concat(await this.number(opt));SO.push({N,D,type:1,options:_op})}
    return SO
  }

  static async subGroup(O){
    O=O.split('{subGroup:').slice(1);const GO=[];
    for(let o of O){const I=o.lastIndexOf('}');o=o.slice(0,I).split(':');const N=o.shift()?.addBrackets();const D=o.shift()?.addBrackets();let _op=[];const opts=o.join(':');_op=_op.concat(await this.subCommand(opts));GO.push({N,D,type:2,options:_op})}
    return GO
  }
}
module.exports=SlashOption