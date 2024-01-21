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

    const pcav =
      "https://cdn.discordapp.com/attachments/1176249436125528116/1198656891421724712/66ad976abd20711ece1cab44709cdeca.png?ex=65bfb338&is=65ad3e38&hm=b32b9fa0084862089bdb604424d77143f5045b00023ade65e3d5ea6a5a15667d&";

    const pridecordembed = new EmbedBuilder()
      .setTitle("Pridebot Partner: Pridecord")
      .setColor(0xff00ae)
      .setThumbnail(pcav)
      .addFields(
        {
          name: "Info",
          value: `**Server Owner**: <@288897433805651968> \n**Server Invite**: https://discord.gg/lgbtqia`,
          inline: false,
        },
        {
          name: "Pridecord",
          value: `*text about pridecord`,
          inline: false,
        }
      )
      .setFooter({ text: "Pridecord", iconURL: pcav })
      .setTimestamp();

    await interaction.reply({ embeds: [pridecordembed] });
  },
};
