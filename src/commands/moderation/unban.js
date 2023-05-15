const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unbans a user from the server.")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("The user to unban.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for the unban.")
    ),

  async execute(interaction) {
    const userId = interaction.options.getString("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided.";

    try {
      const bannedUsers = await interaction.guild.bans.fetch();
      const bannedUser = bannedUsers.find(
        (u) => u.user.tag === userId || u.user.id === userId
      );
      if (!bannedUser) {
        return interaction.reply({
          embeds: [
            {
              title: `This user is not banned`,
              color: parseInt("0xFFFF00", 16),
            },
          ],
          ephemeral: true,
        });
      }
      const user = await interaction.client.users.fetch(bannedUser.user.id);
      await interaction.guild.members.unban(bannedUser.user, reason);
      const timestamp = new Date().toLocaleString();
      const unbannerTag = interaction.user.tag;
      interaction.reply({
        embeds: [
          {
            title: `${user.tag} has been unbanned`,
            description: `**Reason**: ${reason}\n**Unbanned At**: ${timestamp}\n**Unbanned By**: ${unbannerTag}`,
            color: parseInt("0x29F500", 16),
          },
        ],
      });

      
      const invite = await interaction.channel.createInvite({
        maxAge: 0,
        maxUses: 0,
        unique: true,
        reason: "User unbanned",
      });
      
      const dmChannel = await user.createDM();
      const durationString = "Permanent";
      await dmChannel.send({
        embeds: [
          {
            title: `You have been unbanned from **${interaction.guild.name}** `,
            description: `**Reason**: ${reason}\n**Time Served**: ${durationString}\nHere is an invite to the server:\n${invite.url}`,
            color: parseInt("00FF00", 16),
          },
        ],
      });

    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "An error occurred while trying to unban the user.",
        ephemeral: true,
      });
    }
  },
};
