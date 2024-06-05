const chalk = require("chalk");
const BlockedTerm = require("../../../mongo/models/blockedtermSchema.js");

async function containsDisallowedContent(input, username) {
  if (typeof input !== "string" || input.trim() === "") {
    return false;
  }

  const sanitizedInput = input.toLowerCase().trim();
  let foundDisallowed = false;

  try {
    const blockedTermsDoc = await BlockedTerm.findOne();
    if (blockedTermsDoc) {
      blockedTermsDoc.terms.forEach((term) => {
        if (sanitizedInput.includes(term.toLowerCase())) {
          console.log(
            chalk.yellowBright.bold(
              `⚠️  ${username} has used blacklisted term: "${term}"`
            )
          );
          foundDisallowed = true;
        }
      });
    }
  } catch (error) {
    console.error("Error fetching blocked terms:", error);
  }

  return foundDisallowed;
}

module.exports = { containsDisallowedContent };
