const {
  EmbedBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");
const Profile = require("../../../mongo/models/profileSchema");
const IDLists = require("../../../mongo/models/idSchema");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("User Profile")
    .setType(ApplicationCommandType.User),

  async execute(interaction) {
    try {
      const targetUserId = interaction.targetId;
      const targetUser = await interaction.client.users.fetch(targetUserId);

      const profile = await Profile.findOne({ userId: targetUserId });

      if (!profile) {
        return interaction.reply({
          content: "This user doesn't have a profile set up yet.",
          ephemeral: true,
        });
      }

      const embedColor = profile.color || "#FF00EA";
      const idLists = await IDLists.findOne();
      let badgeStr = "";
      if (profile && profile.badgesVisible && idLists) {
        const badgesMap = {
          bot: "<:_:1108228682184654908> ",
          discord: "<:_:1108417509624926228> ",
          devs: "<:_:1195877037034983515> ",
          oneyear: "<:_:1233274651153797120> ",
          support: "<:_:1197399653109473301> ",
          vips: "<:_:1197328938788204586> ",
          partner: "<:_:1197394034310791272> ",
          donor: "<:_:1235074804726628465> ",
        };
        for (const [key, value] of Object.entries(badgesMap)) {
          if (idLists[key] && idLists[key].includes(targetUser.id)) {
            badgeStr += value;
          }
        }
      }

      const pronounsValue = profile.pronouns || "Not set";
      const otherPronounsValue = profile.otherPronouns
        ? `, ${profile.otherPronouns}`
        : "";
      const combinedPronouns =
        pronounsValue.includes("Not set") && otherPronounsValue
          ? otherPronounsValue.substring(2)
          : pronounsValue + otherPronounsValue;

      const sexualityValue = profile.sexuality || "Not set";
      const otherSexualityValue = profile.otherSexuality
        ? `, ${profile.otherSexuality}`
        : "";
      const combinedSexuality =
        sexualityValue.includes("Not set") && otherSexualityValue
          ? otherSexualityValue.substring(2)
          : sexualityValue + otherSexualityValue;

      const genderValue = profile.gender || "Not set";
      const otherGenderValue = profile.otherGender
        ? `, ${profile.otherGender}`
        : "";
      const combinedGender =
        genderValue.includes("Not set") && otherGenderValue
          ? otherGenderValue.substring(2)
          : genderValue + otherGenderValue;

      const profileFields = [
        {
          name: "Preferred Name",
          value: profile.preferredName || "Not set",
          inline: true,
        },
      ];
      if (profile.age) {
        profileFields.push({
          name: "Age",
          value: profile.age ? profile.age.toString() : "Not set",
          inline: true,
        });
      }
      if (profile.bio) {
        profileFields.push({
          name: "Bio",
          value: profile.bio ? profile.bio.replace(/\\n/g, "\n") : "Not set",
          inline: false,
        });
      }
      profileFields.push(
        {
          name: "Sexual Orientation",
          value: combinedSexuality,
          inline: true,
        },
        {
          name: "Romantic Orientation",
          value: profile.romanticOrientation || "Not set",
          inline: true,
        },
        { name: "Gender", value: combinedGender, inline: true },
        { name: "Pronouns", value: combinedPronouns, inline: true }
      );

      const profileEmbed = new EmbedBuilder()
        .setColor(`${embedColor}`)
        .setTitle(`${targetUser.username}'s Profile ${badgeStr}`)
        .addFields(profileFields)
        .setThumbnail(targetUser.displayAvatarURL())
        .setFooter({ text: "Profile Information" })
        .setTimestamp();

      if (profile.pronounpage) {
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Pronoun Page")
            .setStyle(ButtonStyle.Link)
            .setURL(profile.pronounpage)
        );

        return interaction.reply({ embeds: [profileEmbed], components: [row] });
      } else {
        return interaction.reply({ embeds: [profileEmbed] });
      }
    } catch (error) {
      console.error(error);
      await interaction.editReply(
        "An error occurred while fetching the profile."
      );
    }
  },
};
