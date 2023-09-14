const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lesbian")
    .setDescription("Another surprise 👀"),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`Congrats, you are now lesbian`)
      .setDescription(`Here is some facts on "lesibans"`)
      .setColor(0xff00ae)
      .setFields(
        {
          name: `🌈 Word Origin`,
          value: `The word "lesbian" is derived from an Ancient Greek woman known as Sappho of Lesbos. Until the 19th Century, the word lesbian was used to describe something that was actually from Lesbos but during the mid-19th Century, scholars, scientists, and doctors began to examine the somewhat neglected, in comparison to the phenomenon of male homosexuality, the field of female homosexuality. This coincided with the increasingly popular new theory of Sappho’s sexual orientation. It was only natural, therefore, that when searching for a term to describe female homosexuality, one is drawn to the individual who, at the time, might be considered the ‘original’. ([Source](https://realhistory.co/2017/09/18/word-origin-lesbian/))`,
        },
        {
          name: `<:_:1108868440363642930> The flag`,
          value: `The first documented lesbian pride flag was designed by graphic designer Sean Campbell in 1999 and published in a 2000s issue of the Palm Springs Gay and Lesbian Times, the "Labrys Lesbian Flag" <:_:1115866300858761236>. The "Lipstick Lesbian Flag" <:_:1115867721737977877> was the first design of the now more modern flag in 2010 and later had "Pink Flag" <:_:1115867480649379840> in 2015. These flags adopted horizontal stripes harkening to the Rainbow Pride Flag designed by Gilbert Baker but in a gradient of pink and white. Finally, in 2018 a woman on Tumblr named Emily Gwen posted her idea for the lesbian flag called "Sunset Lesbian Flag" <:_:1115868994746974320> which has 7 stripes and was later simplified to 5 aka now " Lesbian Pride Flag" <:_:1108868440363642930>. ([Source](https://flagsforgood.com/blogs/news/history-of-the-lesbian-flag))`,
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
};