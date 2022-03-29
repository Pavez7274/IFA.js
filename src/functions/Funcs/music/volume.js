module.exports = async d => {
	const { code } = d.command
	const inside = d.unpack()
	let [nv='get'] = inside.splits
	const queue = d.client._distube.getQueue(d.message)
	let result

	if (nv.toLowerCase() === 'get') {
		result = queue.volume
	} else {
		nv = parseInt(nv)
		if(!typeof nv === 'number') d.aoiError.fnError(d, 'custom', {inside:inside}, `Invalid Number Provided In ${nv}`)
		queue.setVolume(nv)
	}

	return {
		code: d.util.setCode({ function: d.func, code, inside, result })
	}
}