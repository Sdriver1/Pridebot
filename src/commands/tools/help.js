const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ComponentType,
} = require("discord.js");
const commandLogging = require("../../config/commandfunctions/commandlog");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows command list and helpful links"),

  async execute(interaction, client) {
    const helpOptions = [
      {
        name: "Fun",
        description: "Click to learn about fun commands",
        value: "fun",
        emoji: "1196254858689380474",
        info: {
          title: "Fun Commands",
          description: `</gaydar:1196256451270811688> - How gay are you or your friend? \n</lgbtq:1196151440343838849> - Fun little command to show off the LGBTQ command \n</nametester:1179995184059121766> - Use this to try out new names for yourselfs \n</pronountester:1179995184059121766> - Use this to try out new pronouns for yourself \n</transdar:1212227689008726048> -  How trans are you or your friend? \n\n-# - </gaydar:1196256451270811688> and </transdar:1212227689008726048> are for fun and not based on any real diagnosis/readings of users*`,
        },
      },
      {
        name: "Pride",
        description: "Click to learn about Pride commands",
        value: "pride",
        emoji: "1108822823721521242",
        info: {
          title: "Pride Commands",
          description: `</asexual:1216214492917010495> - Learn about term "asexual" and some brief history \n</bisexual:1183503172036206632> - Learn about term "bisexual" and some brief history \n</gay:1183468824478089246> - Learn about term "gay" and some brief history \n</genderfluid:1183503172036206632> - Learn about term "genderfluid" and some brief history \n</lesbian:1183468824478089247> - Learn about term "lesbian" and some brief history \n</nonbinary:1183503172036206633> Learn about term "non-binary" and some brief history \n</pansexual:1183503172036206634> - Learn about term "pansexual" and some brief history \n</pridemonth:1196149039431962644> - Learn about pride month and some brief history \n</queer:1196149039431962644> - Learn about term "queer" and some brief history \n</transgender:1183503172036206636> - Learn about term "transgender" and some brief history `,
        },
      },
      {
        name: "Profile",
        description: "Click to learn about Profile commands",
        value: "profile",
        emoji: "1197388214843998299",
        info: {
          title: "Profile Commands",
          description: `</profile edit:1197313708846743642> - Edit your profile \n</profile setup:1197313708846743642> - Setup your profile \n</profile view:1197313708846743642> - View your or another users profile \n</profile update:1197313708846743642> - Update the information in your profile`,
        },
      },
      {
        name: "Support",
        description: "Click to learn about Support commands",
        value: "support",
        emoji: "1197399653109473301",
        info: {
          title: "Support Commands",
          description: `</comingout:1176020092581060678> - Access tips and guides on how to come out to anyone \n</mentalhealth:1176262554071334994> - Access helplines and any mental health resources provided`,
        },
      },
      {
        name: "Terms",
        description: "Click to learn about Term commands",
        value: "term",
        emoji: "1112602480128299079",
        info: {
          title: "Term Commands",
          description: `</gender:1112200593310756874> - Learn about any kinds or types of genders \n </other:1201381458607099954> - Learn about other common terms associated with or normally found in LGBTQIA+ environments\n</pronouns:1111772157538730116> - Learn about any kinds or types of pronouns \n</sexuality:1111289006299283456> - Learn about any kinds or types of sexualities`,
        },
      },
      {
        name: "Tool",
        description: "Click to learn about Tool commands",
        value: "tool",
        emoji: "1112234548999245834",
        info: {
          title: "Tool Commands",
          description: `</bugreport:1176639348423266457> - Submit any bugs you find with Pridebot \n</feedback:1176639348423266456> - Submit any feedback you have on Pridebot \n</help:1112238192784048208> - Shows command list and helpful links \n</latest:1150993734180278353> - Get the bot's latest updates \n</partner:1198658480148586560> - Check out Pridebot partners \n</stats:1111290488897683579> - Get the bot's and discord stats \n</vote:1198664099752587375> - Support Pridebot by voting for us here`,
        },
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
        `Pridebot, developed by <@691506668781174824>, is a unique LGBTQIA themed bot designed to provide creditble and accurate information on LGBTQIA+ identities and terms but also to help users with discovering them through resources and interact commands. Pridebot offers a range of topics including different sexual orientations, gender identities, pronouns, and the intricate aspects of the LGBTQ community. Including the educational ascept, Pridebot also offers fun and cool commands like gaydar or profiles to help others learn about you. Thank you for using Pridebot :heart:`
      )
      .setColor(0xff00ae)
      .addFields(
        {
          name: "Help Categories",
          value:
            "**<:_:1196254858689380474> - Fun \n<:_:1108822823721521242> - Pride \n<:_:1197388214843998299> - Profile \n<:_:1197399653109473301> - Support \n<:_:1112602480128299079> - Terms \n<:_:1112234548999245834> - Tool**",
          inline: true,
        },
        {
          name: "Useful links",
          value:
            "<:Ic_Pridebot_logo:1108228682184654908> [**Website**](https://pridebot.xyz/) \n<:Ic_Pridebot_discord:1108417509624926228> [**Support Server**](https://pridebot.xyz/support) \n<:_:1176002361580331029> [**TOS**](https://pridebot.xyz/tos) \n<:_:1255012892206567476> [**Privacy Policy**](https://pridebot.xyz/privacy) \n:link: [**Bot Invite**](https://pridebot.xyz/invite) \n<:Ic_Pridebot_git:1110925802041774151> [**Github Repo**](https://github.com/Sdriver1/Pridebot)",
          inline: true,
        }
      );

    await interaction.reply({ embeds: [embed], components: [row] });
    await commandLogging(client, interaction);

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

        const selectedEmbed = new EmbedBuilder().setColor(0xff00ae).addFields({
          name: helpInfo.info.title,
          value: helpInfo.info.description,
        });

        selectInteraction.reply({
          embeds: [selectedEmbed],
          ephemeral: true,
        });
      }
    });
  },
};
