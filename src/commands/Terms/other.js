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
    .setName("other")
    .setDescription(
      "Learn about other common terms associated with or normally found in LGBTQIA+ environments"
    ),

  async execute(interaction) {
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/other \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    const other = [
      {
        name: "Dissociative Systems",
        description: "Comprehensive understanding of dissociative systems",
        value: "dissociative_systems",
        emoji: "1201384909823016980", // Use actual emoji or emoji ID
        info: {
          title: "Overview of Dissociative Systems",
          description:
            "Dissociative systems describe the experience of having multiple, distinct identities or personality states, known as alters, within a single individual. This is a complex psychological condition that primarily arises as a response to severe trauma, often during early childhood. It's a protective mechanism, allowing individuals to distance themselves from experiences of trauma.",

          title2: "DID and OSDD-1",
          description2:
            "Dissociative Identity Disorder (DID) involves two or more distinct personality states and recurrent gaps in memory about everyday events, personal information, and traumatic events. Other Specified Dissociative Disorder-1 (OSDD-1) is similar to DID but does not meet all its diagnostic criteria. OSDD-1 patients might have alters who are less distinct or experience less amnesia.",

          title3: "Other Dissociative Conditions",
          description3:
            "Beyond DID and OSDD-1, there are other dissociative conditions such as Dissociative Amnesia (inability to recall important personal information, usually of a traumatic or stressful nature), Depersonalization/Derealization Disorder (persistent or recurrent feelings of detachment from one’s self or surroundings), and Unspecified Dissociative Disorder (dissociative symptoms that don't fully align with the other specific diagnoses).",

          title4: "Resources and Support",
          description4:
            "For those seeking to understand or find support for dissociative systems, a variety of resources are available:",
          resources: [
            "[ISSTD – International Society for the Study of Trauma and Dissociation](https://www.isst-d.org/)",
            "[DID-Research](https://did-research.org/) – Comprehensive resource on DID and OSDD.",
            "[An Infinite Mind](http://www.aninfinitemind.com/) – Non-profit dedicated to raising awareness and providing support for those with DID.",
            "[The Healing Collective](https://www.healingcollectiveny.com/dissociative-identity-disorder) – Therapy and resources for trauma and dissociative disorders.",
            "[Beauty After Bruises](http://www.beautyafterbruises.org/) – A resource that provides support for complex trauma survivors, including those with DID.",
          ].join("\n"),
        },
      },
      {
        name: "Tone Tags",
        description: "Understanding and using tone tags",
        value: "tone_tags",
        emoji: "1201385635357917324", // Placeholder emoji, replace with actual emoji ID if needed
        info: {
          title: "What are Tone Tags?",
          description:
            "Tone tags are abbreviations at the end of sentences that provide clear cues about the sender's emotional or situational context, helping to clarify their intent in text-based communication. They are particularly useful in communities where misunderstanding the tone can lead to confusion or distress.",

          title2: "Examples",
          description2:
            "Some common examples: /s - sarcasm, /j - joking, /ser or /srs - serious, and /gen for genuine question. Full list: [here](https://tonetags.carrd.co/#masterlist)",

          title3: "Usage",
          description3:
            "Incorporating tone tags in messages can greatly reduce misinterpretation and foster a more understanding and inclusive communication environment. They are especially important in supporting neurodivergent individuals who may find tone more difficult to infer from text alone.",

          title4: "Resources",
          description4:
            "To learn more about tone tags and their importance in digital communication, consider these resources:",
          resources: [
            "[Autistic Self Advocacy Network](https://autisticadvocacy.org/) – Offers resources on understanding autism and could include information on communication strategies like tone tags.",
            "[NeuroClastic](https://neuroclastic.com/) – Provides articles and resources that discuss autism and may touch on communication aids like tone tags.",
          ].join("\n"),
        },
      },

      {
        name: "Triggers",
        description: "Understanding triggers and respectful discussion",
        value: "triggers",
        emoji: "1201388588949061642", // Placeholder emoji, replace with actual emoji ID if needed
        info: {
          title: "What are Triggers?",
          description:
            "Triggers invoke strong emotional responses, often due to past trauma or anxiety. Recognizing and respecting triggers is crucial for creating safe spaces, especially in digital environments where triggering content can appear without warning.",

          title2: "Identifying Triggers",
          description2:
            "Triggers vary widely among individuals and can include topics like violence, abuse, loss, or specific phobias. Understanding common triggers and asking about personal triggers in safe contexts can foster more supportive interactions.",

          title3: "Talking About Triggers",
          description3:
            "When discussing sensitive topics, use content warnings or trigger warnings to alert individuals about potential triggers. This allows people to prepare or choose not to engage with potentially distressing content.",

          title4: "Resources",
          description4:
            "For more information on understanding and managing triggers:",
          resources: [
            "[Mind – Understanding Triggers](https://www.mind.org.uk/information-support/types-of-mental-health-problems/self-harm/for-friends-and-family/)",
            "[The Mighty – How to Talk About Triggers](https://themighty.com/)",
          ].join("\n"),
        },
      },

      {
        name: "ADHD",
        description: "Learn about ADHD",
        value: "adhd",
        emoji: "1201386697309573201", // Placeholder emoji, replace with actual emoji ID if needed
        info: {
          title: "What is ADHD?",
          description:
            "ADHD is a neurodevelopmental disorder affecting both children and adults characterized by inattention, impulsivity, and hyperactivity. Understanding ADHD is crucial for empathy, support, and creating accommodating environments.",

          title2: "Symptoms",
          description2:
            "Common symptoms include difficulty focusing, hyperactivity, impulsivity, disorganization, and frequent mood swings. These symptoms can significantly impact daily functioning and relationships.",

          title3: "Support and Understanding",
          description3:
            "Supporting individuals with ADHD involves patience, structured environments, and sometimes, medication and therapy. Emphasizing strengths and accommodating needs can help manage ADHD symptoms effectively.",

          title4: "Resources",
          description4: "For further information and support on ADHD:",
          resources: [
            "[CHADD – Children and Adults with Attention-Deficit/Hyperactivity Disorder](https://chadd.org/)",
            "[ADDA – Attention Deficit Disorder Association](https://add.org/)",
          ].join("\n"),
        },
      },

      {
        name: "Autism",
        description: "Understanding Autism",
        value: "autism",
        emoji: "1201387909165613138", // Placeholder emoji, replace with actual emoji ID if needed
        info: {
          title: "What is Autism?",
          description:
            "Autism Spectrum Disorder (ASD) encompasses a range of neurodevelopmental conditions characterized by social communication challenges, repetitive behaviors, and unique strengths and differences.",

          title2: "Characteristics",
          description2:
            "Autistic individuals may experience varied communication, interaction, and sensory processing differences. These characteristics are intrinsic to the individual and require understanding and accommodation.",

          title3: "Supporting Autistic Individuals",
          description3:
            "Support includes fostering inclusive environments, offering clear communication, and valuing autistic individuals' perspectives. Recognizing and accommodating sensory preferences and communication styles is key.",

          title4: "Resources",
          description4: "For more information on autism and support:",
          resources: [
            "[Autism Speaks – Resource Guide](https://www.autismspeaks.org/resource-guide)",
            "[Autistic Self Advocacy Network](https://autisticadvocacy.org/)",
            "[The Asperger/Autism Network (AANE)](https://www.aane.org/)",
          ].join("\n"),
        },
      },
    ];

    const selectOptions = other.map((o) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(o.name)
        .setDescription(o.description)
        .setValue(o.value)
        .setEmoji(o.emoji)
    );

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("otherSelect")
      .setPlaceholder("Choose other here")
      .addOptions(selectOptions);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const embed = new EmbedBuilder()
      .setTitle("Learn about other common lgbtq termology here")
      .setDescription(`Below are common lgbtq terms`)
      .addFields({
        name: "Others",
        value: other.map((o) => `<:_:${o.emoji}> **${o.name}**`).join("\n"),
        inline: true,
      })
      .setColor("#FF00AE")
      .setTimestamp();

    function createOtherButtons(currentIndex) {
      const components = [];

      if (currentIndex > 0) {
        const prevOther = other[currentIndex - 1];
        const prevLabel = `${prevOther.name}`;
        const prevEmoji = `${prevOther.emoji}`;

        const prevButton = new ButtonBuilder()
          .setLabel(prevLabel)
          .setEmoji(prevEmoji)
          .setStyle(ButtonStyle.Secondary)
          .setCustomId(`other-${prevOther.value}`);
        components.push(prevButton);
      }

      if (currentIndex < other.length - 1) {
        const nextOther = other[currentIndex + 1];
        const nextLabel = `${nextOther.name}`;
        const nextEmoji = `${nextOther.emoji}`;

        const nextButton = new ButtonBuilder()
          .setLabel(nextLabel)
          .setEmoji(nextEmoji)
          .setStyle(ButtonStyle.Secondary)
          .setCustomId(`other-${nextOther.value}`);
        components.push(nextButton);
      }

      return components;
    }

    await interaction.reply({ embeds: [embed], components: [row] });

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
    });

    collector.on("collect", async (selectInteraction) => {
      if (selectInteraction.customId === "otherSelect") {
        const selectedValue = selectInteraction.values[0];
        const otherInfo = other.find((o) => o.value === selectedValue);

        if (!otherInfo) {
          console.error(`No information found for value: ${selectedValue}`);
          await selectInteraction.reply({
            content: "Sorry, an error occurred while fetching the information.",
            ephemeral: true,
          });
          return;
        }

        const currentIndex = other.indexOf(otherInfo);

        const selectedEmbed = new EmbedBuilder().setColor(0xff00ae).addFields(
          { name: otherInfo.info.title, value: otherInfo.info.description },
          { name: otherInfo.info.title2, value: otherInfo.info.description2 },
          { name: otherInfo.info.title3, value: otherInfo.info.description3 },
          {
            name: otherInfo.info.title4,
            value: `${otherInfo.info.description4}\n${otherInfo.info.resources}`,
          }
        );

        const buttons = createOtherButtons(currentIndex);
        const updatedRow = new ActionRowBuilder().addComponents(buttons);

        await selectInteraction.reply({
          embeds: [selectedEmbed],
          components: buttons.length > 0 ? [updatedRow] : [],
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
      const [, otherValue] = buttonInteraction.customId.split("-");
      const selectedOtherIndex = other.findIndex((o) => o.value === otherValue);
      const otherInfo = other[selectedOtherIndex];
      if (!otherInfo) {
        console.error(
          `No other information found for index: ${selectedOtherIndex}`
        );
        return;
      }

      const updatedEmbed = new EmbedBuilder().setColor(0xff00ae).addFields(
        { name: otherInfo.info.title, value: otherInfo.info.description },
        { name: otherInfo.info.title2, value: otherInfo.info.description2 },
        { name: otherInfo.info.title3, value: otherInfo.info.description3 },
        {
          name: otherInfo.info.title4,
          value: `${otherInfo.info.description4}\n${otherInfo.info.resources}`,
        }
      );

      const updatedButtons = createOtherButtons(selectedOtherIndex);
      const updatedRow = new ActionRowBuilder().addComponents(updatedButtons);

      buttonInteraction.update({
        embeds: [updatedEmbed],
        components: [updatedRow],
      });
    });
  },
};
