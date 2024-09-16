const {
  SlashCommandBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");
const commandLogging = require("../../config/logging/commandlog");
const profileLogging = require("../../config/logging/profilelogging");
const chalk = require("chalk");

const Profile = require("../../../mongo/models/profileSchema");
const IDLists = require("../../../mongo/models/idSchema");

const {
  containsDisallowedContent,
} = require("../../config/detection/containDisallow");
const { scanText } = require("../../config/detection/perspective");

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
              { name: "fae/faer/faers", value: "fae/faer/faers" },
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
              { name: "fae/faer/faers", value: "fae/faer/faers" },
              { name: "xe/xem/xyr", value: "xe/xem/xyr" },
              { name: "ze/zir/zir", value: "ze/zir/zir" },
              { name: "other neopronouns", value: "other neopronouns" },
              { name: "None", value: "None" },
              { name: "Other", value: "Other" },
              { name: "Clear", value: "clear" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("pronounpage")
            .setDescription("A link to your pronoun page")
            .setRequired(false)
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
              { name: "fae/faer/faers", value: "fae/faer/faers" },
              { name: "xe/xem/xyr", value: "xe/xem/xyr" },
              { name: "ze/zir/zir", value: "ze/zir/zir" },
              { name: "other neopronouns", value: "other neopronouns" },
              { name: "None", value: "None" },
              { name: "Other", value: "Other" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("pronounpage")
            .setDescription("A link to your pronoun page")
            .setRequired(false)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("edit")
        .setDescription("Edit part of your profile")
        .addBooleanOption((option) =>
          option
            .setName("badgetoggle")
            .setDescription("Toggle badge visibility on your profile")
            .setRequired(false)
        )
        .addStringOption((option) =>
          option
            .setName("color")
            .setDescription(
              "Enter in valid hex code for custom color for your profile (#{your code}"
            )
            .setRequired(false)
        )
    ),

  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    const username = interaction.user.username;

    async function fetchProfileColor(userId) {
      const profile = await Profile.findOne({ userId: userId });
      return profile?.color || "#FF00EA";
    }

    function isValidPronounPageLink(link) {
      const regex = /^https:\/\/(en\.)?pronouns\.page\/@[\w-]+$/;
      return regex.test(link);
    }

    if (subcommand === "edit") {
      const userId = interaction.user.id;
      const colorInput = interaction.options.getString("color");
      const badgeToggle = interaction.options.getBoolean("badgetoggle");
      const originalProfile = await Profile.findOne({
        userId: interaction.user.id,
      });

      const updates = {};

      if (colorInput) {
        const color = colorInput.startsWith("#")
          ? colorInput
          : `#${colorInput}`;

        const isValidHex = /^#([0-9A-F]{3,6})$/i.test(color);
        if (!isValidHex) {
          return interaction.reply({
            content: "Please enter a valid hex code for the color.",
            ephemeral: true,
          });
        }

        updates.color = color;
      }

      if (badgeToggle !== null) {
        updates.badgesVisible = badgeToggle;
      }

      await Profile.findOneAndUpdate(
        { userId },
        { $set: updates },
        { new: true, upsert: false }
      );

      let responseMessage = "Your profile has been updated successfully!";
      if (colorInput && badgeToggle !== null) {
        responseMessage += " Color and badge visibility have been updated.";
      } else if (colorInput) {
        responseMessage += " Color has been updated.";
      } else if (badgeToggle !== null) {
        responseMessage = badgeToggle
          ? "Badges are now visible on your profile."
          : "Badges are now hidden from your profile.";
      }

      const updatedProfile = await Profile.findOne({
        userId: interaction.user.id,
      });

      await commandLogging(client, interaction);
      await profileLogging(
        client,
        interaction,
        "edited",
        originalProfile,
        updatedProfile
      );
      return interaction.reply({
        content: responseMessage,
        ephemeral: true,
      });
    } else if (subcommand === "view") {
      const targetUser =
        interaction.options.getUser("user") || interaction.user;
      const embedColor = await fetchProfileColor(targetUser.id);
      const profile = await Profile.findOne({ userId: targetUser.id });

      if (!profile) {
        return interaction.reply({
          content:
            targetUser.id === interaction.user.id
              ? "You have not set up a profile yet. Use </profile setup:1197313708846743642> to create one."
              : "This user doesn't have a profile set up yet.",
          ephemeral: true,
        });
      }

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

        await commandLogging(client, interaction);
        return interaction.reply({ embeds: [profileEmbed], components: [row] });
      } else {
        await commandLogging(client, interaction);
        return interaction.reply({ embeds: [profileEmbed] });
      }
    } else if (subcommand === "update") {
      const preferredName = interaction.options.getString("preferredname");
      const bio = interaction.options.getString("bio");

      const scoreupdate = await scanText(preferredName || bio);

      if (preferredName) {
        const result = await containsDisallowedContent(preferredName, username);
        if (result) {
          await sendFlagNotification(
            interaction,
            preferredName,
            subcommand,
            "Preferred Name"
          );
          return interaction.reply({
            content: "The preferred name contains disallowed content.",
            ephemeral: true,
          });
        }
      }

      if (bio) {
        const result = await containsDisallowedContent(bio, username);
        if (result) {
          await sendFlagNotification(interaction, bio, subcommand, "Bio");
          return interaction.reply({
            content: "The bio contains disallowed content.",
            ephemeral: true,
          });
        }
      }

      if (scoreupdate !== null) {
        const { toxicity, insult } = scoreupdate;
        if (toxicity > 0.65 || insult > 0.65) {
          console.log(
            chalk.yellowBright.bold(
              `⚠️  ${username} has been flagged for toxic or insulting content \nToxicity: ${(
                toxicity * 100
              ).toFixed(2)}% \nInsult: ${(insult * 100).toFixed(
                2
              )}% \nContent: "${preferredName || bio}"`
            )
          );
          await sendToxicNotification(
            interaction,
            toxicity,
            insult,
            preferredName,
            bio,
            subcommand
          );
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
      if (interaction.options.getString("pronounpage")) {
        const pronounpageLink = interaction.options.getString("pronounpage");
        if (!isValidPronounPageLink(pronounpageLink)) {
          return interaction.reply({
            content: "Please provide a valid Pronoun Page link.",
            ephemeral: true,
          });
        }
        updateData.pronounpage = pronounpageLink;
      }
      const updatedFields = {};
      for (const [key, value] of Object.entries(updateData)) {
        if (value !== null) {
          updatedFields[key] = value;
        }
      }

      const originalProfile = await Profile.findOne({
        userId: interaction.user.id,
      });
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

      const updatedProfile = await Profile.findOne({
        userId: interaction.user.id,
      });
      await commandLogging(client, interaction);
      await profileLogging(
        client,
        interaction,
        "edited",
        originalProfile,
        updatedProfile
      );
      return interaction.reply({
        content:
          "Your profile has been updated successfully! \nSee your new profile with </profile view:1197313708846743642>",
        ephemeral: true,
      });
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
        pronounpage: interaction.options.getString("pronounpage") || "",
      };

      const preferredName = interaction.options.getString("preferredname");
      const bio = interaction.options.getString("bio");

      const scoresetup = await scanText(preferredName || bio);

      if (preferredName) {
        const result = await containsDisallowedContent(preferredName, username);
        if (result) {
          await sendFlagNotification(
            interaction,
            preferredName,
            subcommand,
            "Preferred Name"
          );
          return interaction.reply({
            content: "The preferred name contains disallowed content.",
            ephemeral: true,
          });
        }
      }

      if (bio) {
        const result = await containsDisallowedContent(bio, username);
        if (result) {
          await sendFlagNotification(interaction, bio, subcommand, "Bio");
          return interaction.reply({
            content: "The bio contains disallowed content.",
            ephemeral: true,
          });
        }
      }

      if (scoresetup !== null) {
        const { toxicity, insult } = scoresetup;
        if (toxicity > 0.65 || insult > 0.65) {
          console.log(
            chalk.yellowBright.bold(
              `⚠️  ${username} has been flagged for toxic or insulting content \nToxicity: ${(
                toxicity * 100
              ).toFixed(2)}% \nInsult: ${(insult * 100).toFixed(
                2
              )}% \nContent: "${preferredName || bio}"`
            )
          );
          await sendToxicNotification(
            interaction,
            toxicity,
            insult,
            preferredName,
            bio,
            subcommand
          );
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

      if (interaction.options.getString("pronounpage")) {
        const pronounpageLink = interaction.options.getString("pronounpage");
        if (!isValidPronounPageLink(pronounpageLink)) {
          return interaction.reply({
            content: "Please provide a valid Pronoun Page link.",
            ephemeral: true,
          });
        }
        profileData.pronounpage = pronounpageLink;
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

      await commandLogging(client, interaction);
      const updatedProfile = await Profile.findOne({
        userId: interaction.user.id,
      });
      await profileLogging(
        client,
        interaction,
        "created",
        null,
        updatedProfile
      );
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

async function sendFlagNotification(
  interaction,
  flaggedContent,
  subcommand,
  contentType
) {
  const embed = new EmbedBuilder()
    .setColor("#FF00EA")
    .setTitle("<:_:1201388588949061642> Flagged Content Detected")
    .addFields(
      { name: "Username", value: interaction.user.tag, inline: true },
      { name: "User ID", value: interaction.user.id, inline: true },
      { name: "Command", value: subcommand, inline: true },
      { name: "Content Type", value: contentType, inline: true },
      { name: "Flagged Content", value: `||${flaggedContent}||`, inline: true }
    )
    .setTimestamp();

  const alertChannel = await interaction.client.channels.fetch(
    "1231591223337160715"
  );
  if (alertChannel) {
    alertChannel.send({ embeds: [embed] });
  }
}

async function sendToxicNotification(
  interaction,
  toxicity,
  insult,
  preferredName,
  bio,
  subcommand
) {
  const embed = new EmbedBuilder()
    .setColor("#FF00EA")
    .setTitle("<:_:1201388588949061642> Toxic/Insult Content Detected")
    .addFields(
      { name: "Username", value: interaction.user.tag, inline: true },
      { name: "User ID", value: interaction.user.id, inline: true },
      { name: "_ _", value: `_ _`, inline: true },
      { name: "Command", value: subcommand, inline: true },
      {
        name: "Flagged Content",
        value: `||${preferredName || bio}||`,
        inline: true,
      },
      { name: "_ _", value: `_ _`, inline: true },
      {
        name: "Toxicity Score",
        value: `Toxicity: ${(toxicity * 100).toFixed(2)}%`,
        inline: true,
      },
      {
        name: "Insult Score",
        value: `Insult: ${(insult * 100).toFixed(2)}%`,
        inline: true,
      }
    )
    .setTimestamp();

  const alertChannel = await interaction.client.channels.fetch(
    "1231591223337160715"
  );
  if (alertChannel) {
    alertChannel.send({ embeds: [embed] });
  }
}
