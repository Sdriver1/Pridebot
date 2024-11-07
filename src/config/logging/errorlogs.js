const { EmbedBuilder, DiscordAPIError } = require("discord.js");

const errorlogging = async (client, error) => {
  const channel = client.channels.cache.get("1303936573586411540");
  if (!channel) return;
  const estDate = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

  let embed = new EmbedBuilder()
    .setTitle("Pridebot Error Log")
    .setColor(0xff00ea)
    .addFields(
      {
        name: "Error Name",
        value: error.name || "Unknown Error",
        inline: true,
      },
      {
        name: "Time",
        value: `${estDate}`,
        inline: true,
      }
    )
    .setTimestamp();


  if (error instanceof DiscordAPIError) {
    embed.addFields(
      { name: "Error Code", value: `Code ${error.code}`, inline: true },
      { name: "Status", value: `${error.status}`, inline: true },
      { name: "Method", value: error.method || "Unknown", inline: true },
      { name: "URL", value: error.url || "N/A" },
      { name: "Error Message", value: error.message || "No message provided" }
    );
  } else {
    embed.addFields(
      { name: "Error Message", value: error.message || "No message provided" },
      {
        name: "Stack Trace",
        value: `\`\`\`${error.stack || "No stack trace available"}\`\`\``,
      }
    );
  }

  await channel.send({ embeds: [embed] });
};

module.exports = errorlogging;
