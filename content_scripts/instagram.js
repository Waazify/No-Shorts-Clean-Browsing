function removeInstagramReels() {
  // Remove Reels button from sidebar/main feed
  // Remove Reels button by targeting the div containing the 'Reels' text and the link
  document.querySelectorAll('div.x1n2onr6.x6s0dn4.x78zum5:has(a[href="/reels/"])').forEach(el => {
    el.remove();
  });

  // document.querySelectorAll('div.x6s0dn4.x9f619.xxk0z11.x6ikm8r.xeq5yr9.xf7dkkf.x1s85apg.xzzcqpx').forEach(
  //   el=> {
  //     el.remove();
  //   }
  // )

  // Fallback for other Reels elements, if any
  const reelsSvg = document.querySelector('svg[aria-label="Reels"]');
  if (reelsSvg) {
    const reelsButtonContainer = reelsSvg.parentElement?.parentElement?.parentElement;
    if (reelsButtonContainer) {
      reelsButtonContainer.remove();
    }
  }
}

const removeReelsLinks = () => {
  document.querySelectorAll('a[href*="/reels/"]').forEach(link => {
    // Remove the parent element of the link, or the link itself if no suitable parent
    if (link.parentElement) {
      link.parentElement.remove();
    } else {
      link.remove();
    }
  });
};

// Function to redirect from Instagram Reels URLs
const redirectFromReels = () => {
  if (window.location.pathname.includes('/reels/')) {
    window.location.replace('https://www.instagram.com/');
  }
};

// Initial removal attempts
removeInstagramReels();
removeReelsLinks();
redirectFromReels();

// Use MutationObserver to remove Reels elements that load later
const observer = new MutationObserver(() => {
  removeInstagramReels();
  removeReelsLinks();
  redirectFromReels();
});

// Observe the document body for changes
observer.observe(document.body, { childList: true, subtree: true });

// Listen for URL changes (e.g., via history API pushState/replaceState)
window.addEventListener('popstate', redirectFromReels);

// Also, use a custom event or check periodically if needed for single-page applications
// This might be redundant with MutationObserver and popstate, but good for robustness
setInterval(redirectFromReels, 1000);

// Redirect if the URL is an Instagram Reel URL
if (window.location.href.includes("/reel/")) {
  window.location.replace("https://www.instagram.com/");
}