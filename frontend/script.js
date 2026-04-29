let videosGlobal = [];

// 🔹 Carregar vídeos do backend
async function loadVideos() {
  try {
    const res = await fetch('http://localhost:8080/api/video/list');
    const videos = await res.json();

    videosGlobal = videos;

    const container = document.getElementById('videoList');
    const total = document.getElementById('totalVideos');

    if (total) total.textContent = videos.length;

    container.innerHTML = '';

    videos.forEach(video => {
      const card = document.createElement('div');
      card.classList.add('video-card');

      card.innerHTML = `
        <div class="video-thumb">🎬</div>
        <div class="video-info">
          <h3>${video}</h3>
          <p>Inspeção automatizada por IA</p>
        </div>
      `;

      // 🔥 REDIRECIONAMENTO PARA PLAYER
      card.onclick = () => {
        window.location.href = `player.html?video=${encodeURIComponent(video)}`;
      };

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Erro ao carregar vídeos:', error);
  }
}

// 🔍 Busca de vídeos
function setupSearch() {
  const input = document.getElementById('search');

  if (!input) return;

  input.addEventListener('input', () => {
    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll('.video-card');

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(filter) ? 'block' : 'none';
    });
  });
}

// ▶️ Botão "Abrir último vídeo"
function goToFirstVideo() {
  if (videosGlobal.length > 0) {
    window.location.href = `player.html?video=${encodeURIComponent(videosGlobal[0])}`;
  } else {
    alert("Nenhum vídeo disponível.");
  }
}

// 🚀 Inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadVideos();
  setupSearch();
});