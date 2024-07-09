const fs = require("fs");
const { Events } = require("discord.js");

const { idCommand } = require("./commands/Dev/id.js");
const { blacklistCommand } = require("./commands/Dev/blacklist.js");
const { termCommand } = require("./commands/Dev/termlist.js");
const { react } = require("./config/commandfunctions/trashreact.js");

const eventHandlers = {
  updateChannelName: require("./events/client/statsTracker.js"),
  handleGuildCreate: require("./events/client/guildCreate.js"),
  handleGuildDelete: require("./events/client/guildDelete.js"),
  handleReportFeedback: require("./events/client/modals.js"),
};

const userprofile = require("./commands/Profile/userprofile.js");
const usergaydar = require("./commands/Fun/usergaydar.js");
const usertransdar = require("./commands/Fun/usertransdar.js");

module.exports = (client) => {
  const functionFolders = fs.readdirSync(`./src/functions`);
  for (const folder of functionFolders) {
    const functionFolders = fs
      .readdirSync(`./src/functions/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of functionFolders)
      require(`./functions/${folder}/${file}`)(client);
  }

  client.on(Events.GuildCreate, (guild) =>
    eventHandlers.handleGuildCreate(client, guild)
  );
  client.on(Events.GuildDelete, (guild) =>
    eventHandlers.handleGuildDelete(client, guild)
  );
  client.on("interactionCreate", (interaction) =>
    eventHandlers.handleReportFeedback(client, interaction)
  );

  setInterval(() => eventHandlers.updateChannelName(client), 1 * 60 * 1000);
  client.once("ready", () => {
    eventHandlers.updateChannelName(client);
  });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isUserContextMenuCommand()) {
      if (interaction.commandName === "User Profile") {
        await userprofile.execute(interaction);
      }
      if (interaction.commandName === "User Gaydar") {
        await usergaydar.execute(interaction);
      }
      if (interaction.commandName === "User Transdar") {
        await usertransdar.execute(interaction);
      }
    }
  });

  client.on("messageCreate", async (message) => {
    idCommand(message, client);
    blacklistCommand(message, client);
    termCommand(message, client);
  });

  client.on("messageReactionAdd", async (reaction, user) => {
    react(reaction, user, client);
  });

  const commandsPath = "./src/commands";
  const clientId = "1101256478632972369";
  client.handleCommands(commandsPath, clientId);
  client.handleEvents();
};
