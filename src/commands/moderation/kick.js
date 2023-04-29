const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user")
    .addUserOption((option) =>
      option.setName("User").setDescription("User to kick").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("reason for kick")
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("User");
    const reason = interaction.options.getString('reason');
    const member = await interaction.guild.member
      .fetch(user.id)
      .catch(console.error());

    if (!reason) reason = "No reason provided";

    await user.send({
        embeds: [
        setTitle("You have been kicked from ${interaction.guild.name}")
        .setDescription("**Reason**: ${reason}")
        .setColor("#f5d400")
    ]
    }).catch(console.log('User\'s DM\'s are turned off'))

    await member.kick(reason).catch(console.error);

    await interaction.reply({
        embeds: [
          setTitle("${user.tag} has been kicked")
            .setDescription("**Reason**: ${reason}")
            .setColor("#29f500"),
        ],
      });
  },
};
