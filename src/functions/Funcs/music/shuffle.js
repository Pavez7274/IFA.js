module.exports = async d => {
	const { code } = d.command

	try {
		const queue = await d.client._distube.getQueue(d.message)
		queue.shuffle()
	} catch (e) {
		d.aoiError.fnError(d, 'custom', {}, e.message)
	}

	return {
		code: d.util.setCode({ function: d.func, code })
	}
}