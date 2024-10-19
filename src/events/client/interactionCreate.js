const Review = require("../../../mongo/models/reviewSchema");
const CommandUsage = require("../../../mongo/models/usageSchema");
const Blacklist = require("../../../mongo/models/blacklistSchema.js");
const IDLists = require("../../../mongo/models/idSchema.js");

async function isBlacklisted(userId, guildId) {
  try {
    const idLists = await IDLists.findOne();
    if (idLists && idLists.devs.includes(userId)) {
      return { blacklisted: false };
    }

    const blacklist = await Blacklist.findOne();
    if (!blacklist) return { blacklisted: false };

    if (blacklist.blacklistUserIDs.includes(userId)) {
      return { blacklisted: true, type: "user" };
    }
    if (blacklist.blacklistGuildIDs.includes(guildId)) {
      return { blacklisted: true, type: "guild" };
    }
    return { blacklisted: false };
  } catch (err) {
    console.error("Error checking blacklist:", err);
    return { blacklisted: false };
  }
}

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      if (command.owner === true) {
        if (interaction.user.id !== "691506668781174824") {
          await interaction.reply({
            content: "This command is only for the bot owner!",
            ephemeral: true,
          });
          return;
        }
      }

      const userId = interaction.user.id;
      const guildId = interaction.guild ? interaction.guild.id : null;
      const { blacklisted, type } = await isBlacklisted(userId, guildId);
      if (blacklisted) {
        if (type === "user") {
          await interaction.reply({
            content:
              "You are blacklisted from using the bot. If you feel like this is a mistake, please contact <@691506668781174824> or join [support server](https:/pridebot.xyz/support).",
            ephemeral: true,
          });
        } else if (type === "guild") {
          await interaction.reply({
            content:
              "This guild is blacklisted from using the bot. If you feel like this is a mistake, please contact <@691506668781174824> or join [support server](https:/pridebot.xyz/support).",
            ephemeral: true,
          });
        }
        return;
      }

      try {
        if (commandName !== "usage") {
          const usageData = await CommandUsage.findOneAndUpdate(
            { commandName: commandName },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
          );

          if (interaction.guild) {
            usageData.guildCount += 1;
          } else {
            usageData.userContextCount += 1;
          }

          await usageData.save();
        }

        // Proceed to execute the command itself
        await command.execute(interaction, client, { userId, guildId });

        let reviewData = await Review.findOne({ userId });

        if (!reviewData) {
          reviewData = new Review({ userId });
        }

        reviewData.commandCount += 1;

        if (reviewData.commandCount >= 5 && !reviewData.receivedSurvey) {
          try {
            // Attempt to send the survey via DM
            await interaction.user.send({
              content:
                "We have noticed you have been using Pridebot for abit and wondered if you like to do a quick survey! [Click here to take a survey on Pridebot to help improve the bot!](https://pridebot.xyz/survey)",
            });

            // Mark survey as sent
            reviewData.receivedSurvey = true;
          } catch (err) {
            // If DM fails, try sending in the channel
            try {
              await interaction.channel.send({
                content:
                "We have noticed you have been using Pridebot for abit and wondered if you like to do a quick survey! [Click here to take a survey on Pridebot to help improve the bot!](https://pridebot.xyz/survey)",
              });

              // Mark survey as sent
              reviewData.receivedSurvey = true;
            } catch (err) {
              // If neither DM nor channel is available, just mark the survey as received
              reviewData.receivedSurvey = true;
            }
          }
        }

        await reviewData.save();
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: `Error occurred while executing this command \nIf the error continues, please use </bugreport:1176639348423266457> to alert developers, Thank you!`,
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: `Error occurred while executing this command \nIf the error continues, please use </bugreport:1176639348423266457> to alert developers, Thank you!`,
            ephemeral: true,
          });
        }
      }
    }
  },
};
