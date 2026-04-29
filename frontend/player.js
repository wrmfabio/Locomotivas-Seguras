    function getVideoName() {
  const params = new URLSearchParams(window.location.search);
  return params.get('video');
}

function loadVideo() {
  const videoName = getVideoName();
  const video = document.getElementById('videoPlayer');

  video.src = `http://localhost:8080/api/video/${videoName}`;
}

async function loadAnnotations() {
  const res = await fetch('http://localhost:8080/api/video/annotations');
  const data = await res.json();

  const list = document.getElementById('annotationsList');

  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.time} - ${item.label}`;

    li.onclick = () => {
      const video = document.getElementById('videoPlayer');
      const [min, sec] = item.time.split(':');
      video.currentTime = min * 60 + parseInt(sec);
      video.play();
    };

    list.appendChild(li);
  });
}

loadVideo();
loadAnnotations();