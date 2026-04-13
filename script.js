// ===== WAIT FOR PAGE TO LOAD =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("Website loaded 🚀");

  loadProjects();
});

// ===== PROJECT DATA =====
const projects = [
  {
    name: "Game One",
    description: "A fun arcade-style game.",
    link: "https://example.com/game1"
  },
  {
    name: "Game Two",
    description: "A strategy puzzle game.",
    link: "https://example.com/game2"
  }
];

// ===== LOAD PROJECTS =====
function loadProjects() {
  const container = document.getElementById("projectList");

  if (!container) return;

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <a href="${project.link}" target="_blank">Play Game</a>
    `;

    container.appendChild(card);
  });
}

// ===== EXAMPLE INTERACTION =====
function showAlert() {
  alert("Button clicked!");
}
