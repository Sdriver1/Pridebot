const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for ban")
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("How long to ban the user (s,m,h,d,w,y)")
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName("preserve-messages")
        .setDescription("Preserve user's messages")
        .setRequired(false)
    ),
  async execute(interaction) {
    const user = interaction.options.getMember("user");

    if (!user) {
      return interaction.reply({
        embeds: [
          {
            title: "User not found or not in this server",
            color: 0xff0000,
          },
        ],
      });
    }

    const reason = interaction.options.getString("reason") || "No reason provided";
    const durationString = interaction.options.getString("duration") || "∞";
    const duration = parseDuration(durationString);
    const preserveMessages = interaction.options.getBoolean("preserve-messages") || false;

    const member = await interaction.guild.members.fetch({ user }).catch(console.error);
    const banOptions = { reason: reason };
    const timestamp = `<t:${Math.floor(Date.now() / 1000)}:F>`;
    const dmChannel = await user.createDM().catch(console.error);

    if (!member) {
      return interaction.reply({
        embeds: [
          {
            title: "User not found or not in this server",
            color: 0xff0000,
          },
        ],
      });
    }

    if (!member.bannable) {
      return interaction.reply({
        embeds: [
          {
            title: `${user.user.tag} is already banned`,
            description: `**Reason**: ${reason}\n**Duration**: ${durationString}\n**Banned at **: ${timestamp}`,
            color: 0xf5d400,
          },
        ],
        ephemeral: true,
      });
    }

    if (duration !== undefined) {
      banOptions.days = Math.ceil(duration / (24 * 60 * 60));

      // Schedule the unbanning of the user
      setTimeout(async () => {
        // Check if user is still banned
        const ban = await interaction.guild.bans.fetch({ user }).catch(console.error);
        if (ban) {
          await interaction.guild.members.unban(user).catch(console.error);
          await interaction.channel.send({
            embeds: [
              {
                title: `${user.user.tag} has been unbanned`,
                description: `**Reason**: Time has been served\n**Time Served**: ${durationString}\n**Originally Banned**: ${timestamp}`,
                color: 0x00FF00,
              },
            ],
          });

          // DM the user with an invite to the server
          const invite = await interaction.channel.createInvite({
            maxAge: 0,
            maxUses: 0,
            unique: true,
            reason: "User unbanned",
          });

          await dmChannel.send({
            embeds: [
              {
                title: `You have been unbanned from **${interaction.guild.name}** `,
                description: `**Reason**: Time has been served\n**Time Served**: ${durationString}\nHere is an invite to the server:\n${invite.url}`,
                color: 0x00FF00,
              },
            ],
          });
        }
      }, duration * 1000);
    }

    if (!preserveMessages) {
      const messages = await interaction.channel.messages.fetch({ limit: 100 });
      const userMessages = messages.filter((msg) => msg.author.id === user.id);
      interaction.channel.bulkDelete(userMessages, true).catch(console.error);
    }

    if (!dmChannel) {
      console.log("User has DMs turned off");
      return;
    }

    try {
      await dmChannel.send({
        embeds: [
          {
            title: `You have been banned from ${interaction.guild.name}`,
            description: `**Reason**: ${reason}\n**Duration**: ${durationString}\n**Banned At**: ${timestamp}`,
            color: 0xFF0000,
          },
        ],
      });
    } catch (error) {
      console.log("Failed to send DM:", error);
    }

    await interaction.guild.members.ban(user, banOptions).catch(console.error);
    const bannerTag = `${interaction.member.user.username}#${interaction.member.user.discriminator}`;

    await interaction.reply({
      embeds: [
        {
          title: `${user.user.tag} has been banned`,
          description: `**Reason**: ${reason}\n**Duration**: ${durationString}\n**Banned At**: ${timestamp}\n**Banned By**: ${bannerTag}`,
          color: 0x29F500,
        },
      ],
    });
  },
};

function parseDuration(durationString) {
  const regex = /^(\d+)([smhdwy])$/i;
  const matches = regex.exec(durationString);

  if (matches === null) {
    return undefined;
  }

  const value = parseInt(matches[1]);
  const unit = matches[2].toLowerCase();

  const second = 1;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const year = 365 * day;

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * minute;
    case "h":
      return value * hour;
    case "d":
      return value * day;
    case "w":
      return value * week;
    case "y":
      return value * year;
    default:
      return undefined;
  }
}
