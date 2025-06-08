let isExtensionEnabled = true;

function removeLinkedInShorts() {
  if (!isExtensionEnabled) {
    console.log('Extension is disabled. Not removing LinkedIn Shorts.');
    return;
  }
  // Logic to remove LinkedIn video posts that might be considered short-form
  // This is a placeholder and needs to be refined based on LinkedIn's DOM structure
  document.querySelectorAll('.feed-shared-update-v2').forEach(post => {
    if (post.innerHTML.includes('video') && (post.innerHTML.includes('short') || post.innerHTML.includes('reel'))) {
      post.remove();
    }
  });
}

// Initial check and set up listener for extension state
chrome.storage.local.get('enabled', (data) => {
  isExtensionEnabled = data.enabled ?? true;
  if (isExtensionEnabled) {
    removeLinkedInShorts();
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.enabled !== undefined) {
    isExtensionEnabled = changes.enabled.newValue;
    console.log('Extension enabled state changed to:', isExtensionEnabled);
    if (isExtensionEnabled) {
      removeLinkedInShorts();
    }
  }
});

const observer = new MutationObserver(() => {
  if (isExtensionEnabled) {
    removeLinkedInShorts();
  }
});
observer.observe(document.body, { childList: true, subtree: true });