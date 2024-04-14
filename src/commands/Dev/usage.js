const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const CommandUsage = require("../../../mongo/models/usageSchema");
const { devUsers } = require("../../config/ids/devId");
const { supportUsers } = require("../../config/ids/supportId");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("usage")
    .setDescription("See how many times commands are used")
    .addBooleanOption((option) =>
      option
        .setName("public")
        .setDescription("Set to true to make the response visible to everyone")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("amount")
        .setDescription("Select how many commands you want to see (1-25)")
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

    let amount = interaction.options.getString("amount");
    amount = amount ? Math.min(Math.max(parseInt(amount, 10), 1), 25) : 24;

    const allUsages = await CommandUsage.find({}).sort({ count: -1 });
    const totalUsage = allUsages.reduce((acc, cmd) => acc + cmd.count, 0);

    const topUsages = allUsages.slice(0, amount);
    const otherUsages = allUsages.slice(amount);

    const topUsageCount = topUsages.reduce((acc, cmd) => acc + cmd.count, 0);
    const otherCommandsCount = totalUsage - topUsageCount;
    const otherPercentage = ((otherCommandsCount / totalUsage) * 100).toFixed(
      2
    );

    const usageEmbed = new EmbedBuilder()
      .setColor("#FF00EA")
      .setTitle("Command Usage")
      .setDescription(
        `Total Commands Used: **${totalUsage}** \nViewing **${topUsages.length}** commands \nTracking since <t:1711310418:f> (<t:1711310418:R>) `
      )
      .setTimestamp();

    topUsages.forEach((cmd, index) => {
      const percentage = ((cmd.count / totalUsage) * 100).toFixed(2);
      usageEmbed.addFields({
        name: `${index + 1}. ${cmd.commandName}`,
        value: `Used: ${cmd.count} times (${percentage}%)`,
        inline: true,
      });
    });

    if (otherCommandsCount > 0) {
      let otherCommandsDetail = otherUsages
        .map(
          (cmd) =>
            `${cmd.commandName}: ${cmd.count} times (${(
              (cmd.count / totalUsage) *
              100
            ).toFixed(2)}%)`
        )
        .join("\n");
      usageEmbed.addFields({
        name: `Other commands`,
        value: otherCommandsDetail,
        inline: false,
      });
    }

    const isPublic = interaction.options.getBoolean("public") || false;
    await interaction.reply({ embeds: [usageEmbed], ephemeral: !isPublic });
  },
};