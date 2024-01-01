const {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  ComponentType,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sexuality")
    .setDescription("Learn about any kinds or types of sexualities"),

  async execute(interaction) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/sexuality \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    const sex = [
      {
        name: "Asexual/Aromantic",
        description: "Click to learn about Asexuality",
        value: "asexual",
        emoji: "1108870840709288111",
        info: {
          title: "Asexual",
          title2: "Aromantic",
          description:
            "Asexual is an orientation where individuals do not experience sexual attraction towards others. They may still experience romantic, emotional, or aesthetic attraction. Asexual individuals may identify as asexual, ace, or any other term within the asexual spectrum.",
          description2:
            "Aromantic is an orientation where individuals do not experience romantic attraction towards others. They may still experience sexual, aesthetic, or platonic attraction. Aromantic individuals may identify as aromantic, aro, or any other term within the aromantic spectrum.",
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
            "Gay is a sexual orientation characterized by an attraction to individuals of the same gender. Gay individuals experience romantic and sexual attraction towards people of the same gender identity.",
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
            "Lesbian is a sexual orientation specific to women or afab non-binary, characterized by romantic and sexual attraction to other women. Lesbian individuals are exclusively attracted to individuals of the same gender.",
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
      {
        name: "Queer",
        description: "Click to learn about Queer orientation",
        value: "queer",
        emoji: "1177459443231895563",
        info: {
          title: "Queer",
          description:
            "Queer is a term used by some individuals to describe a sexual orientation that is not exclusively heterosexual. Historically a pejorative term, 'queer' has been reclaimed by some as a self-affirming umbrella term, especially by those who challenge binary concepts of sexual orientation and gender identity.",
        },
      },
      {
        name: "Unlabeled",
        description: "Click to learn about Unlabeled orientation",
        value: "unlabeled",
        emoji: "1177458579456925718",
        info: {
          title: "Unlabeled",
          description:
            "Unlabeled refers to individuals who choose not to label their sexual orientation. This may be due to a variety of reasons, including the feeling that no existing labels accurately represent their experiences, or a preference for not defining their sexuality in conventional terms.",
        },
      },
    ];

    const selectOptions = sex.map((s) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(s.name)
        .setDescription(s.description)
        .setValue(s.value)
        .setEmoji(s.emoji)
    );

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("sexSelect")
      .setPlaceholder("Choose sexuality here")
      .addOptions(selectOptions);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const embed = new EmbedBuilder()
      .setTitle(
        "What are *sexualities* and which sexuality do you want to learn about?"
      )
      .setDescription(
        `Sexualities are feelings, thoughts, attractions, and behaviors towards other people in which you find them physically, sexually, or emotionally attractive. Sexualities are typically categorized under two suffix categories: **-sexual** and **-romantic**. The suffix -sexual is the more common one and usually refers to an individual's sexual and physical attractions. The suffix -romantic is less common and is more often used if an individual's romantic/emotional attraction is different from their sexual/physical attraction. If someone's sexuality is the same for both sexual and romantic attraction, the romantic aspect is integrated into the -sexual suffix. Individuals can identify with more than one sexuality to more narrowly or specifically define their attractions. Sexualities are also some of the more fluid aspects of an individual's life as they can change or develop over time, so it's okay to be unsure; there's no need to rush: \n\nChoose one of the sexualities below that you want to learn about:`
      )
      .addFields({
        name: "Sexualities",
        value: sex.map((s) => `<:_:${s.emoji}> **${s.name}**`).join("\n"),
        inline: true,
      })
      .setColor("#FF00AE")
      .setTimestamp();

    function createSexualityButtons(currentIndex) {
      const components = [];

      if (currentIndex > 0) {
        const prevSexuality = sex[currentIndex - 1];
        const prevLabel = `${prevSexuality.name}`;
        const prevEmoji = `${prevSexuality.emoji}`;

        const prevButton = new ButtonBuilder()
          .setLabel(prevLabel)
          .setEmoji(prevEmoji)
          .setStyle(ButtonStyle.Secondary)
          .setCustomId(`sex-${prevSexuality.value}`);
        components.push(prevButton);
      }

      if (currentIndex < sex.length - 1) {
        const nextSexuality = sex[currentIndex + 1];
        const nextLabel = `${nextSexuality.name}`;
        const nextEmoji = `${nextSexuality.emoji}`;

        const nextButton = new ButtonBuilder()
          .setLabel(nextLabel)
          .setEmoji(nextEmoji)
          .setStyle(ButtonStyle.Secondary)
          .setCustomId(`sex-${nextSexuality.value}`);
        components.push(nextButton);
      }

      return components;
    }

    await interaction.reply({ embeds: [embed], components: [row] });

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
    });

    collector.on("collect", (selectInteraction) => {
      if (selectInteraction.customId === "sexSelect") {
        const selectedValue = selectInteraction.values[0];
        const sexInfo = sex.find((s) => s.value === selectedValue);

        if (!sexInfo) {
          console.error(
            `No sexuality information found for value: ${selectedValue}`
          );
          selectInteraction.reply({
            content:
              "Sorry, an error occurred while fetching sexuality information.",
            ephemeral: true,
          });
          return;
        }

        const currentIndex = sex.indexOf(sexInfo);
        const fieldsToAdd = [];

        if (sexInfo.info.title) {
          fieldsToAdd.push({
            name: sexInfo.info.title,
            value: sexInfo.info.description,
          });
        }
        if (sexInfo.info.title2) {
          fieldsToAdd.push({
            name: sexInfo.info.title2,
            value: sexInfo.info.description2,
          });
        }

        const selectedEmbed = new EmbedBuilder().setColor(0xff00ae);
        selectedEmbed.addFields(...fieldsToAdd);

        const buttons = createSexualityButtons(currentIndex);
        const updatedRow = new ActionRowBuilder().addComponents(buttons);

        selectInteraction.reply({
          embeds: [selectedEmbed],
          components: [updatedRow],
          ephemeral: true,
        });
      }
    });

    const buttonCollector = interaction.channel.createMessageComponentCollector(
      {
        componentType: ComponentType.BUTTON,
        time: 60000,
      }
    );

    buttonCollector.on("collect", (buttonInteraction) => {
      const [, sexValue] = buttonInteraction.customId.split("-");
      const selectedSexualityIndex = sex.findIndex((s) => s.value === sexValue);
      const sexInfo = sex[selectedSexualityIndex];
      if (!sexInfo) {
        console.error(
          `No sexuality information found for index: ${selectedSexualityIndex}`
        );
        return;
      }

      const fieldsToAdd = [];

      if (sexInfo.info.title) {
        fieldsToAdd.push({
          name: sexInfo.info.title,
          value: sexInfo.info.description,
        });
      }
      if (sexInfo.info.title2) {
        fieldsToAdd.push({
          name: sexInfo.info.title2,
          value: sexInfo.info.description2,
        });
      }

      const updatedEmbed = new EmbedBuilder().setColor(0xff00ae);
      updatedEmbed.addFields(...fieldsToAdd);

      const updatedButtons = createSexualityButtons(selectedSexualityIndex);
      const updatedRow = new ActionRowBuilder().addComponents(updatedButtons);

      buttonInteraction.update({
        embeds: [updatedEmbed],
        components: [updatedRow],
      });
    });
  },
};
