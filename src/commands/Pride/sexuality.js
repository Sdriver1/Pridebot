const {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sexuality")
    .setDescription("Learn about any sexuality"),

  async execute(interaction) {
    const sex = [
      {
        name: "Asexual/Aromantic",
        description: "Click to learn about Asexualy",
        value: "asexual",
        emoji: "1108870840709288111",
        info: {
          title: "Asexual",
          title2: "Aromantic",
          description:
            "Asexuality is a sexual orientation characterized by a lack of sexual attraction. Asexual individuals may still experience romantic attraction, which is referred to as aromanticism. Asexual people may form meaningful and fulfilling relationships without the need for sexual intimacy.",
          description2:
            "Asexuality is a valid and diverse sexual orientation that exists on a spectrum. Some asexual individuals may experience a low level of sexual attraction or may only experience it under specific circumstances. It's important to respect and understand asexuality as a legitimate orientation and not as a deficiency or lack.",
        },
      },
      {
        name: "Bisexual/Biromantic/Bicurious",
        description: "Click to learn about Bisexuality",
        value: "bisexual",
        emoji: "1108823482856382474",
        info: {
          title: "Bisexual",
          title2: "Biromantic",
          description:
            "Bisexuality is a sexual orientation characterized by attraction to both males and females. Bisexual individuals may experience attraction to people of different genders, including but not limited to men and women. Bisexuality does not imply equal or simultaneous attraction to all genders.",
          description2:
            "Biromantic refers to the romantic aspect of bisexuality, where individuals are emotionally and romantically attracted to both males and females. Bicurious is a term used to describe someone who is curious about or questioning their attraction to both males and females.",
        },
      },
      {
        name: "Demisexual/Demiromantic",
        description: "Click to learn about Demisexuality",
        value: "demisexual",
        emoji: "1108868004042772561",
        info: {
          title: "Demisexual",
          title2: "Demiromantic",
          description:
            "Demisexuality is a sexual orientation characterized by developing sexual attraction only after forming a strong emotional bond. Demisexual individuals may experience sexual attraction but typically only within the context of a close and emotionally connected relationship.",
          description2:
            "Demiromantic refers to the romantic aspect of demisexuality, where individuals develop romantic feelings only after establishing a deep emotional connection with someone.",
        },
      },
      {
        name: "Gay",
        description: "Click to learn about Gays",
        value: "gay",
        emoji: "1109676932251000923",
        info: {
          title: "Gay",
          description:
            "Gay is a sexual orientation characterized by attraction to individuals of the same gender. Gay individuals experience romantic and sexual attraction towards people of the same gender identity.",
        },
      },
      {
        name: "Heterosexual (Straight)",
        description: "Click to learn about Heterosexuality",
        value: "heterosexual",
        emoji: "1108822782999007242",
        info: {
          title: "Heterosexual (Straight)",
          description:
            "Heterosexuality is a sexual orientation characterized by attraction to individuals of the opposite gender. Heterosexual individuals typically experience romantic and sexual attraction towards people of a different gender identity.",
          description2:
            "Heterosexuality is one of the most commonly recognized sexual orientations and is considered the societal norm in many cultures.",
        },
      },
      {
        name: "Homosexual/Homoromantic",
        description: "Click to learn about Homosexuality",
        value: "homosexual",
        emoji: "1108822823721521242",
        info: {
          title: "Homosexual",
          title2: "Homoromantic",
          description:
            "Homosexuality is a sexual orientation characterized by attraction to individuals of the same gender. Homosexual individuals experience romantic and sexual attraction towards people of the same gender identity.",
          description2:
            "Homoromantic refers to the romantic aspect of homosexuality, where individuals develop romantic feelings only for people of the same gender.",
        },
      },
      {
        name: "Lesbian",
        description: "Click to learn about Lesbians",
        value: "lesbian",
        emoji: "1108868440363642930",
        info: {
          title: "Lesbian",
          description:
            "Lesbian is a sexual orientation specific to women, characterized by romantic and sexual attraction to other women. Lesbian individuals are exclusively attracted to individuals of the same gender.",
        },
      },
      {
        name: "Omnisexual/Omniromantic",
        description: "Click to learn about Omnisexuality",
        value: "omnisexual",
        emoji: "1108823213498183751",
        info: {
          title: "Omnisexual",
          title2: "Omniromantic",
          description:
            "Omnisexuality is a sexual orientation characterized by attraction to individuals of all genders. Omnisexual individuals may experience attraction to people regardless of their gender identity.",
          description2:
            "Omniromantic refers to the romantic aspect of omnisexuality, where individuals are emotionally and romantically attracted to people of all genders.",
        },
      },
      {
        name: "Pansexual/Panromantic",
        description: "Click to learn about Pansexuality",
        value: "pansexual",
        emoji: "1108823338949812355",
        info: {
          title: "Pansexual",
          title2: "Panromantic",
          description:
            "Pansexuality is a sexual orientation characterized by attraction to people regardless of their gender identity. Pansexual individuals may be attracted to individuals of any gender or may have a preference for certain qualities or personalities.",
          description2:
            "Panromantic refers to the romantic aspect of pansexuality, where individuals are emotionally and romantically attracted to people regardless of their gender identity.",
        },
      },
      {
        name: "Polyamorous",
        description: "Click to learn about Polyamaory",
        value: "polyamory",
        emoji: "1108868194065727651",
        info: {
          title: "Polyamorous",
          description:
            "Polyamory is a relationship orientation characterized by the practice of having multiple romantic or sexual partners simultaneously, with the knowledge and consent of all involved. Polyamorous individuals may form deep and meaningful connections with multiple partners.",
        },
      },
    ];

    const selectOptions = sex.map((sexuality) =>
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
        "Choose one of the sexualities below that you want to learn about:"
      )
      .addFields({
        name: "Sexualities",
        value: sex
          .map((sexuality) => `<:_:${sexuality.emoji}> **${sexuality.name}**`)
          .join("\n"),
        inline: true,
      })
      .setColor("#FF00AE")
      .setTimestamp();

    await interaction.reply({ embeds: [embed], components: [row] });

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
    });
    collector.on("collect", (selectInteraction) => {
      if (selectInteraction.customId === "sexualitySelect") {
        const fields = [];
        const selectedValue = selectInteraction.values[0];

        let sexInfo;
        for (let i = 0; i < sex.length; i++) {
          if (sex[i].value === selectedValue) {
            sexInfo = sex[i];
          }
        }

        if (sexInfo.info.title) {
          fields.push({
            name: `${sexInfo.info.title}`,
            value: `${sexInfo.info.description}`,
          });
        } else if (sexInfo.info.title2) {
          fields.push({
            name: `${sexInfo.info.title2}`,
            value: `${sexInfo.info.description2}`,
          });
        }

        const selectedEmbed = {
          color: 0xff00ae,
          title: `Info on ${sexInfo.name}`,
          timestamp: new Date().toISOString(),
          fields: fields,
        };
        selectInteraction.reply({ embeds: [selectedEmbed], ephemeral: true });
      }
    });
  },
};
