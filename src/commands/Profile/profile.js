const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");
const Profile = require("../../../mongo/models/profileSchema");

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
              { name: "Aromantic", value: "Asexual" },
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
              { name: "She/Her/Hers", value: "shh" },
              { name: "They/Them/Their", value: "ttt" },
              { name: "It/Its", value: "ii" },
              { name: "He/They", value: "ht" },
              { name: "She/They", value: "st" },
              { name: "It/They", value: "it" },
              { name: "Any Pronouns", value: "any" },
              { name: "ey/em/eir", value: "eee" },
              { name: "fae/faer/faer", value: "fff" },
              { name: "xe/xem/xyr", value: "xxx" },
              { name: "ze/zir/zir", value: "zzz" },
              { name: "other neopronouns", value: "on" },
              { name: "Unlabeled", value: "upro" },
              { name: "Other", value: "opro" }
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
              { name: "Aromantic", value: "Asexual" },
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
              { name: "She/Her/Hers", value: "shh" },
              { name: "They/Them/Their", value: "ttt" },
              { name: "It/Its", value: "ii" },
              { name: "He/They", value: "ht" },
              { name: "She/They", value: "st" },
              { name: "It/They", value: "it" },
              { name: "Any Pronouns", value: "any" },
              { name: "ey/em/eir", value: "eee" },
              { name: "fae/faer/faer", value: "fff" },
              { name: "xe/xem/xyr", value: "xxx" },
              { name: "ze/zir/zir", value: "zzz" },
              { name: "other neopronouns", value: "on" },
              { name: "Unlabeled", value: "upro" },
              { name: "Other", value: "opro" }
            )
        )
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const estDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log(
      chalk.white.bold(
        `-------------------------- \n/profile ${subcommand} \nServer: ${interaction.guild.name} (${interaction.guild.id}) \nUser: ${interaction.user.tag} (${interaction.user.id}) \nTime: ${estDate} (EST) \n--------------------------`
      )
    );

    const specialUsers = new Set(["691506668781174824"]); // IDs of special users
    const vipUsers = new Set([
      "691506668781174824",
      "897235561092378625",
      "1161438276968775681",
    ]); // IDs of VIP users

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

      // Check if the user is a special user and add an emote to the title
      const isDev = specialUsers.has(targetUser.id);
      const isVip = vipUsers.has(targetUser.id);
      const devEmote = isDev ? "<:Ic_Pridebot_dev:1195877037034983515>" : ""; // Emote for developers
      const vipEmote = isVip
        ? "<:Ic_Pridebot_verified:1197328938788204586>"
        : ""; // Checkmark for VIP users
      const title = `${targetUser.username}'s Profile ${devEmote} ${vipEmote}`;

      const profileEmbed = new EmbedBuilder()
        .setColor("#FF00EA")
        .setTitle(title)
        .addFields(
          {
            name: "Preferred Name",
            value: profile.preferredName || "Not set",
            inline: true,
          },
          {
            name: "Sexual Orientation",
            value: profile.sexuality || "Not set",
            inline: true,
          },
          {
            name: "Romantic Orientation",
            value: profile.romanticOrientation || "Not set",
            inline: true,
          },
          { name: "Gender", value: profile.gender || "Not set", inline: true },
          {
            name: "Pronouns",
            value: profile.pronouns || "Not set",
            inline: true,
          }
        )
        .setThumbnail(targetUser.displayAvatarURL())
        .setFooter({ text: "Profile Information" })
        .setTimestamp();
      return interaction.reply({ embeds: [profileEmbed] });
    } else if (subcommand === "update") {
      const updateData = {};
      if (interaction.options.getString("preferredname"))
        updateData.preferredName =
          interaction.options.getString("preferredname");
      if (interaction.options.getString("sexuality"))
        updateData.sexuality = interaction.options.getString("sexuality");
      if (interaction.options.getString("romantic"))
        updateData.romanticOrientation =
          interaction.options.getString("romantic");
      if (interaction.options.getString("gender"))
        updateData.gender = interaction.options.getString("gender");
      if (interaction.options.getString("pronouns"))
        updateData.pronouns = interaction.options.getString("pronouns");

      // Ensure that we only update the fields provided by the user
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
          "Your profile has been updated successfully! See your new profile with </profile view:1197313708846743642>",
        ephemeral: true,
      });
    } else if (subcommand === "setup") {
      const existingProfile = await Profile.findOne({
        userId: interaction.user.id,
      });

      // If the profile exists, return a message to the user
      if (existingProfile) {
        return interaction.reply({
          content:
            "Account already made, use </profile view:1197313708846743642> to see your profile", // Replace COMMAND_ID with your actual command ID
          ephemeral: true,
        });
      }
      const profileData = {
        userId: interaction.user.id,
        name: interaction.options.getString("name"),
        preferredName: interaction.options.getString("preferredname") || "",
        sexuality: interaction.options.getString("sexuality") || "",
        romanticOrientation: interaction.options.getString("romantic") || "",
        gender: interaction.options.getString("gender") || "",
        pronouns: interaction.options.getString("pronouns") || "",
      };

      const newProfile = await Profile.create(profileData);

      const profileEmbed = new EmbedBuilder()
        .setColor("#FF00EA")
        .setTitle(`${interaction.user.username} Profile Setup`)
        .addFields(
          {
            name: "Preferred Name",
            value: newProfile.preferredName || "Not set",
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
          }
        )
        .setThumbnail(interaction.user.displayAvatarURL())
        .setFooter({ text: "Profile Setup Complete" })
        .setTimestamp();
      return interaction.reply({
        content:
          "Your profile has been created successfully! See your new profile with </profile view:1197313708846743642> and to update anything, please use </profile update:1197313708846743642>",
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
