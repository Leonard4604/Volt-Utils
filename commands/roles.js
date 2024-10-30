module.exports = {
    name: 'roles',
    description: "Volt Utilities - reaction roles",
    async execute(message, args, client, MessageEmbed) {
        if(message.member.roles.cache.some(r => (r.name === 'Helper') || (r.name === 'Admin'))) {
            const channel = '...'
            const italy = message.guild.roles.cache.find(role => role.name === "Italy");
            const europe = message.guild.roles.cache.find(role => role.name === "Europe");

            const italyEmoji = '🇮🇹';
            const europeEmoji = '🇪🇺';

            let customEmbed = new MessageEmbed()
                .setColor('#f8ff58')
                .setTitle('Choose your region!')
                .setDescription('Choosing a region will allow you to get pinged the right way!\n\n'
                    + `${italyEmoji} for italian users\n`
                    + `${europeEmoji} for european users`)

            let messageEmbed = await message.channel.send({ embeds: [customEmbed] });
            messageEmbed.react(italyEmoji);
            messageEmbed.react(europeEmoji);
        }
        else {
            message.channel.send(`You don't have the permission to do this!`)
        }
    }
}