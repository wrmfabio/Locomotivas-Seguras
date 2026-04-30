
const API_BASE = "http://localhost:8080/api/video";

// =========================
// 1. PEGAR VÍDEO DA URL
// =========================
const params = new URLSearchParams(window.location.search);
const videoName = params.get("video");

// =========================
// 2. CARREGAR VÍDEO NO PLAYER
// =========================

function loadVideo() {
  const params = new URLSearchParams(window.location.search);
  const videoName = params.get("video");

  if (!videoName) return;

  const video = document.getElementById("videoPlayer");

  video.src = `http://localhost:8080/videos/${videoName}`;
  video.load();
}

// =========================
// 3. CARREGAR APONTAMENTOS (IA)
// =========================
async function loadAnnotations() {
  try {
    const response = await fetch(`${API_BASE}/annotations?video=${videoName}`);
    const data = await response.json();

    const list = document.getElementById("annotationsList");
    list.innerHTML = "";

    data.forEach(item => {
      const li = document.createElement("li");

      li.textContent = `${item.time} - ${item.label}`;

      li.onclick = () => {
        const video = document.getElementById("videoPlayer");

        // converte "mm:ss"
        const parts = item.time.split(":");
        const seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);

        video.currentTime = seconds;
        video.play();
      };

      list.appendChild(li);
    });

  } catch (error) {
    console.error("Erro ao carregar apontamentos:", error);
  }
}

// =========================
// 4. AUTO START
// =========================
document.addEventListener("DOMContentLoaded", () => {
  loadVideo();
  loadAnnotations();
});