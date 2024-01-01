const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bisexual")
    .setDescription("Why am I bi myself again ;-;"),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/bisexual \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );
    const embed = new EmbedBuilder()
      .setTitle(`Bisexual!`)
      .setDescription(`Here is some facts on "bisexual/biromatic"`)
      .setColor(0xff00ae)
      .setFields(
        {
          name: `What is Bisexual`,
          value: `Bisexuality refers to the romantic and/or sexual attraction towards both men and women. It acknowledges a spectrum of attraction that can vary in intensity and change over time. Bisexual individuals may also experience attraction beyond the binary concept of gender.`,
        },
        {
          name: `History`,
          value: `Bisexuality has been acknowledged in various cultures throughout history, but the term itself gained prominence in the 20th century. The bisexual rights movement gained momentum in the late 20th century, striving for acceptance and equal rights within the broader LGBTQ+ community and society.`,
        },
        {
          name: `<:Pridebot_flag_bi:1108823482856382474> The Flag`,
          value: `The bisexual pride flag was designed by Michael Page in 1998 to give the bisexual community its own symbol comparable to the gay pride flag. The flag features three horizontal stripes: pink at the top for same-sex attraction, blue at the bottom for different-sex attraction, and an overlapping purple stripe in the middle representing attraction to both sexes.`,
        },
        {
          name: `Days/Honoring Times`,
          value: `- Bisexual Health Awareness Month - **March** \n- Bisexual Awareness Week - **September 16th to 22nd** \n- Bisexuality Day - **September 23**`,
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
};
