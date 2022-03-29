module.exports = async d => {
	const { code } = d.command
	const inside = d.unpack()
	const err = d.inside(inside)
	if (err) return d.error(err)
	let [
		ch,
		winnerCount,
		prize,
		duration,
		hostedBy = d.author,
		botsCanWin = false,
		reaction = '🎉'
	] = inside.splits

	ch = await d.client.channels.cache.get(ch)
	if(!ch) d.aoiError.fnError(d, 'channel', {inside: inside})
	hostedBy = await d.client.users.fetch(hostedBy)
	if(!hostedBy) d.aoiError.fnError(d, 'user', {inside:inside})

	try {
		await d.client.giveawaysManager.start(ch, {
			duration: duration,
			winnerCount: winnerCount,
			prize: prize,
			hostedBy: hostedBy,
			botsCanWin: botsCanWin,
			reaction: reaction
		})
	} catch (e) {
		d.aoiError.fnError(d, 'custom', {inside: inside}, e)
	}

	return {
		code: d.util.setCode({ function: d.func, code, inside })
	}
}