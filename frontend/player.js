const API_BASE = "http://localhost:8080/api/video";

// =========================
// PEGAR VÍDEO DA URL
// =========================
const params = new URLSearchParams(window.location.search);
const videoName = params.get("video");

// =========================
// CARREGAR VÍDEO
// =========================
function loadVideo() {
  if (!videoName) return;

  const video = document.getElementById("videoPlayer");

  video.src = `http://localhost:8080/videos/${videoName}`;
  video.load();
}

// =========================
// CARREGAR APONTAMENTOS E JOGAR NA SIDEBAR
// =========================
async function loadAnnotations() {
  try {
    const res = await fetch(`${API_BASE}/annotations?video=${videoName}`);
    const data = await res.json();

    const list = document.getElementById("annotationsList");
    const video = document.getElementById("videoPlayer");

    list.innerHTML = "";

    data
      .sort((a, b) => timeToSeconds(a.time) - timeToSeconds(b.time)) // ordena por tempo
      .forEach(item => {
        const li = document.createElement("li");

        li.textContent = `${item.time} - ${item.label}`;
        li.style.cursor = "pointer";

        li.onclick = () => {
          const seconds = timeToSeconds(item.time);

          video.currentTime = seconds;
          video.play();
        };

        list.appendChild(li);
      });

  } catch (err) {
    console.error("Erro ao carregar apontamentos:", err);
  }
}

// =========================
// CONVERTER TEMPO (ROBUSTO)
// =========================
function timeToSeconds(time) {
  const parts = time.split(":").map(Number);

  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  return 0;
}

// =========================
// START
// =========================
document.addEventListener("DOMContentLoaded", () => {
  loadVideo();
  loadAnnotations();
});
