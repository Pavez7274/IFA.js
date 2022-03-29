module.exports = async d => {
	const { code } = d.command
	const inside = d.unpack()
	const err = d.inside(inside)
	if(err) return err;
	let [value] = inside.inside
	let result = isNaN(value)

	return {
		code: d.util.setCode({ function: d.func, code, inside, result })
	}
}