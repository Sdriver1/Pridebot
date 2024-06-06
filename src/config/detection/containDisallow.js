const chalk = require("chalk");
const BlockedTerm = require("../../../mongo/models/blockedtermSchema.js");

async function containsDisallowedContent(input, username) {
  if (typeof input !== "string" || input.trim() === "") {
    console.log(chalk.red("Invalid input provided."));
    return false;
  }

  const sanitizedInput = input.toLowerCase().trim();
  let foundDisallowed = false;

  try {
    const blockedTermsDoc = await BlockedTerm.findOne();
    if (blockedTermsDoc) {
      const blockedTerms = blockedTermsDoc.terms.map((term) =>
        term.toLowerCase().trim()
      );
      const inputWords = sanitizedInput.split(/\s+/);

      inputWords.forEach((word) => {
        blockedTerms.forEach((term) => {
          if (word === term) {
            console.log(
              chalk.yellowBright.bold(
                `⚠️  ${username} has used blacklisted term: "${term}" (matched with word: "${word}")`
              )
            );
            foundDisallowed = true;
          }
        });
      });

      if (!foundDisallowed) {
        console.log(chalk.green("No blocked terms found in input."));
      }
    } else {
      console.log(chalk.red("Blocked terms document not found."));
    }
  } catch (error) {
    console.error("Error fetching blocked terms:", error);
  }

  return foundDisallowed;
}

module.exports = { containsDisallowedContent };
