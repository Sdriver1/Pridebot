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
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason provided";
    const member = await interaction.guild.members.fetch(user.id).catch(console.error);

    await user.send({
      embeds: [
        {
          title: `You have been banned from ${interaction.guild.name}`,
          description: `**Reason**: ${reason}`,
          color: "#f50000",
        },
      ],
    }).catch(() => console.log("User's DM's are turned off"));

    await member.ban({ days: 7, reason: reason }).catch(console.error);

    await interaction.reply({
      embeds: [
        {
          title: `${user.tag} has been banned`,
          description: `**Reason**: ${reason}`,
          color: "#29f500",
        },
      ],
    });
  },
};