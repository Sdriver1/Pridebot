const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const sharp = require("sharp");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const commandLogging = require("../../config/commandfunctions/commandlog");

const validFlags = [
  "abrosexual",
  "aceflux",
  "agender",
  "ally",
  "androgyne",
  "aroace",
  "aroace2",
  "aroflux",
  "aromantic",
  "asexual",
  "aurorian",
  "bigender",
  "bisexual",
  "boyflux",
  "butch",
  "butchlesbian",
  "butchlesbian2",
  "butchlesbian3",
  "catgender",
  "cupioromantic",
  "demibisexual",
  "demiboy",
  "demigirl",
  "deminonbinary",
  "demiroflux",
  "demiromantic",
  "demisexual",
  "gay",
  "genderfae",
  "genderfaun",
  "genderfluid",
  "genderflux",
  "genderqueer",
  "girlflux",
  "graygender",
  "grayromantic",
  "graysexual",
  "lesbian",
  "lgbt",
  "lunarian",
  "neptunic",
  "nonbinary",
  "omnisexual",
  "pangender",
  "pansexual",
  "polyamorous",
  "polysexual",
  "queer",
  "queerplatonic",
  "queerplatonic2",
  "sapphic",
  "selenosexual",
  "singularian",
  "solarian",
  "spacilian",
  "stellarian",
  "transfeminine",
  "transgender",
  "transmasculine",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prideavatar")
    .setDescription("Add a pride flag to your avatar")
    .addStringOption((option) =>
      option
        .setName("flag")
        .setDescription("The pride flag to overlay (type the flag name)")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    try {
      await interaction.deferReply();

      const user = interaction.user;
      const avatarURL = user.displayAvatarURL({ format: "webp", size: 512 });
      const flagName = interaction.options.getString("flag").toLowerCase();

      if (!validFlags.includes(flagName)) {
        await interaction.editReply(
          `Invalid flag name. Please choose from: ${validFlags.join(", ")}`
        );
        return;
      }

      let avatarBuffer;
      try {
        const response = await axios.get(avatarURL, {
          responseType: "arraybuffer",
        });
        avatarBuffer = await sharp(response.data)
          .resize(412, 412)
          .composite([
            {
              input: Buffer.from(
                `<svg><circle cx="206" cy="206" r="206" fill="white"/></svg>`
              ),
              blend: "dest-in",
            },
          ])
          .png()
          .toBuffer();
      } catch (error) {
        console.error(`Error loading avatar for user ${user.id}:`, error);
        await interaction.editReply(
          "There was an error loading your avatar. Please try again."
        );
        return;
      }

      let flagBuffer;
      try {
        const flagPath = path.join(__dirname, "../../flags", `${flagName}.png`);
        flagBuffer = await sharp(flagPath).resize(512, 512).png().toBuffer();
      } catch (error) {
        console.error(`Error loading flag image for flag ${flagName}:`, error);
        await interaction.editReply(
          "There was an error loading the selected flag. Please try again."
        );
        return;
      }

      let compositedBuffer;
      try {
        compositedBuffer = await sharp(flagBuffer)
          .composite([{ input: avatarBuffer, top: 50, left: 50 }])
          .png()
          .toBuffer();
      } catch (error) {
        console.error(`Error compositing images for user ${user.id}:`, error);
        await interaction.editReply(
          "There was an error processing the images. Please try again."
        );
        return;
      }

      let finalImageBuffer;
      try {
        finalImageBuffer = await sharp({
          create: {
            width: 512,
            height: 512,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          },
        })
          .composite([
            { input: compositedBuffer, top: 0, left: 0 },
            {
              input: Buffer.from(
                `<svg><circle cx="256" cy="256" r="256" fill="white"/></svg>`
              ),
              blend: "dest-in",
            },
          ])
          .png()
          .toBuffer();
      } catch (error) {
        console.error(
          `Error applying final circular mask to the image for user ${user.id}:`,
          error
        );
        await interaction.editReply(
          "There was an error processing the circular mask. Please try again."
        );
        return;
      }

      const userDirectory = path.join(__dirname, "../../pfps", user.id);
      const outputName = path.join(userDirectory, `${flagName}.png`);

      try {
        fs.mkdirSync(userDirectory, { recursive: true });
        if (fs.existsSync(outputName)) fs.unlinkSync(outputName);
        fs.writeFileSync(outputName, finalImageBuffer);
      } catch (error) {
        console.error(
          `Error saving final avatar image for user ${user.id}:`,
          error
        );
        await interaction.editReply(
          "There was an error saving your avatar. Please try again."
        );
        return;
      }

      const imageURL = `https://pfp.pridebot.xyz/${user.id}/${flagName}.png`;

      try {
        const response = await axios.get(imageURL);
        if (response.status !== 200) {
          throw new Error(`Image not accessible at URL: ${imageURL}`);
        }
      } catch (error) {
        console.error(`Image URL not accessible: ${imageURL}`, error);
        await interaction.editReply(
          "The image could not be accessed. Please try again later."
        );
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle("Your Pride Avatar")
        .setDescription("Here is your customized pride avatar!")
        .setImage(imageURL + `?time=${new Date().getTime()}`)
        .setColor("#FF69B4");

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Download Avatar")
          .setStyle(ButtonStyle.Link)
          .setURL(imageURL + `?time=${new Date().getTime()}`)
      );

      await commandLogging(client, interaction);
      await interaction.editReply({ embeds: [embed], components: [row] });
    } catch (error) {
      console.error(
        "Unexpected error occurred during pride avatar creation:",
        error
      );
      await interaction.editReply(
        "An unexpected error occurred. Please try again later."
      );
    }
  },
};
