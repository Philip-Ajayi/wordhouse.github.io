    document.addEventListener('DOMContentLoaded', function () {
      const animatedTexts = document.querySelectorAll('.animated-text');
      const welcomeText = document.getElementById('welcome-text');

      function animateElements() {
        animatedTexts.forEach((text, index) => {
          setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'scale(1)';
          }, index * 500);
        });

        setTimeout(() => {
          welcomeText.style.opacity = '1';
          welcomeText.style.transform = 'translateY(0)';
        }, (animatedTexts.length + 1) * 500);
      }

      animateElements();
    });



    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const audioLine = document.getElementById('audioLine');
    const liveIndicator = document.getElementById('liveIndicator');

    let isPlaying = false;

    const audio = new Audio('https://stream-152.zeno.fm/qqgdtv5o3isuv?zs=wY1Y2lmCTvmRzYJPqaHt8A');

    playPauseBtn.addEventListener('click', togglePlayPause);

    function togglePlayPause() {
      if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = '\u25B6'; // Unicode for pause symbol
      } else {
        audio.play();
        playPauseBtn.textContent = '\u23F8'; // Unicode for play symbol
      }
      isPlaying = !isPlaying;
    }




  document.getElementById('seeMoreBtn').addEventListener('click', function() {
    var hiddenContent = document.getElementById('hiddenContent');
    if (hiddenContent.style.display === 'none') {
      hiddenContent.style.display = 'block';
      document.getElementById('seeMoreBtn').innerText = 'See less';
    } else {
      hiddenContent.style.display = 'none';
      document.getElementById('seeMoreBtn').innerText = 'See more';
    }
  });