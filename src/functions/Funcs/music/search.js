module.exports = async d => {
	const { code } = d.command
	const inside = d.unpack()
	const err = d.inside(inside)
	if (err) return d.error(err)
	let [query, separator=', ', limit = 1, type = 'video', safe = !0] = inside.splits

	let result = await d.client._distube.search(query, { limit: limit, type: type, safeSearch: safe })
	result = result.map(s => s.name)

	return {
		code: d.util.setCode({ function: d.func, code, inside, result: result.join(separator) })
	}
}