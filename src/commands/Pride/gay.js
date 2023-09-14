const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gay")
    .setDescription("GAY!!!"),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`Congrats, you are now gay`)
      .setDescription(`Here is some facts on "gay"`)
      .setColor(0xff00ae)
      .setFields(
        {
          name: `<:_:1115856052316012657> Word Origin`,
          value: `The word “gay” seems to have its origins around the 12th century in England, derived from the Old French word ‘gai’, which in turn was probably derived from a Germanic word, though that isn’t completely known.  The word’s original meaning meant something to the effect of “joyful”, “carefree”, “full of mirth”, or “bright and showy”. It wasn't until 1955 that **gay** officially acquired the newly added definition of homosexual males. ([Source](https://www.todayifoundout.com/index.php/2010/02/how-gay-came-to-mean-homosexual/))`,
        },
        {
          name: `<:_:1109676932251000923> The flag`,
          value: `When most people think of gay, they think of a rainbow flag (<:_:1108822823721521242>) but in reality, the rainbow flag was actually founded in 1978 when the artist Gilbert Baker, an openly gay man, designed the first rainbow flag. He was urged by Harvey Milk, one of the first openly gay elected officials in the U.S., to create a symbol of pride for the gay community. ([Source](https://www.britannica.com/story/how-did-the-rainbow-flag-become-a-symbol-of-lgbt-pride)) \n\nThe new modern gay flag name is actually called "[Trans-Inclusive Gay Men's Pride Flag](https://www.hrc.org/resources/lgbtq-pride-flags)" <:_:1109676932251000923> and is the version of the rainbow flag with more greenish/blue colors to represent different identities of males.`,
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
};
