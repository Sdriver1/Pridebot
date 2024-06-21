const fs = require("fs");
const path = require("path");

const supportedLanguages = [
  "id", // Indonesian
  "da", // Danish
  "de", // German
  "en-GB", // English (UK)
  "en-US", // English (US)
  "es-ES", // Spanish (Spain)
  "es-419", // Spanish (Latin America)
  "fr", // French
  "hr", // Croatian 
  "it", // Italian 
  "lt", // Lithuanian
  "hu", // Hungarian 
  "nl", // Dutch
  "no", // Norwegian
  "pl", // Polish
  "pt-BR", // Portuguese (Brazil)
  "ro", // Romanian
  "fi", // Finnish
  "sv-SE", // Swedish
  "vi", // Vietnamese
  "tr", // Turkish
  "cs", // Czech
  "el", // Greek
  "bg", // Bulgarian
  "ru", // Russian
  "uk", // Ukrainian
  "hi", // Hindi
  "th", // Thai
  "zh-CN", // Chinese (Simplified)
  "ja", // Japanese
  "zh-TW", // Chinese (Traditional)
  "ko", // Korean
];

function loadTranslations(language, category, commandName) {
  let categories = category;
  if (category === "Pride") {
    categories = "PrideTranslations";
  } else if (category === "Terms") {
    categories = "TermsTranslations";
  }
  const lang = supportedLanguages.includes(language) ? language : "en-US";
  const defaultPath = path.join(
    __dirname,
    "..",
    "..",
    "translations",
    categories,
    commandName,
    "en-US.json"
  );
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "translations",
    categories,
    commandName,
    `${lang}.json`
  );

  try {
    if (fs.existsSync(filePath)) {
      const translations = JSON.parse(fs.readFileSync(filePath, "utf8"));
      return translations;
    } else {
      console.warn(
        `Warning: Translation file for '${language}' not found for command '${commandName}'. Using default language.`
      );
      return JSON.parse(fs.readFileSync(defaultPath, "utf8"));
    }
  } catch (error) {
    console.error(
      `Error loading translations for ${language} for command '${commandName}':`,
      error
    );
    return JSON.parse(fs.readFileSync(defaultPath, "utf8"));
  }
}

module.exports = loadTranslations;
