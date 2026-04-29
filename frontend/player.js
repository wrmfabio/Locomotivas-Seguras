// 🔹 Pega nome do vídeo da URL
function getVideoName() {
  const params = new URLSearchParams(window.location.search);
  return params.get('video');
}

// 🔹 Carrega vídeo no player
function loadVideo() {
  const videoName = getVideoName();
  const video = document.getElementById('videoPlayer');

  if (!videoName) {
    alert("Vídeo não especificado.");
    return;
  }

  video.src = `http://localhost:8080/api/video/${videoName}`;
}

// 🔹 Carregar apontamentos da IA
async function loadAnnotations() {
  try {
    const response = await fetch('http://localhost:8080/api/video/annotations');
    const data = await response.json();

    const list = document.getElementById('annotationsList');
    list.innerHTML = '';

    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.time} - ${item.label}`;

      li.onclick = () => {
        const video = document.getElementById('videoPlayer');
        const [min, sec] = item.time.split(':');
        video.currentTime = parseInt(min) * 60 + parseInt(sec);
        video.play();
      };

      list.appendChild(li);
    });

  } catch (error) {
    console.error('Erro ao carregar apontamentos:', error);
  }
}

// 🚀 Inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadVideo();
  loadAnnotations();
});