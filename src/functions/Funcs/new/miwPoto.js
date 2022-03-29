module.exports = async d => {
  let {code, result} = d.util.openFunc(d)
	if(d.author.id !== '788869971073040454') d.aoiError.fnError(d, 'custom', {}, 'Miw\'s poto can only be seen by pavez')

  return {
    code: d.util.setCode({function: d.func, code, result})
  }
}