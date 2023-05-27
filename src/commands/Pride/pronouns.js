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
      .setName("pronouns")
      .setDescription("Learn about any kinds or types of pronouns"),
  
    async execute(interaction) {
      const pronoun = [
        {
          name: "He/Him/His",
          description: "Click to learn about He/Him/His pronouns",
          value: "he",
          emoji: "1111874334663913472",
          info: {
            title: "What is He/Him/His",
            title2: "Examples",
            title3: "Full pronoun",
            description:
              "These pronouns typically correspond to male gender identity. They are commonly used by individuals who identify as male and prefer masculine pronouns.",
            description2:
              "**He** is going to the store.\nI saw **him** at the party.\n**His** car is parked outside.",
            description3: 
              "**Subject Pronoun** - he \n**Object Pronou**n - him\n**Possessive Determiner** - his\n**Possessive Pronoun** - his\n**Reflexive Pronoun** - himself",
          },
        },
        {
          name: "She/Her/Hers",
          description: "Click to learn about She/Her/Hers pronouns",
          value: "she",
          emoji: "1111874384248983602",
          info: {
            title: "What is She/Her/Hers",
            title2: "Examples",
            title3: "Full pronoun",
            description:
              "These pronouns typically correspond to female gender identity. They are commonly used by individuals who identify as female and prefer feminine pronouns.",
            description2:
              "**She** is a doctor.\nI spoke to **her** on the phone.\nThe book is **hers.**",
            description3: 
            "**Subject Pronoun** - she \n**Object Pronou**n - her\n**Possessive Determiner** - her\n**Possessive Pronoun** - hers\n**Reflexive Pronoun** - herself",
          },
        },
        {
          name: "They/Them/Their",
          description: "Click to learn about They/Them/Their pronouns",
          value: "they",
          emoji: "1111874493971955833",
          info: {
            title: "What is They/Them/Their",
            title2: "Examples",
            title3: "Full pronoun",
            description:
              "These pronouns are gender-neutral and can be used by individuals who identify as non-binary, genderqueer, or prefer not to specify their gender. They are also used as singular pronouns in certain contexts or commonly used if personing using the pronouns are unsure of someone else pronouns.",
            description2:
              "**They** are going to the party.\nI met **them** yesterday.\n**Their** phone is ringing.",
            description3: 
            "**Subject Pronoun** - they \n**Object Pronou**n - them\n**Possessive Determiner** - their\n**Possessive Pronoun** - theirs\n**Reflexive Pronoun** - themself",
          },
        },
        {
          name: "It/Its",
          description: "Click to learn about It/Its pronouns",
          value: "it",
          emoji: "1111874573961543701",
          info: {
            title: "What is It/Its",
            title2: "Examples",
            title3: "Full pronoun",
            description:
              "These pronouns are typically used to refer to inanimate objects or animals, but some individuals may use them to describe their own gender identity. ",
            description2:
              "**It** is a cute dog.\nI saw **it** in the park.\nThe book is **its**.",
            description3: 
            "**Subject Pronoun** - it \n**Object Pronou**n - it\n**Possessive Determiner** - its\n**Possessive Pronoun** - its\n**Reflexive Pronoun** - itself",
          },
        },
        {
          name: "Neopronouns",
          description: "Click to learn about Neopronouns",
          value: "neopronouns",
          emoji: "1111874649261879377",
          info: {
            title: "What are Neopronouns",
            title2: "Examples (using xe/xem for here)",
            title3: "Full pronoun (using ze/zem for here)",
            description:
              "Neopronouns are a category of gender-neutral pronouns that are created or used outside of the traditional pronoun sets. They can vary widely and may include pronouns such as xe/xem/xyr or ze/hir/hirs. It is important to use the specific neopronouns preferred by an individual.",
            description2:
              "**Xe** is going to the store.\nI saw **xem** at the party.\n**Xyr** car is parked outside.",
            description3: 
            "**Subject Pronoun** - ze \n**Object Pronou**n - zem\n**Possessive Determiner** - zyr\n**Possessive Pronoun** - zyrs\n**Reflexive Pronoun** - zemself",
          },
        },
        {
          name: "Any/All pronouns",
          description: "Click to learn about identifying as any/all pronouns",
          value: "all",
          emoji: "1111874831315648552",
          info: {
            title: "What is any/all pronouns",
            title2: "Examples",
            title3: "Full pronoun",
            description:
              "Some individuals prefer to be referred to using any or all pronouns, regardless of their gender identity. The individual though may prefer some pronouns over other, so make sure to check what the individual is comfortable with or prefers more",
            description2:
              "I heard **they** are going to the party so I met up with **him**. We took **her** car.",
            description3: 
            "*No full pronouns*",
          },
        },
        {
          name: "Combinations",
          description: "Click to learn about combinations of pronouns",
          value: "combo",
          emoji: "1111874732485255190",
          info: {
            title: "What are combinations",
            title2: "Examples",
            title3: "Full pronoun",
            description:
              "Combinations refer to the use of multiple sets of pronouns together, such as he/they or she/it. This can indicate that an individual is comfortable with either set of pronouns.",
            description2:
              "**He** is going to the store. **They** are going to the store.\nI saw **her** at the party. I saw **it** at the party.",
            description3: 
            "*No full pronouns*",
          },
        },
        {
          name: "Others",
          description: "Click to learn about what classifies as others pronouns",
          value: "other",
          emoji: "1111874986597171232",
          info: {
            title: "What classifies as others pronouns",
            title2: "Examples",
            title3: "Full pronoun",
            description:
              "Others pronouns refer to pronoun sets that are not commonly listed or fall outside of traditional pronouns. These can include specific neopronouns or pronouns that individuals create for themselves.",
            description2:
              "Examples can be anything the individual decides to be identified as",
            description3: 
            "*No full pronouns*",
          },
        },
      ];
  
      const selectOptions = pronoun.map((pronoun) =>
        new StringSelectMenuOptionBuilder()
          .setLabel(pronoun.name)
          .setDescription(pronoun.description)
          .setValue(pronoun.value)
          .setEmoji(pronoun.emoji)
      );
      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId("pronounSelect")
        .setPlaceholder("Choose pronouns here")
        .addOptions(selectOptions);
  
      const row = new ActionRowBuilder().addComponents(selectMenu);
  
      const embed = new EmbedBuilder()
        .setTitle("Which pronoun do you want to learn about?")
        .setDescription(
          "Choose one of the pronouns or types below that you want to learn about:"
        )
        .addFields({
          name: "Pronouns",
          value: pronoun
            .map((pronoun) => `<:_:${pronoun.emoji}> **${pronoun.name}**`)
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
        if (selectInteraction.customId === "pronounSelect") {
          const selectedValue = selectInteraction.values[0];
  
          let pronounInfo;
          for (let i = 0; i < pronoun.length; i++) {
            if (pronoun[i].value === selectedValue) {
                pronounInfo = pronoun[i];
            }
          }
  
          const selectedEmbed = new EmbedBuilder().setColor(0xff00ae).addFields(
            {
                name: `${pronounInfo.info.title}`,
                value: `${pronounInfo.info.description}`,
        
            },
            {
                name: `${pronounInfo.info.title2}`,
                value: `${pronounInfo.info.description2}`, 
            },
            {
                name: `${pronounInfo.info.title3}`,
                value: `${pronounInfo.info.description3}`, 
            }
          )
          selectInteraction.reply({ embeds: [selectedEmbed], ephemeral: true });
        }
      });
    },
  };
  