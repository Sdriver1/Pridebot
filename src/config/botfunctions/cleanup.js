const fs = require("fs");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../pfps");

function deleteOldFiles() {
  const now = Date.now();
  const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;

  fs.readdir(avatarsDir, (err, users) => {
    if (err) {
      console.error("Error reading avatars directory:", err);
      return;
    }

    users.forEach((userId) => {
      const userDir = path.join(avatarsDir, userId);

      fs.readdir(userDir, (err, files) => {
        if (err) {
          console.error(`Error reading user directory (${userId}):`, err);
          return;
        }

        files.forEach((file) => {
          const filePath = path.join(userDir, file);

          fs.stat(filePath, (err, stats) => {
            if (err) {
              console.error(`Error getting stats for file (${file}):`, err);
              return;
            }

            if (now - stats.mtimeMs > oneMonthInMs) {
              fs.unlink(filePath, (err) => {
                if (err) {
                  console.error(`Error deleting file (${file}):`, err);
                } else {
                  console.log(`Deleted old file: ${file}`);
                }
              });
            }
          });
        });
      });
    });
  });
}

deleteOldFiles();
