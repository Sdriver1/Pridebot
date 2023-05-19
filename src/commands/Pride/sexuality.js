const {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sexuality")
    .setDescription("Learn about any sexuality"),

  async execute(interaction) {
    const sexSelect = [
      {
        name: "Asexual/Aromantic",
        description: "Click to learn about Asexualy",
        value: "asexual",
        emoji: "1108870840709288111",
      },
      {
        name: "Bisexual/Biromantic/Bicurious",
        description: "Click to learn about Bisexuality",
        value: "bisexual",
        emoji: "1108823482856382474",
      },
      {
        name: "Demisexual/Demiromantic",
        description: "Click to learn about Demisexuality",
        value: "demisexual",
        emoji: "1108868004042772561",
      },
      {
        name: "Heterosexual (Straight)",
        description: "Click to learn about Heterosexuality",
        value: "heterosexual",
        emoji: "1108822782999007242",
      },
      {
        name: "Homosexual/Homoromantic",
        description: "Click to learn about Homosexuality",
        value: "homosexual",
        emoji: "1108822823721521242",
      },
      {
        name: "Lesbian",
        description: "Click to learn about Lesbians",
        value: "lesbian",
        emoji: "1108868440363642930",
      },
      {
        name: "Omnisexual/Omniromantic",
        description: "Click to learn about Omnisexuality",
        value: "omnisexual",
        emoji: "1108823213498183751",
      },
      {
        name: "Pansexual/Panromantic",
        description: "Click to learn about Pansexuality",
        value: "pansexual",
        emoji: "1108823338949812355",
      },
      {
        name: "Polyamorous",
        description: "Click to learn about Polyamaory",
        value: "polyamory",
        emoji: "1108868194065727651",
      },
    ];

    const sexInfo = {
        asexual: {
          title: "Asexual/Aromantic",
          description: "Asexuality is a sexual orientation characterized by a lack of sexual attraction...",
          description2: ''
        },
        bisexual: {
          title: "Bisexual/Biromantic/Bicurious",
          description: "Bisexuality is a sexual orientation characterized by attraction to both males and females...",
          // Add other properties as needed
        },
        demisexual: {
          title: "Demisexual/Demiromantic",
          description: "Demisexuality is a sexual orientation characterized by developing sexual attraction only after forming a strong emotional bond...",
          // Add other properties as needed
        },
        heterosexual: {
          title: "Heterosexual (Straight)",
          description: "Heterosexuality is a sexual orientation characterized by attraction to the opposite gender...",
          // Add other properties as needed
        },
        homosexual: {
          title: "Homosexual/Homoromantic",
          description: "Homosexuality is a sexual orientation characterized by attraction to the same gender...",
          // Add other properties as needed
        },
        // Add information for other sexualities
      };

    const selectOptions = sexSelect.map((sexuality) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(sexuality.name)
        .setDescription(sexuality.description)
        .setValue(sexuality.value)
        .setEmoji(sexuality.emoji)
    );

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("sexualitySelect")
      .setPlaceholder("Choose Sexuality here")
      .addOptions(selectOptions);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const embed = new EmbedBuilder()
      .setTitle("Which sexuality do you want to learn about?")
      .setDescription(
        "Choose one of the sexualities below that you want to learn about"
      )
      .addFields({
        name: "Sexualities",
        value:
          "<:_:1108870840709288111> **Asexual/Aromantic**\n<:_:1108823482856382474> **Bisexual/Biromantic/Bicurious**\n<:_:1108868004042772561> **Demisexual/Demiromantic**\n<:_:1108822782999007242> **Heterosexual (Straight)**\n<:_:1108822823721521242> **Homosexual/Homoromantic**\n<:_:1108868440363642930> **Lesbian**\n<:_:1108823213498183751> **Omnisexual/Omniromantic**\n<:_:1108823338949812355> **Pansexual/Panromantic**\n<:_:1108868194065727651> **Polyamorous**",
        inline: true,
      })
      .setColor(parseInt("ff00ae", 16))
      .setTimestamp();

      await interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: true,
      });
  
      const collector = interaction.channel.createMessageComponentCollector({
        componentType: "SELECT_MENU",
      });
      collector.on("collect", (selectInteraction) => {
        if (selectInteraction.customId === "sexualitySelect") {
          const selectedValue = selectInteraction.values[0];
          const selectedSexInfo = sexInfo[selectedValue];
  
          if (selectedSexInfo) {
            const selectedEmbed = new EmbedBuilder()
              .setTitle(selectedSexInfo.title)
              .setDescription(selectedSexInfo.description)
              .setColor(parseInt("ff00ae", 16))
              .setTimestamp();
  
            selectInteraction.reply({
              embeds: [selectedEmbed],
              ephemeral: true,
            });
          }
        }
      });
  
      collector.on("end", () => {
        // Handle the end of collector if needed
      });
    },
  };

  
  
  
  
  
  
  