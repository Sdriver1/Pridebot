const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const commandLogging = require("../../config/commandfunctions/commandlog");
const utility_functions = {
  chance: function (probability) {
    return Math.random() <= probability;
  },
  number_format_commas: function (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
};

const ids = {
  austin: "288897433805651968",
  paul: "218507234144026625",
  bot: "1101256478632972369",
  idiot: "197794050823290880",
  dan: "1176313325689258058",
  elijah: "894380069932396544",
  tree: "950951110829551658",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gaydar")
    .setDescription("How gay are you?")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("See how gay a user is")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    const targetUser =
      interaction.options.getUser("target") || interaction.user;
    const userName = targetUser.username;
    const userid = targetUser.id;

    let meter;
    if (userid === ids.austin) {
      meter = 300;
    } else if (userid === ids.paul) {
      meter = 0.1;
    } else if (userid === ids.tree) {
      meter = 100;
    } else if (userid === ids.elijah) {
      meter = 69420;
    } else if (userid === ids.dan) {
      meter = 0;
    } else if (userid === ids.idiot) {
      meter = "morbius";
    } else if (userid === ids.bot) {
      meter = 101;
    } else if (utility_functions.chance(0.0001)) {
      meter = Math.floor(Math.random() * 2354082) + 500;
      if (utility_functions.chance(0.5)) {
        meter *= -1;
      }
    } else {
      meter = Math.floor(Math.random() * 101);
    }

    const embed = new EmbedBuilder()
      .setTitle(`How gay is ${userName}?`)
      .setDescription(
        `<@${userid}> is **${utility_functions.number_format_commas(
          meter
        )}% gay!**`
      )
      .setColor(0xff00ae)
      .setFooter({
        text: "The bot has 99.99% accuracy rate on checking users gayness",
      });
    await interaction.reply({ embeds: [embed] });
    await commandLogging(client, interaction);
  },
};
