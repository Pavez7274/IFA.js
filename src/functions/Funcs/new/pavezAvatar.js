module.exports = async d => {
    let {code, result} = d.util.openFunc(d);
		const pavez = await d.util.getUser(d, '788869971073040454');

    result = pavez.avatarURL({format:'png',size:4096,dynamic: true});

    return {
        code: d.util.setCode({function: d.func, code, result})
    }
}