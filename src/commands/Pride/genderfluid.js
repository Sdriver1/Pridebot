const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("genderfluid")
    .setDescription("Who stole my fluid!!!"),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/genderfluid \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );
    const embed = new EmbedBuilder()
      .setTitle(`<:_:1112196520477999226> Genderfluid!`)
      .setDescription(`Here are some facts on "genderfluid"`)
      .setColor(0xff00ae)
      .setFields(
        {
          name: `What is Genderfluid`,
          value: `Genderfluid refers to a gender identity that varies over time. It can change, sometimes day-to-day or over longer periods, and may include male, female, both, or neither.`,
        },
        {
          name: `History`,
          value: `The concept of genderfluidity has roots that stretch back through history, though the specific term "genderfluid" is relatively modern. Various cultures globally have recognized non-binary or multiple gender roles, but the Western concept of genderfluidity gained prominence in the late 20th and early 21st centuries as part of the broader transgender rights movement. It challenges the traditional binary understanding of gender, proposing instead that gender can be dynamic and changing over time. In academic and social contexts, discussions about genderfluidity have helped illuminate the experiences of those who do not feel represented by static, binary gender definitions. `,
        },
        {
          name: `The Flag`,
          value: `The genderfluid pride flag consists of five horizontal stripes: pink for femininity, white for all genders, purple for a mixture of masculinity and femininity, black for the absence of gender, and blue for masculinity.`,
        },
        {
          name: `Days/Honoring Times`,
          value: `- Genderfluid Awareness Week (2024) - **October 17th to 23rd** \n- Genderfluid Visibility Day - **June 16**`,
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
};
