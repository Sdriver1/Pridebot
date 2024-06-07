const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
} = require("discord.js");
const Blacklist = require("../../../mongo/models/blacklistSchema.js");
const IDLists = require("../../../mongo/models/idSchema.js");

module.exports = (client) => {
  client.handleCommands = async (commandsPath, clientId) => {
    const loadCommands = (dir) => {
      const commandFiles = fs
        .readdirSync(dir)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(path.join(__dirname, "../../../", dir, file));
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

    const isBlacklisted = async (userId, guildId) => {
      try {
        const idLists = await IDLists.findOne();
        if (idLists) {
          if (idLists.devs.includes(userId) || idLists.vips.includes(userId)) {
            return { blacklisted: false };
          }
        }

        const blacklist = await Blacklist.findOne();
        if (!blacklist) return { blacklisted: false };

        if (blacklist.blacklistUserIDs.includes(userId)) {
          return { blacklisted: true, type: "user" };
        }
        if (blacklist.blacklistGuildIDs.includes(guildId)) {
          return { blacklisted: true, type: "guild" };
        }
        return { blacklisted: false };
      } catch (err) {
        console.error("Error checking blacklist:", err);
        return { blacklisted: false };
      }
    };

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      const { blacklisted, type } = await isBlacklisted(
        interaction.user.id,
        interaction.guild.id
      );
      if (blacklisted) {
        if (type === "user") {
          await interaction.reply({
            content:
              "You are blacklisted from using the bot. If you feel like this is a mistake, please contact [**Sdriver1**](<https://discord.com/users/691506668781174824>)",
            ephemeral: true,
          });
        } else if (type === "guild") {
          await interaction.reply({
            content:
              "This guild is blacklisted from using the bot. If you feel like this is a mistake, please contact [**Sdriver1**](<https://discord.com/users/691506668781174824>)",
            ephemeral: true,
          });
        }
        return;
      }

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    });

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
