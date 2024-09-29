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

  if (actionType === "created") {
    embed.addFields(
      {
        name: "Preferred Name",
        value: `\`\`\`${updatedProfile.preferredName || "Not set"}\`\`\``,
      },
      {
        name: "Bio",
        value: `\`\`\`${updatedProfile.bio || "Not set"}\`\`\``,
      },
      {
        name: "Sexual Orientation",
        value: `\`\`\`${updatedProfile.sexuality || "Not set"}\`\`\``,
      },
      {
        name: "Romantic Orientation",
        value: `\`\`\`${updatedProfile.romanticOrientation || "Not set"}\`\`\``,
      },
      {
        name: "Gender",
        value: `\`\`\`${updatedProfile.gender || "Not set"}\`\`\``,
      },
      {
        name: "Pronouns",
        value: `\`\`\`${updatedProfile.pronouns || "Not set"}\`\`\``,
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
      { field: "bio", name: "Bio" },
      { field: "sexuality", name: "Sexual Orientation" },
      { field: "romanticOrientation", name: "Romantic Orientation" },
      { field: "gender", name: "Gender" },
      { field: "pronouns", name: "Pronouns" },
      { field: "color", name: "Color" },
      { field: "badgesVisible", name: "Badges Visible" },
      { field: "pronounpage", name: "Pronoun Page" },
    ];

    fieldsToShow.forEach((item) => {
      const oldValue = originalProfile[item.field];
      const newValue = updatedProfile[item.field];

      if (oldValue !== newValue) {
        embed.addFields(
          {
            name: `${item.name} (Original)`,
            value: `\`\`\`${
              oldValue !== undefined ? oldValue.toString() : "Not set"
            }\`\`\``,
          },
          {
            name: `${item.name} (New)`,
            value: `\`\`\`${
              newValue !== undefined ? newValue.toString() : "Not set"
            }\`\`\``,
          }
        );
      } else if (oldValue === newValue) {
        embed.addFields({
          name: `${item.name}`,
          value: `\`\`\`${
            newValue !== undefined ? newValue.toString() : "Not set"
          }\`\`\``,
        });
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
