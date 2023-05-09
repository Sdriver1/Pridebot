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
        .setDescription("How long to ban the user (m,h,d,w,y)")
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName("preserve-messages")
        .setDescription("Preserve user's messages")
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const durationString = interaction.options.getString("duration") || "∞";
    const duration = parseDuration(durationString);
    const preserveMessages =
      interaction.options.getBoolean("preserve-messages") || false;
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!member) {
      return interaction.reply({
        embeds: [
          {
            title: "User not found or not in this server",
            color: parseInt("0xff0000", 16),
          },
        ],
      });
    }

    if (member.bannable) {
      const timestamp = `<t:${Math.floor(Date.now() / 1000)}:F>`;
      const banOptions = { reason: reason };
      if (duration !== undefined) {
        banOptions.days = 0;
        banOptions.reason += ` (temporarily banned for ${durationString})`;
      }

      if (!preserveMessages) {
        const messages = await interaction.channel.messages.fetch({
          limit: 100,
        });
        const userMessages = messages.filter(
          (msg) => msg.author.id === user.id
        );
        interaction.channel.bulkDelete(userMessages, true).catch(console.error);
      }

      await member.ban(banOptions).catch(console.error);
      const banner = interaction.member;
      const bannerTag = `${banner.user.username}#${banner.user.discriminator}`;
      const bannedTimestamp = `<t:${Math.floor(member.banDate / 1000)}:F>`;

      await user
        .send({
          embeds: [
            {
              title: `You have been banned from ${interaction.guild.name}`,
              description: `**Reason**: ${reason}\n**Duration**: ${durationString}\n**Banned At**: ${timestamp}`,
              color: parseInt("0xFF0000", 16),
            },
          ],
        })
        .catch(() => console.log("User's DM's are turned off"));

      await interaction.reply({
        embeds: [
          {
            title: `${user.tag} has been banned`,
            description: `**Reason**: ${reason}\n**Duration**: ${durationString}\n**Banned At**: ${bannedTimestamp}\n**Banned By**: ${bannerTag}`,
            color: parseInt("0x29F500", 16),
          },
        ],
      });
    } else {
      await interaction.reply({
        embeds: [
          {
            title: `${user.tag} is already banned`,
            description: `**Reason**: ${reason}\n**Duration**: ${durationString}\n**Banned**: <t:${Math.floor(
              member.banDate / 1000
            )}:F>`,
            color: parseInt("0xf5d400", 16),
          },
        ],
      });
    }
  },
};

function parseDuration(durationString) {
  const regex = /^(\d+)([mhdwy])$/i;
  const matches = regex.exec(durationString);

  if (matches === null) {
    return undefined;
  }

  const value = parseInt(matches[1]);
  const unit = matches[2].toLowerCase();

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const year = 365 * day;

  switch (unit) {
    case " mins":
      return value * minute;
    case " hours":
      return value * hour;
    case " days":
      return value * day;
    case " weeks":
      return value * week;
    case " years":
      return value * year;
    default:
      return undefined;
  }
}
