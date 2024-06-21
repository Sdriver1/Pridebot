require("dotenv").config();
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Support Pridebot by voting for us here"),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/vote \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    const voteembed = new EmbedBuilder()
      .setTitle("Thank you for voting!")
      .setColor(0xff00ae)
      .addFields(
        {
          name: "<:_:1195866944482590731> Top.gg",
          value: `https://top.gg/bot/1101256478632972369/vote`,
          inline: false,
        },
        {
          name: "<:_:1198663251580440697> Wumpus.Store",
          value: `https://wumpus.store/bot/1101256478632972369/vote`,
          inline: false,
        },
        {
          name: "<:_:1227425669642719282> Botlist.me ",
          value: "https://botlist.me/bots/1101256478632972369",
        },
        {
          name: "<:_:1252815882481303662> Discordlist.gg",
          value: "https://discordlist.gg/bot/1101256478632972369/vote",
        }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [voteembed] });
  },
};
