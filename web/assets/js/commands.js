document.addEventListener("DOMContentLoaded", function () {
  fetch("https://api.pridebot.xyz/api/commands")
    .then((response) => response.json())
    .then((data) => {
      const accordionContainer = document.querySelector(".accordion");
      accordionContainer.innerHTML = ""; 

      for (const [category, details] of Object.entries(data)) {
        if (category === "Dev") continue; 

        // Create accordion item
        const accordionItem = document.createElement("div");
        accordionItem.className = "accordion-item";

        const button = document.createElement("button");
        button.id = `accordion-button-${category}`;
        button.setAttribute("aria-expanded", "false");

        const titleSpan = document.createElement("span");
        titleSpan.className = "accordion-title";
        titleSpan.textContent = `${category} (${details.count})`;

        const iconSpan = document.createElement("span");
        iconSpan.className = "icon";
        iconSpan.setAttribute("aria-hidden", "true");

        button.appendChild(titleSpan);
        button.appendChild(iconSpan);
        accordionItem.appendChild(button);

        const accordionContent = document.createElement("div");
        accordionContent.className = "accordion-content";

        const paragraph = document.createElement("p");
        details.commands.forEach((command) => {
          const strong = document.createElement("strong");
          strong.textContent = `/${command}`;
          paragraph.appendChild(strong);
          paragraph.innerHTML += "<br />";
        });

        accordionContent.appendChild(paragraph);
        accordionItem.appendChild(accordionContent);
        accordionContainer.appendChild(accordionItem);

        button.addEventListener("click", function () {
          const isExpanded = button.getAttribute("aria-expanded") === "true";
          button.setAttribute("aria-expanded", !isExpanded);
          accordionContent.style.display = isExpanded ? "none" : "block";
        });

        accordionContent.style.display = "none";
      }
    })
    .catch((error) => console.error("Error fetching command data:", error));
});
