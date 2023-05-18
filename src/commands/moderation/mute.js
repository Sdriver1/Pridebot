const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute a user for a specified duration.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to be muted")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("The duration of the mute (s,m,h,d,w)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the mute")
        .setRequired(true)
    ),

  async execute(interaction) {
    const targetUser = interaction.options.getUser("user");
    const muteDuration = interaction.options.getString("duration") || "∞";
    const unmuteTimestamp = calculateUnmuteTime(muteDuration);
    const muteReason = interaction.options.getString("reason");

    const muteEmbed = {
      color: 0xff0000,
      title: `${targetUser.tag} has been muted`,
      fields: [
        {
          name: "**Reason:**",
          value: `\`${muteReason}\`` || "No reason specified",
          inline: true,
        },
        {
          name: "**Duration:**",
          value: `\`${muteDuration}\``,
          inline: true,
        },
        {
          name: "_ _",
          value: `_ _`,
          inline: true,
        },
        {
          name: "**Mute Time:**",
          value: new Date().toLocaleString(),
          inline: true,
        },
        {
          name: "**Unmute Time:**",
          value: new Date(unmuteTimestamp).toLocaleString(),
          inline: true,
        },
      ],
    };

    await interaction.reply({ embeds: [muteEmbed] });

    const muteDmEmbed = {
      color: 0xff0000,
      title: `You have been muted in ${interaction.guild.name}`,
      description: `**Reason:** ${muteReason}.\nYou will be unmuted in **${muteDuration}**.`,
      fields: [
        {
          name: "**You will unmuted At:**",
          value: new Date(unmuteTimestamp).toLocaleString() || `No auto unmute`,
          inline: true,
        },
      ],
    };

    targetUser.send({ embeds: [muteDmEmbed] }).catch(console.error);

    await new Promise((resolve) =>
      setTimeout(resolve, calculateDurationMilliseconds(muteDuration))
    );

    const unmuteEmbed = {
      color: 0x00ff00,
      title: `${targetUser.tag} has been unmuted`,
      fields: [
        {
          name: "**Reason:**",
          value: `\`${muteReason}\`` || "No reason specified",
          inline: true,
        },
        {
          name: "**Time Served:**",
          value: `\`${muteDuration}\``,
          inline: true,
        },
      ],
    };

    await interaction.followUp({ embeds: [unmuteEmbed] });

    const unmuteDmEmbed = {
      color: 0x00ff00,
      title: `You have been unmuted in ${interaction.guild.name}`,
      fields: [
        {
          name: "**Reason for mute:**",
          value: `\`${muteReason}\`` || "No reason specified",
          inline: true,
        },
        {
          name: "**Time Served:**",
          value: `\`${muteDuration}\``,
          inline: true,
        },
      ],
    };

    targetUser.send({ embeds: [unmuteDmEmbed] }).catch(console.error);
  },
};

// ... (the rest of the code remains the same)

function calculateUnmuteTime(duration) {
  const regex = /^(\d+)([smhdw])$/;

  const match = duration.match(regex);
  if (!match) throw new Error("Invalid duration format.");

  const amount = parseInt(match[1]);
  const unit = match[2];

  const now = new Date();
  let unmuteTime;

  switch (unit) {
    case "s":
      unmuteTime = new Date(now.getTime() + amount * 1000);
      break;
    case "m":
      unmuteTime = new Date(now.getTime() + amount * 60 * 1000);
      break;
    case "h":
      unmuteTime = new Date(now.getTime() + amount * 60 * 60 * 1000);
      break;
    case "d":
      unmuteTime = new Date(now.getTime() + amount * 24 * 60 * 60 * 1000);
      break;
    case "w":
      unmuteTime = new Date(now.getTime() + amount * 7 * 24 * 60 * 60 * 1000);
      break;
  }

  return unmuteTime;
}

function calculateDurationMilliseconds(duration) {
  const regex = /^(\d+)([smhdw])$/; // Matches durations in seconds (s), minutes (m), hours (h), days (d), and weeks (w)

  const match = duration.match(regex);
  if (!match) throw new Error("Invalid duration format.");

  const amount = parseInt(match[1]);
  const unit = match[2];

  let milliseconds;

  switch (unit) {
    case "s":
      milliseconds = amount * 1000;
      break;
    case "m":
      milliseconds = amount * 60 * 1000;
      break;
    case "h":
      milliseconds = amount * 60 * 60 * 1000;
      break;
    case "d":
      milliseconds = amount * 24 * 60 * 60 * 1000;
      break;
    case "w":
      milliseconds = amount * 7 * 24 * 60 * 60 * 1000;
      break;
  }

  return milliseconds;
}
