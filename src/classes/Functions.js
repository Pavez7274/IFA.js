const {functions: parser, maps} = require("../functions/parser.js");
const Group = require("../cachehandler/index.js").cache;

class Function {
    constructor(code, name) {
        this.name = name;
        this.code = code;
    }
}

class CustomFunction {
    constructor(d = {}, client) {
        this.client = client;
        this.name = d.name;
        this.code = d.code;
        this.type = d.type;
        this.params = d.params;
        this.functions = this.type === "aoi.js" ? this.serializeFunctions() : undefined;
    }

    serializeFunctions(){
			let Functions=this.client.functionManager.functions,code=this.code?.replace(/\\]/g,'#LEFT#').split('\\[').join('#RIGHT#').replace('\\,', '#COMMA#');
			let customFuncs=[],funcs=[],loadsOfFunc=Functions.filter(thatfunc=>code.toLowerCase().includes(thatfunc.toLowerCase()));
      const funcyboys=code.split("$");
      for(var funcboy of funcyboys){
        let Func=loadsOfFunc.filter(f=>f.toLowerCase()===('$'+funcboy.toLowerCase()).slice(0,f.length));
				if(!Func.length){
					continue
				}
				if(Func.length===1){
					funcs.push(Func[0])
        }else if(Func.length>1){
          funcs.push(Func.sort((a,b)=>b.length-a.length)[0])
        }
      }
	    return funcs;
    }
}

class FunctionManager {
    constructor(client) {
        this.client = client;
        this.maps = maps;
        this.functions = /*Object.keys(parser)*/ parser;
        this.cache = new Group();
        this.cacheFunctions();
        this.interpreter = require("../interpreter.js");
    }

    async cacheFunctions() {
        for (const func of this.functions) {
            try {
                const ogname = func.replace("$", "").replace("[", "");
                //this.cache.set(ogname, new Function(require('../functions/funcs/'+ogname+'.js'),func))
                const file = Object.entries(this.maps).find((y) =>
                    y[1].includes(ogname),
                )?.[0];
                if (!file) continue;
                else {
                    this.cache.set(
                        ogname,
                        new Function(
                            require(`../functions/Funcs/${file}/${ogname}.js`),
                            func,
                        ),
                    );
                }
            } catch (e) {
                console.error(e);
                continue;
            }
        }
    }

    createCustomFunction(...ds) {
        for (const d of ds) {
            this.cache.set(
                d.name.replace("$", ""),
                new CustomFunction(d, this.client),
            );
            this.functions.push(d.name);
        }
    }

    findFunctions(code=''){
			let Functions=this.functions;
      code=code?.replace(/\\]/g,'#LEFT#').split('\\[').join('#RIGHT#').replace('\\,','#COMMA#').replace('\\$','#CHAR#');
      let customFuncs=[],funcs=[],loadsOfFunc=Functions.filter(thatfunc=>code.toLowerCase().includes(thatfunc.toLowerCase()));
      const funcyboys=code.split('$');
      for(var funcboy of funcyboys){
			let Func=loadsOfFunc.filter(f=>f.toLowerCase()===('$'+funcboy.toLowerCase()).slice(0,f.length));
      if(!Func.length){
        continue
      }
      if(Func.length===1){
        funcs.push(Func[0]);
      }else if(Func.length>1){
        funcs.push(Func.sort((a,b)=>b.length-a.length)[0])
  	  }
     }
      return funcs;
    }

		prioritizeFunction(code,Func,Index,t){
			// var t=this.findFunctions(code).filter(f=>f==='$nonEscape').length
			var r=code.split(Func).slice(Index).join(Func).after()?.inside
			code=code.replace(r,r?.deleteBrackets())
			//console.log(r)
			var Funcs=this.findFunctions(code)
			var fns=[]
			for(let i=Funcs.length;i>0;i--){
				var func = Funcs[i-1]
				func === Func ? fns.push(func) : fns.unshift(func)
			}
			return fns
		}

    serializeCode(code) {
        return code?.split("\n");
    }
}

module.exports = {
    FunctionManager,
    Function,
    CustomFunction,
};
