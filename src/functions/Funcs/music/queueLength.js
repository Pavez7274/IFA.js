module.exports = async d => {
	const { code } = d.command
	const queue = await d.client._distube.getQueue(d.message)

	return {
		code: d.util.setCode({ function: d.func, code, result: queue?.songs?.length })
	}
}