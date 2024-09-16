require("dotenv").config();
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const commandLogging = require("../../config/logging/commandlog");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("partner")
    .setDescription("Check out Pridebot partners"),

  async execute(interaction, client) {
    const pcav = "https://pridebot.xyz/pridecord.png";
    const prav = "https://pridebot.xyz/prismatic.png";

    const pridecordembed = new EmbedBuilder()
      .setTitle("Pridebot Partner: Pridecord")
      .setColor(0xff00ae)
      .setThumbnail(pcav)
      .addFields({
        name: "Info",
        value: `**Server Owner**: <@288897433805651968> \n**Server Invite**: https://discord.gg/lgbtqia \n\n[**More Info**](https://pridebot.xyz/partners)`,
        inline: false,
      })
      .setFooter({ text: "Pridecord", iconURL: pcav })
      .setTimestamp();

    const prismaticembed = new EmbedBuilder()
      .setTitle("Pridebot Partner: Prismatic")
      .setColor(0xff00ae)
      .setThumbnail(prav)
      .addFields({
        name: "Info",
        value: `**Server Owner**: <@197794050823290880> \n**Server Invite**: https://discord.gg/friendships \n\n[**More Info**](https://pridebot.xyz/partners)`,
        inline: false,
      })
      .setFooter({ text: "Prismatic", iconURL: prav })
      .setTimestamp();

    await interaction.reply({ embeds: [pridecordembed, prismaticembed] });
    await commandLogging(client, interaction);
  },
};
