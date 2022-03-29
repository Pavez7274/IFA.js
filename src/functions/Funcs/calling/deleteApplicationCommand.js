module.exports = async d => {
  const {code} = d.command
  const inside = d.unpack()
  const err = d.inside(inside)
  if (err) return d.error(err)

  let [guildId, filter] = inside.splits; let id
  const guild = guildId === "global" ? undefined : await d.util.getGuild(d, guildId)
  if (!guild && !["global"].includes(guildId)) return d.aoiError.fnError(d, "guild", {inside})

	if (guildId === 'global') {
    const all = await d.client.application.commands.fetch()
    id = all.find(x=>x.name===filter.toLowerCase()||x.id===filter)?.id
  } else {
    const all = await guild.commands.fetch()
    id = all.find(x => x.name === filter.toLowerCase()||x.id===filter)?.id
  }
  d.client.application.commands.delete(id, guildId === 'global' ? undefined : guildId).catch(e => {
    d.aoiError.fnError(d, "custom", {}, "Failed To Delete Application Command With Reason: " + e)
  })

  return {
    code: d.util.setCode({function: d.func, code, inside})
  }
} 