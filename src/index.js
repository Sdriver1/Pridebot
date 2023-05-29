require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect } = require("mongoose");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
} = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});
client.commands = new Collection();
client.commandArray = [];
client.botStartTime = new Date();

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFolders = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFolders)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token);
(async () => {
  await connect(databaseToken).catch(console.error);
})();

client.on(Events.GuildCreate, async (guild) => {
  const channel = await client.channels.cache.get("1112590962867310602");
  const name = guild.name;
  const serverID = guild.id;
  const memberCount = guild.memberCount;
  const ownerID = guild.ownerId;
  const owner = await client.users.cache.get(ownerID);
  const ownerName = owner.username;
  const serverBoost = guild.premiumSubscriptionCount;

  const currentGuildCount = client.guilds.cache.size;

  const embed = new EmbedBuilder()
    .setColor(0xff00ae)
    .setTitle(`👋 New Server Joined`)
    .setFields({
      name: "<:_:1112602480128299079> Server Info",
      value: `**Server Name:** ${name} (${serverID})\n**Server Owner:** <@${ownerID}> (${ownerName} / ${ownerID}) \n**Member Count:** ${memberCount} \n**Boosts:** ${serverBoost}/14 \n**Server Creation:** <t:${parseInt(guild.createdTimestamp / 1000)}:F> (<t:${parseInt(guild.createdTimestamp / 1000)}:R>)`,
    },
    {
      name: "<:_:1112602480128299079> Bot Info",
      value: `**Total # of guild:** ${currentGuildCount}`,
    })
    .setTimestamp()
    .setFooter({ text: `${serverID}` });

  await channel.send({ embeds: [embed] });
});

client.on(Events.GuildDelete, async (guild) => {
  const channel = await client.channels.cache.get("1112590962867310602");
  const name = guild.name;
  const serverID = guild.id;
  const memberCount = guild.memberCount;
  const ownerID = guild.ownerId;
  const owner = await client.users.cache.get(ownerID);
  const ownerName = owner.username;
  const serverBoost = guild.premiumSubscriptionCount;

  const currentGuildCount = client.guilds.cache.size;

  const embed = new EmbedBuilder()
    .setColor(0xff00ae)
    .setTitle(`❌ Left Server`)
    .setFields({
      name: "<:_:1112602480128299079> Server Info",
      value: `**Server Name:** ${name} (${serverID})\n**Server Owner:** <@${ownerID}> (${ownerName} / ${ownerID}) \n**Member Count:** ${memberCount} \n**Boosts:** ${serverBoost}/14 \n**Server Creation:** <t:${parseInt(
        guild.createdTimestamp / 1000
      )}:R> \n**Joined:** <t:${parseInt(guild.joinedTimestamp / 1000)}:F> (<t:${parseInt(guild.joinedTimestamp / 1000)}:R>)`, 
    },
    {
      name: "<:_:1112602480128299079> Bot Info",
      value: `**Total # of guild:** ${currentGuildCount}`,
    })
    .setTimestamp()
    .setFooter({ text: `${serverID}` });

  await channel.send({ embeds: [embed] });
});
