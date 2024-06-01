const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const chalk = require("chalk");
const {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
} = require("discord.js");
const path = require('path');

module.exports = (client) => {
  client.handleCommands = async (commandsPath, clientId) => {
    const loadCommands = (dir) => {
      const commandFiles = fs
        .readdirSync(dir)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(path.join(__dirname, '../../../', dir, file));
        if (!command.data) {
          console.log(
            chalk.red.bold(`Command: ${file} does not export a 'data' property`)
          );
          continue;
        }
        if (
          command.data instanceof SlashCommandBuilder ||
          command.data instanceof ContextMenuCommandBuilder
        ) {
          client.commands.set(command.data.name, command);
          client.commandArray.push(command.data.toJSON());
          console.log(
            chalk.green.bold.underline(
              `Command: ${command.data.name} is ready to deploy ✅`
            )
          );
        } else {
          console.log(
            chalk.red.bold(`Command: ${file} does not have a valid 'data' type`)
          );
        }
      }
    };

    fs.readdirSync(commandsPath).forEach((folder) => {
      loadCommands(`${commandsPath}/${folder}`);
    });

    const rest = new REST({ version: "10" }).setToken(process.env.token);
    try {
      console.log(
        chalk.yellow.underline("Started refreshing application commands.")
      );
      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });
      console.log(
        chalk.green.underline("Successfully reloaded application commands.")
      );
    } catch (error) {
      console.error(error);
    }
  };
};
