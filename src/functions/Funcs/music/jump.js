module.exports = async d => {
	const { code } = d.command
	const inside = d.unpack()
	const err = d.inside(inside)
	if (err) return d.error(err)
	let [hm] = inside.inside

	try {
		const queue = await d.client._distube.getQueue(d.message)
		if(!typeof hm === 'number') d.aoiError.fnError(d, 'custom', {inside:inside}, `Invalid Number Provided In ${hm}`)
		queue.jump(hm)
	} catch (e) {
		d.aoiError.fnError(d, 'custom', {}, e.message)
	}

	return {
		code: d.util.setCode({ function: d.func, code })
	}
}