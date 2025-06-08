function removeInstagramReels() {
  // Remove Reels button from sidebar/main feed
  const reelsLink = document.querySelector('a[href="/reels/"]');
  if (reelsLink) {
    // The structure is: div > span > div > a
    // So, to remove the outermost div, we need to go up 3 parent levels from the <a> tag.
    const reelsElement = reelsLink.parentElement?.parentElement?.parentElement;
    if (reelsElement) {
      reelsElement.remove();
    }
  }

  const reelsSvg = document.querySelector('svg[aria-label="Reels"]');
  if (reelsSvg) {
    // The structure is: outermost div > div > div > svg
    // So, to remove the outermost div, we need to go up 3 parent levels from the SVG.
    const reelsButtonContainer = reelsSvg.parentElement?.parentElement?.parentElement;
    if (reelsButtonContainer) {
      reelsButtonContainer.remove();
    }
  }
}

const observer = new MutationObserver(removeInstagramReels);
observer.observe(document.body, { childList: true, subtree: true });