require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect } = require("mongoose");
const { Client, Collection, GatewayIntentBits, Events } = require("discord.js");
const fs = require("fs");

const botStartTime = Math.floor(Date.now() / 1000);

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
client.botStartTime = botStartTime;

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFolders = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFolders)
    require(`./functions/${folder}/${file}`)(client);
}

const updateChannelName = require("./events/client/statsTracker");
const handleGuildCreate = require("./events/client/guildCreate");
const handleGuildDelete = require("./events/client/guildDelete");
const handleReportFeedback = require("./events/client/reportFeedback");

client.on(Events.GuildCreate, (guild) => handleGuildCreate(client, guild));
client.on(Events.GuildDelete, (guild) => handleGuildDelete(client, guild));
client.on("interactionCreate", (interaction) => {
  handleReportFeedback(client, interaction);
});

// Update channel name periodically
setInterval(() => updateChannelName(client), 5 * 60 * 1000);
client.once("ready", () => {
  updateChannelName(client); // This ensures the client is ready before calling
});

client.handleEvents();
client.handleCommands();
client.login(token);
(async () => {
  await connect(databaseToken).catch(console.error);
})();
