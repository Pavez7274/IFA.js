module.exports = async d => {
    const data = d.util.openFunc(d);

    const [guildId = d.guild?.id] = data.inside.splits;

    const guild = await d.util.getGuild(d, guildId);
    if (!guild) return d.aoiError.fnError(d, 'guild', {inside: data.inside});

    data.result = guild.splashURL({size: 4096, dynamic: true});

    return {
        code: d.util.setCode(data)
    }
}