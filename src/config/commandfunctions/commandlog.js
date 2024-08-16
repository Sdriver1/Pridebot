const { EmbedBuilder } = require("discord.js");
const CommandUsage = require("../../../mongo/models/usageSchema");

const commandLogging = async (client, interaction) => {
  const estDate = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

  let usageData = await CommandUsage.findOne({
    commandName: interaction.commandName,
  });
  if (!usageData) {
    usageData = new CommandUsage({
      commandName: interaction.commandName,
      count: 0,
    });
  }
  usageData.count += 0;
  await usageData.save();

  const allUsages = await CommandUsage.find({}).sort({ count: -1 });
  const totalUsage = allUsages.reduce((acc, cmd) => acc + cmd.count, 0);

  const logChannel = client.channels.cache.get("1256810888694861914");

  if (logChannel) {
    const location = interaction.guild
      ? `${interaction.guild.name} (${interaction.guild.id})`
      : "DM";

    const logEmbed = new EmbedBuilder()
      .setTitle("Command Used")
      .setDescription(
        `**Command:** /${interaction.commandName}\n**Location:** ${location}\n**User:** <@${interaction.user.id}> (${interaction.user.id})\n**Time:** ${estDate} (EST)\n**Command Count:** ${usageData.count}\n **Total Usage:** ${totalUsage}`
      )
      .setColor(0xff00ea)
      .setFooter({ text: `${interaction.user.id}` })
      .setTimestamp();

    await logChannel.send({ embeds: [logEmbed] });
  } else {
    console.error("Log channel not found!");
  }
};

module.exports = commandLogging;
