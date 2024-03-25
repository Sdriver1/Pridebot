require("dotenv").config();
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("partner")
    .setDescription("Check out Pridebot partners"),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/partners \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    const pcav = "https://cdn.discordapp.com/emojis/1219506730451603547.png";
    const snav = "https://cdn.discordapp.com/emojis/1193823319246524486.png";

    const pridecordembed = new EmbedBuilder()
      .setTitle("Pridebot Partner: Pridecord")
      .setColor(0xff00ae)
      .setThumbnail(pcav)
      .addFields({
        name: "Info",
        value: `**Server Owner**: <@288897433805651968> \n**Server Invite**: https://discord.gg/lgbtqia \n\n[**More Info**](https://pridebot.xyz/partners#pridecord)`,
        inline: false,
      })
      .setFooter({ text: "Pridecord", iconURL: pcav })
      .setTimestamp();

    const sneakyembed = new EmbedBuilder()
      .setTitle("Pridebot Partner: Sneaky Nodes")
      .setColor(0xff00ae)
      .setThumbnail(snav)
      .addFields({
        name: "Info",
        value: `**Server Owner**: <@883592856906919986> \n**Server Invite**: https://discord.gg/csp9WEWc3t \n\n[**More Info**](https://pridebot.xyz/partners#sneakynode)`,
        inline: false,
      })
      .setFooter({ text: "Sneaky Nodes", iconURL: snav })
      .setTimestamp();

    await interaction.reply({ embeds: [pridecordembed, sneakyembed] });
  },
};
