const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ban a user")
    .addUserOption((option) =>
      option.setName("User").setDescription("User to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for ban")
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("User");
    const reason = interaction.options.getString("reason");
    const member = await interaction.guild.member
      .fetch(user.id)
      .catch(console.error());

    if (!reason) reason = "No reason provided";

    await user
      .send({
        embeds: [
          setTitle("You have been banned from ${interaction.guild.name}")
            .setDescription("**Reason**: ${reason}")
            .setColor("#f50000"),
        ],
      })
      .catch(console.log("User's DM's are turned off"));

    await member
      .ban({
        days: 7,
        reason: reason,
      })
      .catch(console.error);

    await interaction.reply({
      embeds: [
        setTitle("${user.tag} has been banned")
          .setDescription("**Reason**: ${reason}")
          .setColor("#29f500"),
      ],
    });
  },
};
