module.exports = async d => {
	const { code } = d.command
	const inside = d.unpack()
	const err = d.inside(inside)
	if (err) return d.error(err)
	let [index, format, max=10] = inside.splits
	const queue = await d.client._distube.getQueue(d.message)
	let result; let song = queue.songs[parseInt(index)-1]

	try {
		result = format
			.replaceAll('{age_restricted}', song?.age_restricted)
			.replaceAll('{chapters}'. song?.chapters)
			.replaceAll('{dislikes}', song?.dislikes)
			.replaceAll('{likes}', song?.likes)
			.replaceAll('{duration}', song?.duration)
			.replaceAll('{formattedDuration}', song?.formattedDuration)
			.replaceAll('{id}', song?.id)
			.replaceAll('{isLive}', song?.isLive)
			.replaceAll('{member}', song?.member)
			.replaceAll('{user}', song?.user)
			.replaceAll('{name}', song?.name)
			.replaceAll('{playlist}', song?.playlist)
			.replaceAll('{related}', song?.related)
			.replaceAll('{reposts}', song?.reposts)
			.replaceAll('{source}', song?.source)
			.replaceAll('{streamURL}', song?.streamURL)
			.replaceAll('{thumbnail}', song?.thumbnail)
			.replaceAll('{uploader}', song?.uploader)
			.replaceAll('{url}', song?.url)
			.replaceAll('{views}', song?.views)
	} catch (e) {
		d.aoiError.fnError(d, 'custom', {inside: inside}, e.message)
	}

	return {
		code: d.util.setCode({ function: d.func, code, inside, result })
	}
}