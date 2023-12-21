const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gay")
    .setDescription("Imagine being gay, couldn't be me"),

  async execute(interaction, client) {
    console.log(chalk.white.bold(`-------------------------- \n/gay \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.id} \nTime: ${new Date()} \n--------------------------`));
    const embed = new EmbedBuilder()
      .setTitle(`Gay!`)
      .setDescription(`Here is some facts on "gay"`)
      .setColor(0xff00ae)
      .setFields(
        {
          name: `What Does 'Gay' Mean?`,
          value: `The term "gay" is commonly used to describe a person whose romantic and sexual attraction is towards people of the same gender. Historically, it has predominantly referred to men, but it can also encompass all individuals who experience same-gender attraction.`,
        },
        {
          name: `History`,
          value: `The word "gay" originally meant "joyful" or "carefree." By the mid-20th century, it evolved to refer to homosexuality. Gay rights movements have played a crucial role in LGBTQ+ history, advocating for equal rights and societal acceptance. Pioneers like Harvey Milk and organizations like Stonewall have been instrumental in advancing gay rights.`,
        },
        {
          name: `<:_:1109676932251000923> The Flag`,
          value: `When most people think of gay, they think of a rainbow flag (<:_:1108822823721521242>) but in reality, the rainbow flag was actually founded in 1978 when the artist Gilbert Baker, an openly gay man, designed the first rainbow flag. He was urged by Harvey Milk, one of the first openly gay elected officials in the U.S., to create a symbol of pride for the gay community. ([Source](https://www.britannica.com/story/how-did-the-rainbow-flag-become-a-symbol-of-lgbt-pride)) \n\nThe new modern gay flag name is actually called "[Trans-Inclusive Gay Men's Pride Flag](https://www.hrc.org/resources/lgbtq-pride-flags)" <:_:1109676932251000923> and is the version of the rainbow flag with more greenish/blue colors to represent different identities of males.`,
        },
        {
          name: `Days/Honoring Times`,
          value: `- LGBTQ+ Pride Month - **June** \n- National Coming Out Day - **October 11th**`,
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
};