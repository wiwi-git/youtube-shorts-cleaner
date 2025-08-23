const toggleSwitch = document.getElementById('toggleSwitch');
const CSS_FILE = 'styles.css';

// Load the saved state and set the toggle switch
chrome.storage.sync.get('enabled', (data) => {
  toggleSwitch.checked = !!data.enabled;
});

toggleSwitch.addEventListener('change', async () => {
  const enabled = toggleSwitch.checked;
  
  // Save the new state
  chrome.storage.sync.set({ enabled });

  // Get the current active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Apply or remove the CSS based on the new state
  if (tab.url.startsWith('https://www.youtube.com/shorts/')) {
    if (enabled) {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: [CSS_FILE],
      });
    } else {
      chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: [CSS_FILE],
      });
    }
  }
});
