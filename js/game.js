// Variabel Game
let score = 0;
let timeLeft = 30;
let gameInterval;
let spawnInterval;
let isPlaying = false;

// Elemen HTML
const scoreDisplay = document.getElementById("scoreDisplay");
const timeDisplay = document.getElementById("timeDisplay");
const gameArea = document.getElementById("gameArea");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

// Daftar Item
const goodItems = ["☀️", "💧", "💨"]; // Bahan Fotosintesis (+10)
const badItems = ["🔥", "🐛", "🗑️"]; // Bahaya (-5)

// Fungsi Mulai Game
function startGame() {
  score = 0;
  timeLeft = 30;
  isPlaying = true;

  scoreDisplay.innerText = score;
  timeDisplay.innerText = timeLeft;

  startScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");

  // Hapus barang yang tersisa dari game sebelumnya
  document.querySelectorAll(".falling-item").forEach((item) => item.remove());

  // Timer Hitung Mundur
  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  // Munculkan Barang secara berkala
  spawnInterval = setInterval(spawnItem, 600); // Tiap 0.6 detik muncul 1 barang
}

// Fungsi Mengakhiri Game
function endGame() {
  isPlaying = false;
  clearInterval(gameInterval);
  clearInterval(spawnInterval);

  finalScore.innerText = score;
  gameOverScreen.classList.remove("hidden");
}

// Fungsi Memunculkan Barang Jatuh
function spawnItem() {
  if (!isPlaying) return;

  const item = document.createElement("div");
  item.classList.add("falling-item");

  // Tentukan barang ini Baik (70% peluang) atau Buruk (30% peluang)
  const isGood = Math.random() > 0.3;
  const arrayToUse = isGood ? goodItems : badItems;

  // Pilih acak emoji-nya
  const randomEmoji = arrayToUse[Math.floor(Math.random() * arrayToUse.length)];
  item.innerText = randomEmoji;

  // Posisi jatuh acak (dari 0% sampai 90% lebar layar agar tidak keluar batas)
  const randomX = Math.floor(Math.random() * 90);
  item.style.left = `${randomX}%`;

  // Kecepatan jatuh acak (antara 2 detik sampai 4 detik)
  const randomDuration = Math.random() * 2 + 2;
  item.style.animationDuration = `${randomDuration}s`;

  // Pasang Event saat di-klik
  item.addEventListener("mousedown", () => {
    if (!isPlaying) return;

    if (isGood) {
      score += 10;
    } else {
      score -= 5;
      // Efek layar kedip merah kalau salah klik
      gameArea.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
      setTimeout(
        () => (gameArea.style.backgroundColor = "rgba(255, 255, 255, 0.3)"),
        150,
      );
    }

    scoreDisplay.innerText = score;
    item.remove(); // Hapus item setelah diklik
  });

  // Tambahkan item ke layar
  gameArea.appendChild(item);

  // Otomatis hapus item dari HTML kalau sudah lewat layar (biar nggak berat)
  setTimeout(() => {
    if (item.parentElement) {
      item.remove();
    }
  }, randomDuration * 1000);
}

// Tombol Event Listener
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
