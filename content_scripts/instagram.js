let isExtensionEnabled = true;

function removeInstagramReels() {
  if (!isExtensionEnabled) {
    console.log('Extension is disabled. Not removing Instagram Reels.');
    return;
  }
  // Remove Reels button from sidebar/main feed
  // Remove Reels button by targeting the div containing the 'Reels' text and the link
  document.querySelectorAll('div.x1n2onr6.x6s0dn4.x78zum5:has(a[href="/reels/"])').forEach(el => {
    el.remove();
  });

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
  if (!isExtensionEnabled) {
    console.log('Extension is disabled. Not removing Instagram Reels links.');
    return;
  }
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
  if (!isExtensionEnabled) {
    console.log('Extension is disabled. Not redirecting from Instagram Reels URLs.');
    return;
  }
  if (window.location.pathname.includes('/reels/')) {
    window.location.replace('https://www.instagram.com/');
  }
};

// Initial check and set up listener for extension state
chrome.storage.local.get('enabled', (data) => {
  isExtensionEnabled = data.enabled ?? true;
  if (isExtensionEnabled) {
    removeInstagramReels();
    removeReelsLinks();
    redirectFromReels();
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.enabled !== undefined) {
    isExtensionEnabled = changes.enabled.newValue;
    console.log('Extension enabled state changed to:', isExtensionEnabled);
    if (isExtensionEnabled) {
      removeInstagramReels();
      removeReelsLinks();
      redirectFromReels();
    }
  }
});

// Use MutationObserver to remove Reels elements that load later
const observer = new MutationObserver(() => {
  if (isExtensionEnabled) {
    removeInstagramReels();
    removeReelsLinks();
    redirectFromReels();
  }
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
  if (isExtensionEnabled) {
    window.location.replace("https://www.instagram.com/");
  }
}