const guild = require("../../schemas/guild");
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Information from database"),
  async execute(interaction, client) {
    let guildProfile = await guild.findOne({ guildID: interaction.guild.id });
    if (!guildProfile) {
      guildProfile = new guild({
        _id: new ObjectId(),
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcon: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : "No Guild Icon",
      });

      await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: `**Server Name**: \`${guildProfile.guildName}\``,
      });
      console.log(guildProfile);
    } else {
      await interaction.reply({
        content: `Server ID: ${guildProfile.guildId}`,
      });
      console.log(guildProfile);
    }
  },
};
