module.exports = async d => {
	const { code } = d.command
	const inside = d.unpack()
	const err = d.inside(inside)
	if (err) return d.error(err)
	let [ch, msg] = inside.splits; let error = !0
	ch = await d.client.channels.cache.get(ch)
	if(!ch) d.aoiError.fnError(d, 'channel', {inside: inside})
	msg = await ch.messages.fetch(msg)
	if(!msg) d.aoiError.fnError(d, 'message', {inside:inside})
	const ga = await d.client.giveawaysManager.giveaways.find(k=>k.messageID===msg.id)

	try {
		await d.client.giveawaysManager.unpause(msg.id)
	} catch (e) {
		error = !1
		console.log(e)
	}

	return {
		code: d.util.setCode({ function: d.func, code, inside, result: error })
	}
}