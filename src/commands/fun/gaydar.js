const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gaydar")
    .setDescription("How gay are you?")
    .addUserOption(option =>
      option
        .setName("target")
        .setDescription("See how gay a user is")
        .setRequired(false) // Option is not required
    ),

  async execute(interaction, client) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/gaydar \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    const targetUser = interaction.options.getUser("target") || interaction.user;
    const userName = targetUser.username; 
    const userid = targetUser.id; 

    const austinID = "288897433805651968";
    const paulID = "218507234144026625";
	const driverID = "691506668781174824"
	const botID = "1101256478632972369";

    let meter;
    if (userid === austinID) {
      meter = 300;
    } else if (userid === paulID) {
      meter = 0.1;
    } else if (userid === driverID) {
      meter = 69;
    } else if (userid === botID) {
      meter = 101;
    } else {
      meter = Math.floor(Math.random() * 101);
    }

    const embed = new EmbedBuilder()
      .setTitle(`How gay is ${userName}?`)
      .setDescription(`<@${userid}> is **${meter}% gay!**`)
      .setColor(0xff00ae)
      .setFooter({ text: "The bot has 99.99% accuracy rate on checking users gayness" });
    await interaction.reply({ embeds: [embed] });
  },
};
