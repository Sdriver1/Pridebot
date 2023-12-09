const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("transgender")
    .setDescription("transition to new discord UI"),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`Congrats, you are now trans`)
      .setDescription(`Here are some facts on "transgender"`)
      .setColor(0xff00ae)
      .setFields(
        {
          name: `What is transgender`,
          value: `Transgender people are those whose gender identity doesn't align with the sex they were assigned at birth. This encompasses a broad spectrum of identities and experiences, and includes people who may not strictly identify as male or female. More can be found in </gender:1112200593310756874>`,
        },
        {
          name: `History`,
          value: `The transgender pride flag was created in 1999 by Monica Helms, a transgender navy veteran. It was first flown at a pride parade in Phoenix in 2000. The flag symbolizes the transgender community and has been a significant emblem since its debut. It has been displayed in various significant locations and events, including San Francisco’s Castro District for Transgender Day of Remembrance and the White House during Pride Month.`,
        },
        {
          name: `The Flag`,
          value: `The transgender pride flag consists of five horizontal stripes: two light blue, two light pink, and one white in the center. Light blue represents the traditional color for boys, light pink for girls, and white symbolizes those who are intersex, transitioning, or have a neutral or undefined gender.`,
        },
        {
          name: `Days/Honoring Times`,
          value: `Transgender Day of Remembrance is observed annually on November 20th to honor the memory of transgender people whose lives were lost in acts of anti-transgender violence. Additionally, Transgender Day of Visibility is celebrated on March 31st to recognize and celebrate the transgender community.`,
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
};
