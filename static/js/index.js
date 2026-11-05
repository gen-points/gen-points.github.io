// Demo videos are not autoplayed all at once (19 clips, ~27 MB).
// Each one starts loading and playing when it comes near the screen,
// and pauses when it scrolls away.
document.addEventListener('DOMContentLoaded', function () {
  var videos = document.querySelectorAll('video.demo-video');

  function play(video) {
    var p = video.play();
    if (p && p.catch) { p.catch(function () {}); }
  }

  if (!('IntersectionObserver' in window)) {
    videos.forEach(play);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        play(entry.target);
      } else {
        entry.target.pause();
      }
    });
  }, { rootMargin: '300px 0px' });

  videos.forEach(function (video) { observer.observe(video); });
});
