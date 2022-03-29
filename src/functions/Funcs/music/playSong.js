module.exports = async d => {
	const { code } = d.command
	const inside = d.unpack()
	const err = d.inside(inside)
	if (err) return d.error(err)
	let [song,skip=!1,unshift=!1] = inside.splits

	if(d.util.toBoolean(skip)==='none')d.aoiError.fnError(d,'boolean',{inside})
	if(d.util.toBoolean(unshift)==='none')d.aoiError.fnError(d,'boolean',{inside})
	try {
		await d.client._distube.play(d.message, song.addBrackets(), {
			skip: d.util.toBoolean(skip),
			unshift: d.util.toBoolean(unshift),
		})
	} catch (e) {
		d.aoiError.fnError(d,'custom',{},e.message)
	}

	return {
		code: d.util.setCode({function:d.func,code,inside})
	}
}