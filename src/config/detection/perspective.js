require("dotenv").config();
const fetch = require("node-fetch");
const { perspectiveAPIKEY } = process.env;

async function scanText(text) {
  const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${perspectiveAPIKEY}`;
  const body = JSON.stringify({
    comment: { text },
    requestedAttributes: { TOXICITY: {}, INSULT: {} },
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const json = await response.json();
    return {
      toxicity: json.attributeScores?.TOXICITY?.summaryScore?.value || 0,
      insult: json.attributeScores?.INSULT?.summaryScore?.value || 0,
    };
  } catch (error) {
    console.error("Error fetching Perspective API:", error);
    return null;
  }
}

module.exports = { scanText };
