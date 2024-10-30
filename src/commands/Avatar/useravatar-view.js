const {
  EmbedBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");
const fs = require("fs");
const path = require("path");
const commandLogging = require("../../config/logging/commandlog");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("User Avatar-view")
    .setType(ApplicationCommandType.User),

  async execute(interaction) {
    const pfpuser = interaction.options.getUser("user") || interaction.user;
    const username = pfpuser.username;
    const userDirectory = path.join(__dirname, "../../pfps", pfpuser.id);

    if (!fs.existsSync(userDirectory)) {
      return interaction.reply({
        content: `${username} does not have any pride avatars saved.`,
        ephemeral: true,
      });
    }

    const files = fs
      .readdirSync(userDirectory)
      .filter((file) => file.endsWith(".png"));

    if (files.length === 0) {
      return interaction.reply({
        content: `${username} does not have any pride avatars saved.`,
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(`${username}'s Pride Avatars`)
      .setDescription(
        `To view all the avatars, go to here: https://pfp.pridebot.xyz/${pfpuser.id}`
      )
      .setColor("#FF00EA");

    files.forEach((file) => {
      const flagName = file.replace(".png", "");
      const imageURL = `https://pfp.pridebot.xyz/${pfpuser.id}/${file}`;
      embed.addFields({
        name: `Flag: ${flagName}`,
        value: `[Link to avatar](${imageURL})`,
        inline: true,
      });
    });

    await interaction.reply({ embeds: [embed], ephemeral: true });
    await commandLogging(interaction.client, interaction);
  },
};
