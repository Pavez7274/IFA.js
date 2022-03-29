module.exports = async d => {
	const { code } = d.command
	const inside = d.unpack()
	const err = d.inside(inside)
	if (err) return d.error(err)
	let [mode] = inside.splits
	const queue = await d.client._distube.getQueue(d.message)
	let result

	try {
		const newMode = await queue.setRepeatMode(Number(mode))
		result = newMode == 2 ? 'queue' : newMode == 1 ? 'song' : 'disabled'
	} catch (e) {
		d.aoiError.fnError(d, 'custom', {inside: inside}, e.message)
	}

	return {
		code: d.util.setCode({ function: d.func, code, inside, result })
	}
}