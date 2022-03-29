module.exports = async d => {
	const { code } = d.command
	const queue = await d.client._distube.getQueue(d.message)
	let result

	try {
		const newMode = await queue.toggleAutoplay()
		result = newMode ? 'enabled' : 'disabled'
	} catch (e) {
		d.aoiError.fnError(d, 'custom', {}, e.message)
	}

	return {
		code: d.util.setCode({ function: d.func, code, result: result })
	}
}