const { EmbedBuilder } = require("discord.js");
const CommandUsage = require("../../../mongo/models/usageSchema");
const UsageType = require("../../../mongo/models/usageTypeSchema");

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

  let usageTypeData = await UsageType.findOne({});
  if (!usageTypeData) {
    usageTypeData = new UsageType({
      guildCount: 0,
      userContextCount: 0,
    });
  }

  if (interaction.guild) {
    usageTypeData.guildCount += 1;
  } else {
    usageTypeData.userContextCount += 1;
  }
  await usageTypeData.save();

  const allUsages = await CommandUsage.find({});
  const totalUsage = allUsages.reduce((acc, cmd) => acc + cmd.count, 0);

  const logChannel = client.channels.cache.get("1256810888694861914");

  if (logChannel) {
    let location;
    if (interaction.guild) {
      location = `${interaction.guild.name} (${interaction.guild.id})`;
    } else {
      location = "User Install Context (External Server)";
    }

    const logEmbed = new EmbedBuilder()
      .setTitle("Command Used")
      .setDescription(
        `**Command:** /${interaction.commandName}\n**Command Count:** ${usageData.count}\n\n**Location:** ${location}\n**User:** <@${interaction.user.id}> (${interaction.user.id})\n**Time:** ${estDate} (EST)\n\n**Guild Usage:** ${usageTypeData.guildCount}\n**User Install Usage:** ${usageTypeData.userContextCount}\n**Total Usage:** ${totalUsage}`
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
