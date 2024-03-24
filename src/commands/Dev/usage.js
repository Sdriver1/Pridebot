const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const CommandUsage = require("../../../mongo/models/usageSchema");
const { devUsers, supportUsers } = require("../../ids/profileids");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("usage")
    .setDescription("See how many times commands are used"),

  async execute(interaction, client) {
    if (!devUsers.has(interaction.user.id) && !supportUsers.has(interaction.user.id)) {
      await interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
      return;
    }

    const usages = await CommandUsage.find({}).sort({ count: -1 });
    const totalUsage = usages.reduce((acc, cmd) => acc + cmd.count, 0);
    const usageEmbed = new EmbedBuilder()
      .setColor("#FF00EA")
      .setTitle("Command Usage")
      .setDescription(`Total Commands Used: ${totalUsage}`)
      .setTimestamp();

    usages.slice(0, 10).forEach((cmd, index) => {
      const percentage = ((cmd.count / totalUsage) * 100).toFixed(2);
      usageEmbed.addFields({
        name: `${index + 1}. ${cmd.commandName}`,
        value: `Used: ${cmd.count} times (${percentage}%)`,
        inline: true,
      });
    });

    await interaction.reply({ embeds: [usageEmbed] });
  },
};
