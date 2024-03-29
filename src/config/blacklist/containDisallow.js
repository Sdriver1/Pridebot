const chalk = require("chalk");
const { slurslist } = require("../blacklist/slurs");
const { phrasesList } = require("../blacklist/phrases");

function containsDisallowedContent(input, username) {
  if (typeof input !== "string" || input.trim() === "") {
    return false;
  }

  const sanitizedInput = input.toLowerCase().trim();
  let foundDisallowed = false;

  slurslist.forEach((slur) => {
    if (sanitizedInput.includes(slur)) {
      console.log(
        chalk.yellowBright.bold(
          `⚠️  ${username} has used blacklisted term: "${slur}"`
        )
      );
      foundDisallowed = true;
    }
  });

  phrasesList.forEach((phrase) => {
    if (sanitizedInput.includes(phrase)) {
      console.log(
        chalk.yellowBright.bold(
          `⚠️  ${username} has used blacklisted phrase: "${phrase}"`
        )
      );
      foundDisallowed = true;
    }
  });

  return foundDisallowed;
}

module.exports = { containsDisallowedContent };
