const {
  EmbedBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");
const utility_functions = {
  chance: function (probability) {
    if (Math.random() > probability) return false;
    return true;
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
};

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("User Gaydar")
    .setType(ApplicationCommandType.User),

  async execute(interaction) {
    const targetUser = interaction.targetUser;
    const userName = targetUser.username;
    const userid = targetUser.id;

    let meter;
    if (userid === ids.austin) {
      meter = 300;
    } else if (userid === ids.paul) {
      meter = 0.1;
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
  },
};
