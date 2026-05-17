// =========================================
// BUTTON MASUK
// =========================================

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  // Animasi klik
  startBtn.innerHTML = "Memulai...";

  startBtn.style.transform = "scale(0.95)";

  // Pindah halaman
  setTimeout(() => {
    window.location.href = "home.html";
  }, 1000);
});

// =========================================
// PARTICLE GENERATOR
// =========================================

const particleContainer = document.getElementById("particles");

for (let i = 0; i < 25; i++) {
  const particle = document.createElement("div");

  particle.classList.add("particle");

  particle.style.left = Math.random() * 100 + "vw";

  particle.style.bottom = "-20px";

  particle.style.animationDuration = 5 + Math.random() * 10 + "s";

  particle.style.animationDelay = Math.random() * 5 + "s";

  particle.style.width = particle.style.height = 5 + Math.random() * 10 + "px";

  particleContainer.appendChild(particle);
}
