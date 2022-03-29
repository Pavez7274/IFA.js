module.exports = d => {
  const data=d.util.openFunc(d)
  const[ID=d.message?.id,M=!0] = data.inside.splits;
	d.allowedMentions.repliedUser=d.util.toBoolean(M)
	return{code:d.util.setCode(data),reply:{message:ID,user:d.util.toBoolean(M)},allowedMentions:d.allowedMentions}
}