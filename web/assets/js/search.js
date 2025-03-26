document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const resultContainer = document.getElementById("result");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    resultContainer.textContent = "Searching...";

    if (!query) {
      resultContainer.textContent = "Please enter a User ID or Username.";
      return;
    }

    if (!isNaN(query)) {
      window.location.href = `/${query}`;
      return;
    }

    try {
      const response = await fetch(`/files/${query}`);
      if (response.ok) {
        const data = await response.json();
        if (
          data.files &&
          Array.isArray(data.files) &&
          data.files.some((file) => file.endsWith(".png"))
        ) {
          window.location.href = `/${query}`;
          return;
        }
      }
      window.location.href = "/404.html";
    } catch (error) {
      console.error("Error checking folder for identifier:", error);
      window.location.href = "/404.html";
    }
  });
});
