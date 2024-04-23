const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("asexual")
    .setDescription("asexual, bsexual, csexual..."),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/asexual \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );
    const embed = new EmbedBuilder()
      .setTitle(`<:_:1108870840709288111> Asexual!`)
      .setDescription(`Here are some facts about "asexuality/aromantic"`)
      .setColor(0x9b59b6)
      .setFields(
        {
          name: `What is Asexuality`,
          value: `Asexuality is a sexual orientation where a person experiences little to no sexual attraction to anyone, regardless of gender. Asexuality varies greatly among individuals, and it's a normal and valid way of experiencing attraction.`,
        },
        {
          name: `History`,
          value: `The visibility and understanding of asexuality have grown significantly in the 21st century, though the concept has existed in various forms throughout history. The asexual community has sought to gain recognition within the broader LGBTQ+ movement, highlighting the importance of understanding and respecting different experiences of attraction. Aromanticism, similarly, has gained more recognition as conversations about the spectrum of romantic attraction have evolved.`,
        },
        {
          name: `The Flag`,
          value: `The asexual pride flag consists of four horizontal stripes: black for asexuality, gray for the gray-ace and demisexual community, white for allies, and purple for community. The aromantic community also has a flag with green, light green, white, gray, and black stripes, symbolizing the aromantic spectrum.`,
        },
        {
          name: `Aromantic Days/Honoring Times`,
          value: `- Aromantic Awareness Month - **February** \n- Aromantic Spectrum Awareness Week - **February 18th - 24th** \n- Aromantic Visibility Day - **June 5th and August 25th**`,
        },
        {
          name: `Asexual Days/Honoring Times`,
          value: `- Ace Week - **October 20th - 26th** \n- International Asexuality Day - **April 6** \n- Asexual Visibility Day - **May 8**`,
        }
      );
    await interaction.reply({ embeds: [embed] });
  },
};
