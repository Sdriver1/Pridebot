const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mentalhealth")
    .setDescription("Provides mental health resources")
    .addBooleanOption((option) =>
      option
        .setName("public")
        .setDescription("Set to true to make the response visible to everyone")
        .setRequired(false)
    ),

  async execute(interaction) {
    const embedData = {
      title: "Hotlines and Crisis Helplines / Websites",
      description:
        "Note: *Some lines or websites are only nationality available but any bolded links are international or give list to international lines*",
      color: 16711914,
      fields: [
        {
          name: "Websites",
          value:
            "**https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines\nhttp://www.suicidestop.com/call_a_hotline.html\nhttp://worldhelplines.org/**\nhttp://www.suicide.org/index.html\nhttps://suicidepreventionlifeline.org/",
        },
        {
          name: "Trevor Project (USA)",
          value:
            "TrevorLifeline - **1-866-488-7386**\nTrevorText - **text START to 678-678**\n[Trevor Project](http://www.thetrevorproject.org/)\n[Trevor Chat](https://www.thetrevorproject.org/get-help-now/)",
        },
        {
          name: "SwitchBoard (Europe)",
          value:
            "Available from **<t:1672567200:t>** to **<t:1672610400:t>** everyday\nSwitchBoard LgbtLine - **0800 0119 100** \nSwitchBoard Email - **hello@switchboard.lgbt**\n[SwitchBoard](https://switchboard.lgbt/)\n[How we can help](https://switchboard.lgbt/how-we-can-help/)",
        },
      ],
    };

    const embed = new EmbedBuilder()
      .setTitle(embedData.title)
      .setDescription(embedData.description)
      .setColor(embedData.color)
      .addFields(embedData.fields);

    const isPublic = interaction.options.getBoolean("public", false);

    await interaction.reply({ embeds: [embed], ephemeral: !isPublic });
  },
};
