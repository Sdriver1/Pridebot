const { EmbedBuilder } = require("discord.js");

const profileLogging = async (
  client,
  interaction,
  actionType,
  originalProfile,
  updatedProfile
) => {
  const estDate = new Date();

  const embed = new EmbedBuilder()
    .setColor("#FF00EA")
    .setTitle(`Profile ${actionType === "created" ? "Created" : "Edited"}`)
    .setDescription(`User: <@${interaction.user.id}> (${interaction.user.id})`)
    .setTimestamp(estDate);

  const combineFields = (main, other) => {
    if (!main && !other) return "Not set";
    return [main, other].filter(Boolean).join(", ");
  };

  if (actionType === "created") {
    embed.addFields(
      {
        name: "Preferred Name",
        value: `\`\`\`${updatedProfile.preferredName || "Not set"}\`\`\``,
      },
      { name: "Age", value: `\`\`\`${updatedProfile.age || "Not set"}\`\`\`` },
      { name: "Bio", value: `\`\`\`${updatedProfile.bio || "Not set"}\`\`\`` },
      {
        name: "Sexual Orientation",
        value: `\`\`\`${combineFields(
          updatedProfile.sexuality,
          updatedProfile.otherSexuality
        )}\`\`\``,
      },
      {
        name: "Romantic Orientation",
        value: `\`\`\`${updatedProfile.romanticOrientation || "Not set"}\`\`\``,
      },
      {
        name: "Gender",
        value: `\`\`\`${combineFields(
          updatedProfile.gender,
          updatedProfile.otherGender
        )}\`\`\``,
      },
      {
        name: "Pronouns",
        value: `\`\`\`${combineFields(
          updatedProfile.pronouns,
          updatedProfile.otherPronouns
        )}\`\`\``,
      },
      {
        name: "Color",
        value: `\`\`\`${updatedProfile.color || "Not set"}\`\`\``,
        inline: true,
      },
      {
        name: "Badges Visible",
        value: `\`\`\`${updatedProfile.badgesVisible ? "Yes" : "No"}\`\`\``,
        inline: true,
      }
    );

    if (updatedProfile.pronounpage) {
      embed.addFields({
        name: "Pronoun Page",
        value: updatedProfile.pronounpage,
        inline: true,
      });
    }
  } else if (actionType === "edited") {
    const fieldsToShow = [
      { field: "preferredName", name: "Preferred Name" },
      { field: "age", name: "Age" },
      { field: "bio", name: "Bio" },
      {
        field: "sexuality",
        name: "Sexual Orientation",
        mergeWith: "otherSexuality",
      },
      { field: "romanticOrientation", name: "Romantic Orientation" },
      { field: "gender", name: "Gender", mergeWith: "otherGender" },
      { field: "pronouns", name: "Pronouns", mergeWith: "otherPronouns" },
      { field: "color", name: "Color" },
      { field: "badgesVisible", name: "Badges Visible" },
      { field: "pronounpage", name: "Pronoun Page" },
    ];

    fieldsToShow.forEach(({ field, name, mergeWith }) => {
      const oldValue = mergeWith
        ? combineFields(originalProfile[field], originalProfile[mergeWith])
        : originalProfile[field];

      const newValue = mergeWith
        ? combineFields(updatedProfile[field], updatedProfile[mergeWith])
        : updatedProfile[field];

      if (oldValue !== newValue) {
        embed.addFields(
          {
            name: `${name} (Original)`,
            value: `\`\`\`${oldValue || "Not set"}\`\`\``,
          },
          {
            name: `${name} (New)`,
            value: `\`\`\`${newValue || "Not set"}\`\`\``,
          }
        );
      }
    });
  }

  const logChannel = client.channels.cache.get("1284916147702988882");

  if (logChannel) {
    logChannel.send({ embeds: [embed] });
  } else {
    console.error(`Logging channel with ID 1284916147702988882 not found.`);
  }
};

module.exports = profileLogging;
