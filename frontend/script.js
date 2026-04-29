async function loadAnnotations() {
  const response = await fetch('http://localhost:8080/api/video/annotations');
  const data = await response.json();

  const list = document.getElementById('annotationsList');
  list.innerHTML = '';

  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.time} - ${item.label}`;

    li.onclick = () => {
      const video = document.getElementById('videoPlayer');
      const parts = item.time.split(':');
      video.currentTime = parseInt(parts[0]) * 60 + parseInt(parts[1]);
      video.play();
    };

    list.appendChild(li);
  });
}

loadAnnotations();

async function loadVideos() {
  const res = await fetch('http://localhost:8080/api/video/list');
  const videos = await res.json();

  const container = document.getElementById('videoList');

  videos.forEach(video => {
    const div = document.createElement('div');
    div.textContent = video;
    div.classList.add('video-item');

    div.onclick = () => {
      window.location.href = `player.html?video=${video}`;
    };

    container.appendChild(div);
  });
}

loadVideos();

async function loadVideos() {
  const res = await fetch('http://localhost:8080/api/video/list');
  const videos = await res.json();

  const container = document.getElementById('videoList');
  const total = document.getElementById('totalVideos');

  total.textContent = videos.length;

  container.innerHTML = '';

  videos.forEach(video => {
    const card = document.createElement('div');
    card.classList.add('video-card');

    card.innerHTML = `
      <div class="video-thumb">
        <span>🎬</span>
      </div>
      <div class="video-info">
        <h3>${video}</h3>
        <p>Locomotiva monitorada</p>
      </div>
    `;

    card.onclick = () => {
      window.location.href = `player.html?video=${video}`;
    };

    container.appendChild(card);
  });
}

function setupSearch() {
  const input = document.getElementById('search');

  input.addEventListener('input', () => {
    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll('.video-card');

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(filter) ? 'block' : 'none';
    });
  });
}

loadVideos();
setupSearch();