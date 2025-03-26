const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { getInfo } = require("discord-hybrid-sharding");

module.exports = (client) => {
  console.log(
    `Avatar API initialization started by Cluster ${getInfo().CLUSTER}.`
  );
  const app = express();
  const port = 2611;

  try {
    app.listen(port, () => {
      console.log(`Avatar API is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start Avatar API:", error);
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(
    "/assets",
    express.static(path.join(__dirname, "..", "..", "web", "assets"))
  );

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "web", "index.html"));
  });

  app.get("/files/:identifier", (req, res) => {
    const identifier = req.params.identifier.toLowerCase();
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "src",
      "pfps",
      identifier
    );

    if (fs.existsSync(imagePath)) {
      const files = fs.readdirSync(imagePath);
      if (files.some((file) => file.endsWith(".png"))) {
        return res.json({ files });
      }
    }
    return res
      .status(404)
      .sendFile(path.join(__dirname, "..", "..", "web", "404.html"));
  });

  app.get("/:identifier", async (req, res) => {
    const { identifier } = req.params;
    if (/^\d+$/.test(identifier)) {
      try {
        const user = await client.users.fetch(identifier);
        const htmlFilePath = path.join(
          __dirname,
          "..",
          "..",
          "web",
          "webavatar.html"
        );
        let htmlContent = fs.readFileSync(htmlFilePath, "utf8");

        const username = user.username;
        const capitalizedUsername =
          username.charAt(0).toUpperCase() + username.slice(1);

        htmlContent = htmlContent.replace(/{user.tag}/g, capitalizedUsername);
        htmlContent = htmlContent.replace(
          /<meta name="og:title" content=".*" \/>/,
          `<meta name="og:title" content="${capitalizedUsername}'s Pride Avatars" />`
        );
        htmlContent = htmlContent.replace(
          /<meta name="og:description" content=".*" \/>/,
          `<meta name="og:description" content="Pridebot Pride Avatars for ${capitalizedUsername}" />`
        );
        htmlContent = htmlContent.replace(
          /<meta name="description" content=".*" \/>/,
          `<meta name="description" content="Pridebot Pride Avatars for ${capitalizedUsername}" />`
        );
        htmlContent = htmlContent.replace(
          /<title>.*<\/title>/,
          `<title>${capitalizedUsername}'s Pride Avatars | Pridebot</title>`
        );

        return res.send(htmlContent);
      } catch (error) {
      }
    }

    const folderIdentifier = identifier.toLowerCase();
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "src",
      "pfps",
      folderIdentifier
    );
    if (fs.existsSync(imagePath)) {
      const htmlFilePath = path.join(
        __dirname,
        "..",
        "..",
        "web",
        "webavatar.html"
      );
      let htmlContent = fs.readFileSync(htmlFilePath, "utf8");

      const capitalizedUsername =
        folderIdentifier.charAt(0).toUpperCase() + folderIdentifier.slice(1);

      htmlContent = htmlContent.replace(/{user.tag}/g, capitalizedUsername);
      htmlContent = htmlContent.replace(
        /<meta name="og:title" content=".*" \/>/,
        `<meta name="og:title" content="${capitalizedUsername}'s Pride Avatars" />`
      );
      htmlContent = htmlContent.replace(
        /<meta name="og:description" content=".*" \/>/,
        `<meta name="og:description" content="Pridebot Pride Avatars for ${capitalizedUsername}" />`
      );
      htmlContent = htmlContent.replace(
        /<meta name="description" content=".*" \/>/,
        `<meta name="description" content="Pridebot Pride Avatars for ${capitalizedUsername}" />`
      );
      htmlContent = htmlContent.replace(
        /<title>.*<\/title>/,
        `<title>${capitalizedUsername}'s Pride Avatars | Pridebot</title>`
      );

      return res.send(htmlContent);
    }

    return res
      .status(404)
      .sendFile(path.join(__dirname, "..", "..", "web", "404.html"));
  });

  app.get("/:identifier/:flag.png", (req, res) => {
    const { identifier, flag } = req.params;
    const folderIdentifier = identifier.toLowerCase();
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "src",
      "pfps",
      folderIdentifier,
      `${flag}.png`
    );
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    } else {
      return res.status(404).send("Image not found");
    }
  });
};
