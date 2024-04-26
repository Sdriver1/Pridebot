const {
  EmbedBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");
const Profile = require("../../../mongo/models/profileSchema");

const { botUser } = require("../../config/ids/botId");
const { devUsers } = require("../../config/ids/devId");
const { partnerUsers } = require("../../config/ids/partnerId");
const { supportUsers } = require("../../config/ids/supportId");
const { vipUsers } = require("../../config/ids/vipId");
const { oneYearUsers } = require("../../config/ids/oneyearId");

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
      let badgeStr = "";
      if (profile && profile.badgesVisible) {
        const badges = [];
        if (botUser.has(targetUserId)) {
          badges.push("<:Ic_Pridebot_logo:1108228682184654908> ");
        }
        if (devUsers.has(targetUserId)) {
          badges.push("<:Ic_Pridebot_dev:1195877037034983515> ");
        }
        if (supportUsers.has(targetUserId)) {
          badges.push("<:Ic_Pridebot_support:1197399653109473301> ");
        }
        if (vipUsers.has(targetUserId)) {
          badges.push("<:Ic_Pridebot_verified:1197328938788204586> ");
        }
        if (partnerUsers.has(targetUserId)) {
          badges.push("<:Ic_Pridebot_partner:1197394034310791272> ");
        }
        if (oneYearUsers.has(targetUser.id)) {
          badges.push("<:Ic_Pridebot_1y:1233274651153797120> ");
        }

        badgeStr = badges.join("");
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
      if (profile.bio) {
        profileFields.push({
          name: "Bio",
          value: profile.bio,
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
        .setColor(embedColor)
        .setTitle(`${targetUser.username}'s Profile ${badgeStr}`)
        .addFields(profileFields)
        .setThumbnail(targetUser.displayAvatarURL())
        .setFooter({ text: "Profile Information" })
        .setTimestamp();

      await interaction.reply({ embeds: [profileEmbed], ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.editReply(
        "An error occurred while fetching the profile."
      );
    }
  },
};
