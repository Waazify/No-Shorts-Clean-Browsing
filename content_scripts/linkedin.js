function removeLinkedInShorts() {
  // Logic to remove LinkedIn video posts that might be considered short-form
  // This is a placeholder and needs to be refined based on LinkedIn's DOM structure
  document.querySelectorAll('.feed-shared-update-v2').forEach(post => {
    if (post.innerHTML.includes('video') && (post.innerHTML.includes('short') || post.innerHTML.includes('reel'))) {
      post.remove();
    }
  });
}

const observer = new MutationObserver(removeLinkedInShorts);
observer.observe(document.body, { childList: true, subtree: true });