module.exports = async d => {
	const { code } = d.command

	try {
		const queue = await d._client.distube.getQueue(d.message)
		queue.pause()
	} catch (e) {
		d.aoiError.fnError(d, 'custom', {}, e.message)
	}

	return {
		code: d.util.setCode({ function: d.func, code })
	}
}