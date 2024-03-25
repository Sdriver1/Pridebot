const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const CommandUsage = require("../../../mongo/models/usageSchema");
const { devUsers } = require("../../ids/devId");
const { supportUsers } = require("../../ids/supportId");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("usage")
    .setDescription("See how many times commands are used")
    .addBooleanOption((option) =>
      option
        .setName("public")
        .setDescription("Set to true to make the response visible to everyone")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    if (
      !devUsers.has(interaction.user.id) &&
      !supportUsers.has(interaction.user.id)
    ) {
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

    const isPublic = interaction.options.getBoolean("public", false);
    await interaction.reply({ embeds: [usageEmbed], ephemeral: !isPublic });
  },
};
