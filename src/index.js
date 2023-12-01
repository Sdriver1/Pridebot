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

const eventHandlers = {
  updateChannelName: require("./events/client/statsTracker"),
  handleGuildCreate: require("./events/client/guildCreate"),
  handleGuildDelete: require("./events/client/guildDelete"),
  handleReportFeedback: require("./events/client/modals.js"),
  handleTopic: require("./events/client/topic"),
};

client.on(Events.GuildCreate, (guild) =>
  eventHandlers.handleGuildCreate(client, guild)
);
client.on(Events.GuildDelete, (guild) =>
  eventHandlers.handleGuildDelete(client, guild)
);
client.on("interactionCreate", (interaction) => {
  eventHandlers.handleReportFeedback(client, interaction);
});

client.on("messageCreate", (message) =>
  eventHandlers.handleTopic(client, message)
);

// Update channel name periodically
setInterval(() => eventHandlers.updateChannelName(client), 5 * 60 * 1000);
client.once("ready", () => {
  eventHandlers.updateChannelName(client);
});

client.handleEvents();
client.handleCommands();
client.login(token);

connect(databaseToken)
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);
