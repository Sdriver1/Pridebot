function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener("DOMContentLoaded", async function () {
  const userId = window.location.pathname.split("/").pop();
  const imagePathBase = `${userId}/`;
  const galleryContainer = document.querySelector(".features-boxed .row");
  const paginationContainer = document.createElement("div");
  paginationContainer.className = "text-center";
  paginationContainer.style.marginTop = "20px";
  galleryContainer.parentElement.appendChild(paginationContainer);

  let avatars = [];
  let currentPage = 1;
  const avatarsPerPage = 12;

  try {
    const user = await fetch(`/getUser/${userId}`).then((response) =>
      response.json()
    );
    if (!user || !user.username) {
      throw new Error("Failed to fetch username");
    }

    const capitalizedUsername = capitalizeFirstLetter(user.username);
    document.title = `${capitalizedUsername}'s Pride Avatars | Pridebot`;
    document.querySelectorAll(".user-tag").forEach((element) => {
      element.textContent = capitalizedUsername;
    });
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        "content",
        `Pridebot Pride Avatars for ${capitalizedUsername}`
      );
    document
      .querySelector('meta[name="og:title"]')
      .setAttribute("content", `${capitalizedUsername}'s Pride Avatars`);
  } catch (error) {
    console.error("Error fetching user information:", error);
  }

  fetch(`/files/${userId}`)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      if (data.files && data.files.length > 0) {
        avatars = data.files.filter((file) => file.endsWith(".png"));
        displayAvatarCount(avatars.length);
        renderPage(currentPage);
      } else {
        galleryContainer.innerHTML = "<p>No avatars found for this user.</p>";
      }
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });

  function displayAvatarCount(total) {
    const avatarCount = document.querySelector("h2#avatar-title");
    if (avatarCount) {
      avatarCount.innerHTML = `Pride Avatars <span style="font-size: 0.8em; color: var(--secondary-text-color);">(${total} total)</span>`;
    }
  }

  function renderPage(page) {
    galleryContainer.innerHTML = ""; // Clear current content
    const startIndex = (page - 1) * avatarsPerPage;
    const endIndex = startIndex + avatarsPerPage;
    const currentAvatars = avatars.slice(startIndex, endIndex);

    currentAvatars.forEach((file) => {
      const flagName = file.replace(".png", "");

      const itemDiv = document.createElement("div");
      itemDiv.className = "col-sm-6 col-md-5 col-lg-4 item";

      const boxDiv = document.createElement("div");
      boxDiv.id = "features";
      boxDiv.className = "box";

      const imgElement = document.createElement("img");
      imgElement.src = `${imagePathBase}${file}`;
      imgElement.alt = flagName;
      imgElement.style = "width: 200px; height: auto; margin-bottom: 15px";

      const flagNameElement = document.createElement("h3");
      flagNameElement.className = "name";
      flagNameElement.innerHTML = `<strong>${flagName}</strong>`;

      const buttonContainer = document.createElement("div");
      buttonContainer.className = "btn-group";

      const viewButton = document.createElement("a");
      viewButton.href = `${imagePathBase}${file}`;
      viewButton.className = "btn btn-primary smoothScroll shadow-none";
      viewButton.innerText = "View Image";
      viewButton.style = `
        margin: 5px;
        background-color: var(--main-color);
        border-color: var(--main-color);
        border-radius: 10px;
      `;
      viewButton.setAttribute("target", "_blank");

      const downloadButton = document.createElement("a");
      downloadButton.href = `${imagePathBase}${file}`;
      downloadButton.download = file;
      downloadButton.className = "btn btn-secondary smoothScroll shadow-none";
      downloadButton.innerText = "Download";
      downloadButton.style = "margin: 5px; border-radius: 10px";

      buttonContainer.appendChild(viewButton);
      buttonContainer.appendChild(downloadButton);

      boxDiv.appendChild(imgElement);
      boxDiv.appendChild(flagNameElement);
      boxDiv.appendChild(buttonContainer);

      itemDiv.appendChild(boxDiv);
      galleryContainer.appendChild(itemDiv);
    });

    renderPagination();
  }

  function renderPagination() {
    const totalPages = Math.ceil(avatars.length / avatarsPerPage);
    paginationContainer.innerHTML = `
      <button id="prev-page" class="btn btn-dark" ${
        currentPage === 1 ? "disabled" : ""
      }>Previous</button>
      <span style="margin: 0 10px; color: var(--text-color);">Page ${currentPage} of ${totalPages}</span>
      <button id="next-page" class="btn btn-dark" ${
        currentPage === totalPages ? "disabled" : ""
      }>Next</button>
    `;

    document.querySelector("#prev-page").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    });

    document.querySelector("#next-page").addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
      }
    });
  }
});
