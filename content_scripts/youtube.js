// Function to remove YouTube Shorts elements
function removeYouTubeShorts() {
  // Select and remove elements containing "Shorts" on the homepage
  document.querySelectorAll('ytd-rich-item-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]), ytd-grid-video-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]), ytd-video-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"])').forEach(el => el.remove());

  // Select and remove elements from the sidebar/feed that are shorts
  document.querySelectorAll('ytd-reel-shelf-renderer, ytd-item-section-renderer:has(#shorts-reels-container), ytd-rich-shelf-renderer[is-shorts], ytd-rich-shelf-renderer:has(#shorts-reels-container)').forEach(el => el.remove());

  // Remove the ytd-shorts element
  document.querySelectorAll('ytd-shorts').forEach(el => el.remove());

  // Remove the Shorts button from the guide sidebar
  document.querySelectorAll('ytd-guide-entry-renderer').forEach(entry => {
    const titleElement = entry.querySelector('yt-formatted-string.title.style-scope.ytd-guide-entry-renderer');
    if (titleElement && titleElement.textContent.trim() === 'Shorts') {
      entry.remove();
    }
  });

  // Remove the Shorts button from the mini-guide sidebar
  document.querySelectorAll('a#endpoint.yt-simple-endpoint[title="Shorts"]').forEach(el => el.remove());

  // Attempt to remove the player itself if it's a short
  document.querySelectorAll('ytd-player:has(ytd-reel-player-overlay-renderer)').forEach(el => el.remove());

  // Attempt to remove the watch page container if it's a short
  document.querySelectorAll('ytd-watch-flexy[video-id*="shorts"]').forEach(el => el.remove());
  console.log('Removed Shorts elements');
}

// Redirect if the URL is a YouTube Shorts URL
if (window.location.href.includes("/shorts/")) {
  window.location.replace("https://www.youtube.com/");
}

// Monitor changes dynamically
const observer = new MutationObserver(removeYouTubeShorts);
observer.observe(document.body, { childList: true, subtree: true });
  