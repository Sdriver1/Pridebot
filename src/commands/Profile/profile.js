const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

const Profile = require("../../../mongo/models/profileSchema");

const { botUser } = require("../../config/ids/botId");
const { devUsers } = require("../../config/ids/devId");
const { partnerUsers } = require("../../config/ids/partnerId");
const { supportUsers } = require("../../config/ids/supportId");
const { vipUsers } = require("../../config/ids/vipId");

const {
  containsDisallowedContent,
} = require("../../config/blacklist/detection/containDisallow");
const { scanText } = require("../../config/blacklist/detection/perspective");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Displays, updates, or sets up your profile")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("view")
        .setDescription("View your or someone else's profile")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("The user whose profile you want to view")
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("update")
        .setDescription("Update your profile")
        .addStringOption((option) =>
          option
            .setName("preferredname")
            .setDescription("Your preferred name")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("bio")
            .setDescription("Your bio")
            .setMaxLength(1024)
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("sexuality")
            .setDescription("Your sexual orientation")
            .setRequired(false)
            .addChoices(
              { name: "Asexual", value: "Asexual" },
              { name: "Bisexual", value: "Bisexual" },
              { name: "Demisexual", value: "Demisexual" },
              { name: "Heterosexual ", value: "Heterosexual" },
              { name: "Homosexual/Gay", value: "Gay" },
              { name: "Homosexual/Lesbian", value: "Lesbian" },
              { name: "Omnisexual", value: "Omnisexual" },
              { name: "Pansexual", value: "Pansexual" },
              { name: "Polyamorous", value: "Polyamorous" },
              { name: "Queer", value: "Queer" },
              { name: "Unlabeled", value: "Unlabeled" },
              { name: "Other", value: "Other" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("romantic")
            .setDescription("Your romantic orientation")
            .setRequired(false)
            .addChoices(
              { name: "Aromantic", value: "Aromantic" },
              { name: "Biromantic", value: "Biromantic" },
              { name: "Demiromantic", value: "Demiromantic" },
              { name: "Heteroromantic", value: "Heteroromantic" },
              { name: "Homoromantic", value: "Homoromantic" },
              { name: "Omniromantic", value: "Omniromantic" },
              { name: "Panromantic", value: "Panromantic" },
              { name: "Unlabeled", value: "Unlabeled" },
              { name: "Other", value: "Other" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("gender")
            .setDescription("Your gender")
            .setRequired(false)
            .addChoices(
              { name: "Agender", value: "Agender" },
              { name: "Androgyne", value: "Androgyne" },
              { name: "Bigender/Trigender", value: "Bigender/Trigender" },
              { name: "Cis-male", value: "Cis-male" },
              { name: "Cis-female", value: "Cis-female" },
              { name: "Demi-boy", value: "Demi-boy" },
              { name: "Demi-girl", value: "Demi-girl" },
              { name: "Genderfaun", value: "Genderfaun" },
              { name: "Genderfluid", value: "Genderfluid" },
              { name: "Genderflux", value: "Genderflux" },
              { name: "Genderqueer", value: "Genderqueer" },
              { name: "Non-Binary", value: "Non-Binary" },
              { name: "Pangender", value: "Pangender" },
              { name: "Transgender", value: "Transgender" },
              { name: "Xenogender", value: "Xenogender" },
              { name: "Unlabeled", value: "Unlabeled" },
              { name: "Other", value: "Other" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("pronouns")
            .setDescription("Your pronouns")
            .setRequired(false)
            .addChoices(
              { name: "He/Him/His", value: "He/Him/His" },
              { name: "She/Her/Hers", value: "She/Her/Hers" },
              { name: "They/Them/Their", value: "They/Them/Their" },
              { name: "It/Its", value: "It/Its" },
              { name: "He/They", value: "He/They" },
              { name: "She/They", value: "She/They" },
              { name: "It/They", value: "It/They" },
              { name: "Any Pronouns", value: "Any Pronouns" },
              { name: "ey/em/eir", value: "ey/em/eir" },
              { name: "fae/faer/faer", value: "fae/faer/faer" },
              { name: "xe/xem/xyr", value: "xe/xem/xyr" },
              { name: "ze/zir/zir", value: "ze/zir/zir" },
              { name: "other neopronouns", value: "other neopronouns" },
              { name: "None", value: "None" },
              { name: "Other", value: "Other" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("other_sexuality")
            .setDescription("Another sexual orientation")
            .setRequired(false)
            .addChoices(
              { name: "Asexual", value: "Asexual" },
              { name: "Bisexual", value: "Bisexual" },
              { name: "Demisexual", value: "Demisexual" },
              { name: "Heterosexual ", value: "Heterosexual" },
              { name: "Homosexual/Gay", value: "Gay" },
              { name: "Homosexual/Lesbian", value: "Lesbian" },
              { name: "Omnisexual", value: "Omnisexual" },
              { name: "Pansexual", value: "Pansexual" },
              { name: "Polyamorous", value: "Polyamorous" },
              { name: "Queer", value: "Queer" },
              { name: "Unlabeled", value: "Unlabeled" },
              { name: "Other", value: "Other" },
              { name: "Clear", value: "clear" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("other_gender")
            .setDescription("Another gender")
            .setRequired(false)
            .addChoices(
              { name: "Agender", value: "Agender" },
              { name: "Androgyne", value: "Androgyne" },
              { name: "Bigender/Trigender", value: "Bigender/Trigender" },
              { name: "Cis-male", value: "Cis-male" },
              { name: "Cis-female", value: "Cis-female" },
              { name: "Demi-boy", value: "Demi-boy" },
              { name: "Demi-girl", value: "Demi-girl" },
              { name: "Genderfaun", value: "Genderfaun" },
              { name: "Genderfluid", value: "Genderfluid" },
              { name: "Genderflux", value: "Genderflux" },
              { name: "Genderqueer", value: "Genderqueer" },
              { name: "Non-Binary", value: "Non-Binary" },
              { name: "Pangender", value: "Pangender" },
              { name: "Transgender", value: "Transgender" },
              { name: "Xenogender", value: "Xenogender" },
              { name: "Unlabeled", value: "Unlabeled" },
              { name: "Other", value: "Other" },
              { name: "Clear", value: "clear" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("other_pronouns")
            .setDescription("add another set of pronouns")
            .setRequired(false)
            .addChoices(
              { name: "He/Him/His", value: "He/Him/His" },
              { name: "She/Her/Hers", value: "She/Her/Hers" },
              { name: "They/Them/Their", value: "They/Them/Their" },
              { name: "It/Its", value: "It/Its" },
              { name: "He/They", value: "He/They" },
              { name: "She/They", value: "She/They" },
              { name: "It/They", value: "It/They" },
              { name: "Any Pronouns", value: "Any Pronouns" },
              { name: "ey/em/eir", value: "ey/em/eir" },
              { name: "fae/faer/faer", value: "fae/faer/faer" },
              { name: "xe/xem/xyr", value: "xe/xem/xyr" },
              { name: "ze/zir/zir", value: "ze/zir/zir" },
              { name: "other neopronouns", value: "other neopronouns" },
              { name: "None", value: "None" },
              { name: "Other", value: "Other" },
              { name: "Clear", value: "clear" }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("setup")
        .setDescription("Set up your profile")
        .addStringOption((option) =>
          option
            .setName("preferredname")
            .setDescription("Your preferred name")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("bio")
            .setDescription("Your bio")
            .setMaxLength(1024)
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("sexuality")
            .setDescription("Your sexual orientation")
            .setRequired(true)
            .addChoices(
              { name: "Asexual", value: "Asexual" },
              { name: "Bisexual", value: "Bisexual" },
              { name: "Demisexual", value: "Demisexual" },
              { name: "Heterosexual ", value: "Heterosexual" },
              { name: "Homosexual/Gay", value: "Gay" },
              { name: "Homosexual/Lesbian", value: "Lesbian" },
              { name: "Omnisexual", value: "Omnisexual" },
              { name: "Pansexual", value: "Pansexual" },
              { name: "Polyamorous", value: "Polyamorous" },
              { name: "Queer", value: "Queer" },
              { name: "Unlabeled", value: "Unlabeled" },
              { name: "Other", value: "Other" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("romantic")
            .setDescription("Your romantic orientation")
            .setRequired(true)
            .addChoices(
              { name: "Aromantic", value: "Aromantic" },
              { name: "Biromantic", value: "Biromantic" },
              { name: "Demiromantic", value: "Demiromantic" },
              { name: "Heteroromantic", value: "Heteroromantic" },
              { name: "Homoromantic", value: "Homoromantic" },
              { name: "Omniromantic", value: "Omniromantic" },
              { name: "Panromantic", value: "Panromantic" },
              { name: "Unlabeled", value: "Unlabeled" },
              { name: "Other", value: "Other" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("gender")
            .setDescription("Your gender")
            .setRequired(true)
            .addChoices(
              { name: "Agender", value: "Agender" },
              { name: "Androgyne", value: "Androgyne" },
              { name: "Bigender/Trigender", value: "Bigender/Trigender" },
              { name: "Cis-male", value: "Cis-male" },
              { name: "Cis-female", value: "Cis-female" },
              { name: "Demi-boy", value: "Demi-boy" },
              { name: "Demi-girl", value: "Demi-girl" },
              { name: "Genderfaun", value: "Genderfaun" },
              { name: "Genderfluid", value: "Genderfluid" },
              { name: "Genderflux", value: "Genderflux" },
              { name: "Genderqueer", value: "Genderqueer" },
              { name: "Non-Binary", value: "Non-Binary" },
              { name: "Pangender", value: "Pangender" },
              { name: "Transgender", value: "Transgender" },
              { name: "Xenogender", value: "Xenogender" },
              { name: "Unlabeled", value: "Unlabeled" },
              { name: "Other", value: "Other" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("pronouns")
            .setDescription("Your pronouns")
            .setRequired(true)
            .addChoices(
              { name: "He/Him/His", value: "He/Him/His" },
              { name: "She/Her/Hers", value: "She/Her/Hers" },
              { name: "They/Them/Their", value: "They/Them/Their" },
              { name: "It/Its", value: "It/Its" },
              { name: "He/They", value: "He/They" },
              { name: "She/They", value: "She/They" },
              { name: "It/They", value: "It/They" },
              { name: "Any Pronouns", value: "Any Pronouns" },
              { name: "ey/em/eir", value: "ey/em/eir" },
              { name: "fae/faer/faer", value: "fae/faer/faer" },
              { name: "xe/xem/xyr", value: "xe/xem/xyr" },
              { name: "ze/zir/zir", value: "ze/zir/zir" },
              { name: "other neopronouns", value: "other neopronouns" },
              { name: "None", value: "None" },
              { name: "Other", value: "Other" }
            )
        )
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const username = interaction.user.username;
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/profile ${subcommand} \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    if (subcommand === "view") {
      const targetUser =
        interaction.options.getUser("user") || interaction.user;
      const profile = await Profile.findOne({
        userId: targetUser.id,
      });

      if (!profile) {
        return interaction.reply({
          content:
            targetUser.id === interaction.user.id
              ? "You have not set up a profile yet. Use </profile setup:1197313708846743642> to create one."
              : "This user doesn't have a profile set up yet.",
          ephemeral: true,
        });
      }

      const badges = [];
      if (botUser.has(targetUser.id)) {
        badges.push("<:Ic_Pridebot_logo:1108228682184654908> ");
      }
      if (devUsers.has(targetUser.id)) {
        badges.push("<:Ic_Pridebot_dev:1195877037034983515> ");
      }
      if (supportUsers.has(targetUser.id)) {
        badges.push("<:Ic_Pridebot_support:1197399653109473301> ");
      }
      if (vipUsers.has(targetUser.id)) {
        badges.push("<:Ic_Pridebot_verified:1197328938788204586> ");
      }
      if (partnerUsers.has(targetUser.id)) {
        badges.push("<:Ic_Pridebot_partner:1197394034310791272> ");
      }

      const badgeStr = badges.join("");

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
        .setColor("#FF00EA")
        .setTitle(`${targetUser.username}'s Profile ${badgeStr}`)
        .addFields(profileFields)
        .setThumbnail(targetUser.displayAvatarURL())
        .setFooter({ text: "Profile Information" })
        .setTimestamp();
      return interaction.reply({ embeds: [profileEmbed] });

      //------------------------ Separator ---------------------------- //
    } else if (subcommand === "update") {
      const preferredName = interaction.options.getString("preferredname");
      const bio = interaction.options.getString("bio");
      const scoreupdate = await scanText(preferredName || bio);

      if (preferredName && containsDisallowedContent(preferredName, username)) {
        return interaction.reply({
          content: "The preferred name contains disallowed content.",
          ephemeral: true,
        });
      }

      if (bio && containsDisallowedContent(bio, username)) {
        return interaction.reply({
          content: "The bio contains disallowed content.",
          ephemeral: true,
        });
      }

      if (scoreupdate !== null) {
        const { toxicity, insult } = scoreupdate;
        if (toxicity > 0.75 || insult > 0.75) {
          console.log(chalk.yellowBright.bold(
            `⚠️  ${username} has been flagged for toxic or insulting content \nToxicity: ${(
              toxicity * 100
            ).toFixed(2)}% \nInsult: ${(insult * 100).toFixed(
              2
            )}% \nContent: "${preferredName || bio}"`
          ));
          return interaction.reply({
            content:
              "Your message has been flagged for high toxicity or insult.",
            ephemeral: true,
          });
        }
      } else {
        return interaction.reply({
          content:
            "There was an error analyzing your message. Please try again.",
          ephemeral: true,
        });
      }

      const updateData = {};
      if (interaction.options.getString("preferredname"))
        updateData.preferredName =
          interaction.options.getString("preferredname");
      if (interaction.options.getString("bio"))
        updateData.bio = interaction.options.getString("bio");
      if (interaction.options.getString("sexuality"))
        updateData.sexuality = interaction.options.getString("sexuality");
      if (interaction.options.getString("romantic"))
        updateData.romanticOrientation =
          interaction.options.getString("romantic");
      if (interaction.options.getString("gender"))
        updateData.gender = interaction.options.getString("gender");
      if (interaction.options.getString("pronouns"))
        updateData.pronouns = interaction.options.getString("pronouns");
      if (interaction.options.getString("other_sexuality") === "clear") {
        updateData.otherSexuality = "";
      } else if (interaction.options.getString("other_sexuality")) {
        updateData.otherSexuality =
          interaction.options.getString("other_sexuality");
      }
      if (interaction.options.getString("other_gender") === "clear") {
        updateData.otherGender = "";
      } else if (interaction.options.getString("other_gender")) {
        updateData.otherGender = interaction.options.getString("other_gender");
      }
      if (interaction.options.getString("other_pronouns") === "clear") {
        updateData.otherPronouns = "";
      } else if (interaction.options.getString("other_pronouns")) {
        updateData.otherPronouns =
          interaction.options.getString("other_pronouns");
      }
      const updatedFields = {};
      for (const [key, value] of Object.entries(updateData)) {
        if (value !== null) {
          updatedFields[key] = value;
        }
      }

      const profile = await Profile.findOneAndUpdate(
        { userId: interaction.user.id },
        { $set: updatedFields },
        { new: true, upsert: false }
      );

      if (!profile) {
        return interaction.reply({
          content:
            "You have not set up a profile yet. Use </profile setup:1197313708846743642> to create one.",
          ephemeral: true,
        });
      }

      return interaction.reply({
        content:
          "Your profile has been updated successfully! \nSee your new profile with </profile view:1197313708846743642>",
        ephemeral: true,
      });

      //------------------------ Separator ---------------------------- //
    } else if (subcommand === "setup") {
      const existingProfile = await Profile.findOne({
        userId: interaction.user.id,
      });

      if (existingProfile) {
        return interaction.reply({
          content:
            "Account already made, use </profile view:1197313708846743642> to see your profile",
          ephemeral: true,
        });
      }
      const profileData = {
        userId: interaction.user.id,
        preferredName: interaction.options.getString("preferredname") || "",
        bio: interaction.options.getString("bio") || "",
        sexuality: interaction.options.getString("sexuality") || "",
        romanticOrientation: interaction.options.getString("romantic") || "",
        gender: interaction.options.getString("gender") || "",
        pronouns: interaction.options.getString("pronouns") || "",
      };

      const preferredName = interaction.options.getString("preferredname");
      const bio = interaction.options.getString("bio");
      const scoresetup = await scanText(preferredName || bio);

      if (preferredName && containsDisallowedContent(preferredName, username)) {
        return interaction.reply({
          content: "The preferred name contains disallowed content.",
          ephemeral: true,
        });
      }

      if (bio && containsDisallowedContent(bio, username)) {
        return interaction.reply({
          content: "The bio contains disallowed content.",
          ephemeral: true,
        });
      }

      if (scoresetup !== null) {
        const { toxicity, insult } = scoresetup;
        if (toxicity > 0.75 || insult > 0.75) {
          console.log(chalk.yellowBright.bold(
            `⚠️  ${username} has been flagged for toxic or insulting content \nToxicity: ${(
              toxicity * 100
            ).toFixed(2)}% \nInsult: ${(insult * 100).toFixed(
              2
            )}% \nContent: "${preferredName || bio}"`
          ));
          return interaction.reply({
            content:
              "Your message has been flagged for high toxicity or insult.",
            ephemeral: true,
          });
        }
      } else {
        return interaction.reply({
          content:
            "There was an error analyzing your message. Please try again.",
          ephemeral: true,
        });
      }

      const newProfile = await Profile.create(profileData);

      const fieldsToAdd = [
        {
          name: "Preferred Name",
          value: newProfile.preferredName || "Not set",
          inline: true,
        },
        {
          name: "Bio",
          value: newProfile.bio,
          inline: true,
        },
        {
          name: "Sexual Orientation",
          value: newProfile.sexuality || "Not set",
          inline: true,
        },
        {
          name: "Romantic Orientation",
          value: newProfile.romanticOrientation || "Not set",
          inline: true,
        },
        {
          name: "Gender",
          value: newProfile.gender || "Not set",
          inline: true,
        },
        {
          name: "Pronouns",
          value: newProfile.pronouns || "Not set",
          inline: true,
        },
      ];

      const profileEmbed = new EmbedBuilder()
        .setColor("#FF00EA")
        .setTitle(`${interaction.user.username} Profile Setup`)
        .addFields(fieldsToAdd)
        .setThumbnail(interaction.user.displayAvatarURL())
        .setFooter({ text: "Profile Setup Complete" })
        .setTimestamp();
      return interaction.reply({
        content:
          "Your profile has been created successfully! \nSee your new profile with </profile view:1197313708846743642> \nTo update anything or add multiple pronoun, gender, sexuality or a bio, please use </profile update:1197313708846743642>",
        embeds: [profileEmbed],
        ephemeral: true,
      });
    } else {
      return interaction.reply({
        content: "Unknown subcommand used.",
        ephemeral: true,
      });
    }
  },
};
