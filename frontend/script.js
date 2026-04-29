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
