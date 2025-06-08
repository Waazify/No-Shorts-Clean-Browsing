chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.enabled) {
    const enabled = changes.enabled.newValue;
    chrome.tabs.query({ url: ["*://*.youtube.com/*", "*://*.instagram.com/*", "*://*.linkedin.com/*"] }, (tabs) => {
      tabs.forEach((tab) => {
        if (enabled) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content_scripts/youtube.js"]
          });
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content_scripts/instagram.js"]
          });
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content_scripts/linkedin.js"]
          });
        } else {
          // Reload the tab to remove the injected scripts
          chrome.tabs.reload(tab.id);
        }
      });
    });
  }
});