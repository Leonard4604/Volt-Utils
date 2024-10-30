const { Client, Intents, Collection, MessageEmbed  } = require('discord.js');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const prefix = '.'

const fs = require('fs');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Volt Utils is online!')

    client.user.setActivity('Volt Users Nationalities', { type: 'WATCHING' });
})


client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'roles') {
        client.commands.get('roles').execute(message, args, client, MessageEmbed);
    }
})

// Handle reactions
const channel = '...'

const italyEmoji = '🇮🇹';
const europeEmoji = '🇪🇺';

// Reaction added
client.on('messageReactionAdd', async (reaction, user) => {
  const italy = reaction.message.guild.roles.cache.find(role => role.name === "Italy");
  const europe = reaction.message.guild.roles.cache.find(role => role.name === "Europe");
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  if (reaction.message.channel.id == channel) {
      if (reaction.emoji.name === italyEmoji) {
          await reaction.message.guild.members.cache.get(user.id).roles.add(italy);
      }
      if (reaction.emoji.name === europeEmoji) {
          await reaction.message.guild.members.cache.get(user.id).roles.add(europe);
      }
  }
  else {
      return;
  }
});

// Reaction removed
client.on('messageReactionRemove', async (reaction, user) => {
    const italy = reaction.message.guild.roles.cache.find(role => role.name === "Italy");
    const europe = reaction.message.guild.roles.cache.find(role => role.name === "Europe");
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    
    if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === italyEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(italy);
        }
        if (reaction.emoji.name === europeEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(europe);
        }
    }
    else {
        return;
    }
});




client.login('...');