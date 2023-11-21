const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows command list and helpful links"),

  async execute(interaction, client) {

    const helpOptions = [
      {
        name: "Tool",
        description: "Click to learn about Tool commands",
        value: "tool",
        emoji: "1112234548999245834",
        info: {
          title: "Tool Commands",
          description: `</help:1112238192784048208> - Shows command list and helpful links \n</stats:1111290488897683579> - Get the bot's and discord stats \n</latest:1150993734180278353> - Get the bot's latest updates`
        },
      },
      {
        name: "Terms",
        description: "Click to learn about Term commands",
        value: "term",
        emoji: "1112602480128299079",
        info: {
          title: "Term Commands",
          description: `</gender:1112200593310756874> - Learn about any kinds or types of genders \n</pronouns:1111772157538730116> - Learn about any kinds or types of pronouns \n</sexuality:1111289006299283456> - Learn about any kinds or types of sexualities`,
        },
      },
      {
        name: "Pride",
        description: "Click to learn about Pride commands",
        value: "pride",
        emoji: "1108822823721521242",
        info: {
          title: "Pride Commands",
          description:  `</gay:1115861631226884107> - Learn about umbrella term "gay" and some brief history \n</lesbian:1115869305062576250> - Learn about term "lesbian" and some brief history`,
        }
      },
      {
        name: "Support",
        description: "Click to learn about Support commands",
        value: "support",
        emoji: "1176397678033240125",
        info: {
          title: "Support Commands",
          description: `</mentalhealth:1176262554071334994> - Access helplines and any mental health resources provided \n</comingout:1176020092581060678> - Access tips and guides on how to come out to anyone`,
        }
      },
    ];
    
      const selectOptions = helpOptions.map((option) =>
      new StringSelectMenuOptionBuilder()
        .setLabel(option.name)
        .setDescription(option.description)
        .setValue(option.value)
        .setEmoji(option.emoji)
    );
    
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("helpSelect")
      .setPlaceholder("What commands you want to learn about?")
      .addOptions(selectOptions);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    const embed = new EmbedBuilder()
      .setTitle(`Pridebot Help`)
      .setDescription(
        `Pridebot is a pride-themed bot developed by <@691506668781174824>. Its primary goal is to provide users with information about various sexualities, genders, pronouns, and other identities. The bot aims to educate users about LGBTQ identities and assist those questioning their own identities by offering unbiased and accurate information to help them understand themselves better.`
      )
      .setColor(0xff00ae)
      .addFields({
        name: "Useful links",
        value:
          "[**Support Server**](https://discord.gg/guybqSTzdS) \n[**Bot Invite**](https://discord.com/api/oauth2/authorize?client_id=1101256478632972369&permissions=415001594945&scope=bot%20applications.commands) \n[**Github Repo**](https://github.com/Sdriver1/Pridebot) \n[**Top.gg**](https://top.gg/bot/1101256478632972369?s=0bed0f7e006a2)",
      });

    await interaction.reply({ embeds: [embed], components: [row] });

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
    });

    collector.on("collect", (selectInteraction) => {
      if (selectInteraction.customId === "helpSelect") {
        const selectedValue = selectInteraction.values[0];
        const helpInfo = helpOptions.find((h) => h.value === selectedValue);

        if (!helpInfo) {
          console.error(
            `No gender information found for value: ${selectedValue}`
          );
          selectInteraction.reply({
            content:
              "Sorry, an error occurred while fetching help information.",
            ephemeral: true,
          });
          return; 
        }

        const selectedEmbed = new EmbedBuilder().setColor(0xff00ae).addFields(
          { name: helpInfo.info.title, value: helpInfo.info.description },
        );

        selectInteraction.reply({
          embeds: [selectedEmbed],
          ephemeral: true,
        });
      }
    });
  },
};
