module.exports = async d => {
	const { code } = d.command
	const inside = d.unpack()
	const err = d.inside(inside)
	if (err) return d.error(err)
	let [time] = inside.inside

	try {
		const queue = await d.client._distube.getQueue(d.message)
		if(!typeof time === 'number') d.aoiError.fnError(d, 'custom', {inside:inside}, `Invalid Number Provided In ${time}`)
		queue.seek(time)
	} catch (e) {
		d.aoiError.fnError(d, 'custom', {}, e.message)
	}

	return {
		code: d.util.setCode({ function: d.func, code })
	}
}