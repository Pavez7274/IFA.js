module.exports = async d => {
	const { code } = d.command
	const inside = d.unpack()
	const err = d.inside(inside)
	if (err) return d.error(err)
	let options
	try {
		options = JSON.parse(inside.inside)
	} catch {
		d.aoiError.fnError(d, 'custom', {inside: inside}, `Failed to parse object in ${inside.inside}`)
	}
	const ch = await d.client.channels.cache.get(options.channel)
	if(!ch) d.aoiError.fnError(d, 'channel', {inside: inside})

	try {
		await d.client.giveawaysManager.start(ch,options)
	} catch (e) {
		d.aoiError.fnError(d, 'custom', {inside: inside}, e)
	}

	return {
		code: d.util.setCode({ function: d.func, code, inside })
	}
}