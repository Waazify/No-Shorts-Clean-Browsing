let isExtensionEnabled = true;

function removeFacebookReelsFeed() {
    if (!isExtensionEnabled) {
        console.log('Extension is disabled. Not removing Facebook Reels feed.');
        return;
    }
    // Select the div element based on the provided class names for the Reels feed
    const reelsDiv = document.querySelector('div.x1g0ag68.xx6bhzk.x11xpdln.xcj1dhv.x1ey2m1c.x9f619.xds687c.x17qophe.x10l6tqk.x13vifvy');

    if (reelsDiv) {
        reelsDiv.remove();
        console.log('Facebook Reels feed element removed.');
    }
}

function removeFacebookReelsElement() {
    if (!isExtensionEnabled) {
        console.log('Extension is disabled. Not removing Facebook Reels element.');
        return;
    }
    // Select the element based on the new set of class names
    const reelsElement = document.querySelector('div.x6s0dn4.x78zum5.xnpuxes');

    if (reelsElement) {
        reelsElement.remove();
        console.log('Facebook Reels element with new classes removed.');
    }
}

function redirectFromReels() {
    if (!isExtensionEnabled) {
        console.log('Extension is disabled. Not redirecting from Facebook Reels.');
        return;
    }
    if (window.location.pathname.includes('/reel/')) {
        window.location.replace('https://www.facebook.com/');
    }
}

// Initial check and set up listener for extension state
chrome.storage.local.get('enabled', (data) => {
    isExtensionEnabled = data.enabled ?? true;
    if (isExtensionEnabled) {
        removeFacebookReelsFeed();
        removeFacebookReelsElement();
        redirectFromReels();
    }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.enabled !== undefined) {
        isExtensionEnabled = changes.enabled.newValue;
        console.log('Extension enabled state changed to:', isExtensionEnabled);
        if (isExtensionEnabled) {
            removeFacebookReelsFeed();
            removeFacebookReelsElement();
            redirectFromReels();
        }
    }
});

// Use MutationObserver to remove elements that load later
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
            removeFacebookReelsFeed();
            removeFacebookReelsElement();
        }
    });
});
observer.observe(document.body, { childList: true, subtree: true });

// Listen for popstate events (e.g., when user navigates back/forward)
window.addEventListener('popstate', redirectFromReels);

// Periodically check for redirection (for single-page applications)
setInterval(redirectFromReels, 1000);