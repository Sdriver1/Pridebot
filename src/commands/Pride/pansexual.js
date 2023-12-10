const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pansexual")
    .setDescription("You like pots or pans more?"),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`Congrats, you are now pan`)
      .setDescription(`Here are some facts on "pansexual/panromantic"`)
      .setColor(0xff00ae)
      .setFields(
        {
          name: `What is Pansexual/Panromantic`,
          value: `Pansexuality is the attraction to people regardless of their gender identity. This includes attraction to all genders and sexes, recognizing the spectrum of gender identities beyond the male-female binary. You can learn more about this in </sexuality:1111289006299283456>`,
        },
        {
          name: `History`,
          value: `The word “pansexual” comes from the Greek prefix “pan” meaning “all”. The concept emerged in the early 20th century and gained more recognition recently. Pansexuality is distinct from bisexuality; while bisexuality refers to attraction to two genders, pansexuality includes all gender identities, forming a part of the broader LGBTQ+ rights movement.`,
        },
        {
          name: `<:Pridebot_flag_pan:1108823338949812355> The Flag`,
          value: `The pansexual pride flag, created around 2010, features pink, yellow, and blue stripes. It was designed to differentiate from the bisexuality flag. Pink represents attraction to those who identify as female, yellow for attraction to genderqueer, non-binary, agender, androgynous people, or those not on the male-female binary, and blue for attraction to those who identify as male.`,
        },
        {
          name: `Days/Honoring Times`,
          value: `- Pan Week - **December 6th to 12th** \n- Pansexual and Panromantic Awareness Day - **May 24th** \n- Pansexual Pride Day - **December 8th**`,
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
};
