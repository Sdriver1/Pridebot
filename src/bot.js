const fs = require("fs");
const path = require("path");
const { Events } = require("discord.js");

const initializeApi = require("./apis/botapi");
const initializeAvatarApi = require("./apis/avatarapi");
const initializeGoogleApi = require("./apis/googleapi");
const { getInfo } = require("discord-hybrid-sharding");

const { idCommand } = require("./commands/Dev/id.js");
const { blacklistCommand } = require("./commands/Dev/blacklist.js");
const { termCommand } = require("./commands/Dev/termlist.js");
const { darCommand } = require("./commands/Dev/darID.js");
const { topServerCommand } = require("./commands/Dev/topserver.js");
const { react } = require("./config/commandfunctions/trashreact.js");

const eventHandlers = {
  updateChannelName: require("./events/client/statsTracker.js"),
  handleGuildCreate: require("./events/client/guildCreate.js"),
  handleGuildDelete: require("./events/client/guildDelete.js"),
  sendRestartMessage: require("./events/client/restart.js"),
};

const userprofile = require("./commands/Profile/userprofile.js");
const usergaydar = require("./commands/Fun/usergaydar.js");
const usertransdar = require("./commands/Fun/usertransdar.js");
const userqueerdar = require("./commands/Fun/userqueerdar.js");
const useravatar = require("./commands/Avatar/useravatar-view.js");

const errorlogging = require("./config/logging/errorlogs");

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

  setInterval(() => eventHandlers.updateChannelName(client), 1 * 60 * 1000);

  client.once("ready", () => {
    const clusterId = getInfo().CLUSTER;
    console.log(`Cluster ${clusterId} is ready.`);

    if (clusterId === 0) {
      try {
        initializeAvatarApi(client);
        initializeApi(client);
        initializeGoogleApi(client);
      } catch (error) {
        console.error("Error during API initialization:", error);
      }
    } else {
      console.log(`Cluster ${clusterId} skipped API initialization.`);
    }
  
    eventHandlers.sendRestartMessage(client);
    eventHandlers.updateChannelName(client);
  });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isAutocomplete()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.autocomplete(interaction);
      } catch (error) {
        await errorlogging(client, error);
      }
    }

    if (interaction.isUserContextMenuCommand()) {
      try {
        if (interaction.commandName === "User Profile") {
          await userprofile.execute(interaction, client);
        } else if (interaction.commandName === "User Gaydar") {
          await usergaydar.execute(interaction, client);
        } else if (interaction.commandName === "User Transdar") {
          await usertransdar.execute(interaction, client);
        } else if (interaction.commandName === "User Queerdar") {
          await userqueerdar.execute(interaction, client);
        } else if (interaction.commandName === "User Avatar-view") {
          await useravatar.execute(interaction, client);
        }
      } catch (error) {
        await errorlogging(client, error);
      }
    }
  });

  client.on("messageCreate", async (message) => {
    try {
      idCommand(message, client);
      blacklistCommand(message, client);
      termCommand(message, client);
      darCommand(message, client);
      topServerCommand(message, client);
    } catch (error) {
      await errorlogging(client, error);
    }
  });

  client.on("messageReactionAdd", async (reaction, user) => {
    try {
      await react(reaction, user, client);
    } catch (error) {
      await errorlogging(client, error);
    }
  });

  client.on("error", async (error) => {
    console.error("Client error:", error);
    await errorlogging(client, error);
  });

  const commandsPath = "./src/commands";
  const clientId = "1101256478632972369";
  client.handleCommands(commandsPath, clientId);
  client.handleEvents();
};
