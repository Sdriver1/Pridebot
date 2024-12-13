const axios = require("axios");
require("dotenv").config();
const { discordstoken } = process.env;

async function updateDiscordsCount(client) {
  const currentGuildCount = client.guilds.cache.size;
  try {
    const response = await axios.post(
      `https://discords.com/bots/api/bot/1101256478632972369/setservers`,
      { server_count: currentGuildCount },
      {
        headers: {
          Authorization: discordstoken,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error updating server count:",
      error.response?.data || error.message
    );
  }
}

module.exports = { updateDiscordsCount };
