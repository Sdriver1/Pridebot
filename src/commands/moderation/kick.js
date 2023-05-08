const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("User to kick").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason for kick")
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    let reason = interaction.options.getString("reason") || "No reason provided";
    const member = await interaction.guild.members.fetch(user.id).catch(console.error);

    await user.send({
      embeds: [
        {
          title: `You have been kicked from ${interaction.guild.name}`,
          description: `**Reason**: ${reason}`,
          color: "#f5d400",
        },
      ],
    }).catch(() => console.log("User's DM's are turned off"));

    await member.kick(reason).catch(console.error);

    await interaction.reply({
      embeds: [
        {
          title: `${user.tag} has been kicked`,
          description: `**Reason**: ${reason}`,
          color: "#29f500",
        },
      ],
    });
  },
};