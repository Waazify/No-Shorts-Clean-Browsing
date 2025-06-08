const toggle = document.getElementById('toggleSwitch');
chrome.storage.local.get('enabled', (data) => {
  toggle.checked = data.enabled ?? true;
});

toggle.addEventListener('change', () => {
  chrome.storage.local.set({ enabled: toggle.checked });
});