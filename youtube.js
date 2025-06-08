function removeYouTubeShorts() {
    // Shorts shelf on home page
    const shelf = document.querySelector('ytd-rich-shelf-renderer');
    if (shelf && shelf.innerText.includes('Shorts')) {
      shelf.remove();
    }
  
    // Shorts on sidebars or feeds
    document.querySelectorAll('ytd-grid-video-renderer, ytd-video-renderer').forEach(vid => {
      if (vid.innerHTML.includes('shorts')) {
        vid.remove();
      }
    });
  }
  
  // Monitor changes dynamically
  const observer = new MutationObserver(removeYouTubeShorts);
  observer.observe(document.body, { childList: true, subtree: true });
  