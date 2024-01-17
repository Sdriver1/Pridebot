const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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
              { name: "Asexual", value: "as" },
              { name: "Bisexual", value: "bs" },
              { name: "Demisexual", value: "ds" },
              { name: "Heterosexual ", value: "" },
              { name: "Homosexual/Gay", value: "hg" },
              { name: "Homosexual/Lesbian", value: "hl" },
              { name: "Omnisexual", value: "os" },
              { name: "Pansexual", value: "ps" },
              { name: "Polyamorous", value: "pl" },
              { name: "Queer", value: "q" },
              { name: "Unlabeled", value: "usex" },
              { name: "Other", value: "osex" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("romantic")
            .setDescription("Your romantic orientation")
            .setRequired(false)
            .addChoices(
              { name: "Aromantic", value: "ar" },
              { name: "Biromantic", value: "br" },
              { name: "Demiromantic", value: "dr" },
              { name: "Heteroromantic", value: "hr" },
              { name: "Homoromantic", value: "hor" },
              { name: "Omniromantic", value: "or" },
              { name: "Panromantic", value: "pr" },
              { name: "Unlabeled", value: "urom" },
              { name: "Other", value: "orom" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("gender")
            .setDescription("Your gender")
            .setRequired(false)
            .addChoices(
              { name: "Agender", value: "ag" },
              { name: "Androgyne", value: "ang" },
              { name: "Bigender/Trigender", value: "btg" },
              { name: "Cis-male", value: "cm" },
              { name: "Cis-female", value: "cf" },
              { name: "Demi-boy", value: "db" },
              { name: "Demi-girl", value: "dg" },
              { name: "Genderfaun", value: "gfa" },
              { name: "Genderfluid", value: "gfd" },
              { name: "Genderflux", value: "gfx" },
              { name: "Genderqueer", value: "gq" },
              { name: "Non-Binary", value: "nb" },
              { name: "Pangender", value: "pg" },
              { name: "Transgender", value: "tg" },
              { name: "Xenogender", value: "xg" },
              { name: "Unlabeled", value: "ugen" },
              { name: "Other", value: "ogen" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("pronouns")
            .setDescription("Your pronouns")
            .setRequired(false)
            .addChoices(
              { name: "He/Him/His", value: "hhh" },
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
              { name: "Asexual", value: "sas" },
              { name: "Bisexual", value: "sbs" },
              { name: "Demisexual", value: "sds" },
              { name: "Heterosexual ", value: "shs" },
              { name: "Homosexual/Gay", value: "shg" },
              { name: "Homosexual/Lesbian", value: "shl" },
              { name: "Omnisexual", value: "sos" },
              { name: "Pansexual", value: "sps" },
              { name: "Polyamorous", value: "spl" },
              { name: "Queer", value: "sq" },
              { name: "Unlabeled", value: "susex" },
              { name: "Other", value: "sosex" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("romantic")
            .setDescription("Your romantic orientation")
            .setRequired(true)
            .addChoices(
              { name: "Aromantic", value: "sar" },
              { name: "Biromantic", value: "sbr" },
              { name: "Demiromantic", value: "sdr" },
              { name: "Heteroromantic", value: "shr" },
              { name: "Homoromantic", value: "shor" },
              { name: "Omniromantic", value: "sor" },
              { name: "Panromantic", value: "spr" },
              { name: "Unlabeled", value: "surom" },
              { name: "Other", value: "sorom" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("gender")
            .setDescription("Your gender")
            .setRequired(true)
            .addChoices(
              { name: "Agender", value: "sag" },
              { name: "Androgyne", value: "sang" },
              { name: "Bigender/Trigender", value: "sbtg" },
              { name: "Cis-male", value: "scm" },
              { name: "Cis-female", value: "scf" },
              { name: "Demi-boy", value: "sdb" },
              { name: "Demi-girl", value: "sdg" },
              { name: "Genderfaun", value: "sgfa" },
              { name: "Genderfluid", value: "sgfd" },
              { name: "Genderflux", value: "sgfx" },
              { name: "Genderqueer", value: "sgq" },
              { name: "Non-Binary", value: "snb" },
              { name: "Pangender", value: "spg" },
              { name: "Transgender", value: "stg" },
              { name: "Xenogender", value: "sxg" },
              { name: "Unlabeled", value: "sugen" },
              { name: "Other", value: "sogen" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("pronouns")
            .setDescription("Your pronouns")
            .setRequired(true)
            .addChoices(
              { name: "He/Him/His", value: "shhh" },
              { name: "She/Her/Hers", value: "sshh" },
              { name: "They/Them/Their", value: "sttt" },
              { name: "It/Its", value: "sii" },
              { name: "He/They", value: "sht" },
              { name: "She/They", value: "sst" },
              { name: "It/They", value: "it" },
              { name: "Any Pronouns", value: "sany" },
              { name: "ey/em/eir", value: "seee" },
              { name: "fae/faer/faer", value: "sfff" },
              { name: "xe/xem/xyr", value: "sxxx" },
              { name: "ze/zir/zir", value: "szzz" },
              { name: "other neopronouns", value: "son" },
              { name: "Unlabeled", value: "supro" },
              { name: "Other", value: "sopro" }
            )
        )
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "view") {
      const targetUser =
        interaction.options.getUser("user") || interaction.user;
      const profile = await Profile.findOne({
        userId: targetUser.id,
      });

      if (!profile) {
        return interaction.reply(
          targetUser.id === interaction.user.id
            ? "You have not set up a profile yet. Use /profile setup to create one."
            : `This user doesn't have a profile set up yet.`
        );
      }

      const profileEmbed = new EmbedBuilder()
        .setColor("#FF00EA")
        .setTitle(`${targetUser.username}'s Profile`)
        .addFields(
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
        .setThumbnail(interaction.user.displayAvatarURL())
        .setFooter({ text: "Profile Information" })
        .setTimestamp();
      return interaction.reply({ embeds: [profileEmbed] });
    } else if (subcommand === "update") {
      const updateData = {
          preferredName: interaction.options.getString("preferredname"),
          sexuality: interaction.options.getString("sexuality"),
          romanticOrientation: interaction.options.getString("romantic"),
          gender: interaction.options.getString("gender"),
          pronouns: interaction.options.getString("pronouns")
      };

      // Filter out undefined values
      const updatedFields = Object.fromEntries(
          Object.entries(updateData).filter(([_, v]) => v != null)
      );

      await Profile.findOneAndUpdate(
          { userId: interaction.user.id },
          { $set: updatedFields },
          { new: true, upsert: false }
      );

      if (!Profile) {
        return interaction.reply(
          "Profile not found. Please set up your profile first using /profile setup."
        );
      }

      return interaction.reply("Your profile has been updated successfully!");
    } else if (subcommand === "setup") {
      const profileData = {
        userId: interaction.user.id,
        preferredName: interaction.options.getString("preferredname") || "",
        sexuality: interaction.options.getString("sexuality") || "",
        romanticOrientation: interaction.options.getString("romantic") || "",
        gender: interaction.options.getString("gender") || "",
        pronouns: interaction.options.getString("pronouns") || "",
      };

      const newProfile = await Profile.create(profileData);

      const profileEmbed = new EmbedBuilder()
        .setColor("#FF00EA")
        .setTitle("Profile Setup")
        .setDescription(
          `${interaction.user.username}, your profile has been set up successfully!`
        )
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
      return interaction.reply({ embeds: [profileEmbed] });
    } else {
      return interaction.reply({
        content: "Unknown subcommand used.",
        ephemeral: true,
      });
    }
  },
};
