const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nonbinary")
    .setDescription("01001110 01101111 01101110 00101101 01000010 01101001 01101110 01100001 01110010 01111001"),

  async execute(interaction, client) {
    console.log(chalk.white.bold(`-------------------------- \n/lesbian \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.id} \nTime: ${new Date()} \n--------------------------`));
    const embed = new EmbedBuilder()
      .setTitle(`Non-binary`)
      .setDescription(`Here are some facts on "non-binary"`)
      .setColor(0xff00ae)  
      .setFields(
        {
          name: `What is Non-Binary`,
          value: `Non-binary is a term used to describe genders that don't fall strictly within the male or female categories. Non-binary individuals may experience their gender as a mix of both, neither, or something entirely different. This identity is part of the broader transgender spectrum.`,
        },
        {
          name: `History`,
          value: `The recognition of non-binary genders has a long history across different cultures, such as the "Two-Spirit" people in some Indigenous North American cultures. In recent times, the non-binary identity has gained more visibility as societies increasingly acknowledge gender diversity beyond the binary framework.`,
        },
        {
          name: `<:Pridebot_flag_nb:1112196445064413194> The Flag`,
          value: `The non-binary pride flag, created in 2014 by activist Kye Rowan, features four horizontal stripes: yellow, white, purple, and black. Each color holds significance: yellow represents genders outside the binary, white for non-binary people who also identify as transgender, purple as a mix of traditional male and female colors, and black for those who identify as having no gender.`,
        },
        {
          name: `Days/Honoring Times`,
          value: `- Nonbinary Awareness Week (2024) - **July 8th to 14th** \n- International Nonbinary People's Day - **July 14** \n- Nonbinary Kids' Day - **October 1**`,
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
};
