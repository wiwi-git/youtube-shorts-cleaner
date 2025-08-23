// The class that will be added to the body to activate the styles
const BODY_CLASS = 'shorts-cleaner-active';

/**
 * Checks the stored 'enabled' state and adds or removes the BODY_CLASS from the document body.
 */
const applyStyling = async () => {
  try {
    // Default to false if not set
    const { enabled = false } = await chrome.storage.sync.get('enabled');
    document.body.classList.toggle(BODY_CLASS, enabled);
  } catch (e) {
    console.error('YouTube Shorts Cleaner: Error applying styles.', e);
  }
};

/**
 * Listen for changes in storage, which happens when the user clicks the toggle in the popup.
 */
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.enabled) {
    // Apply the new state (enabled or disabled)
    document.body.classList.toggle(BODY_CLASS, changes.enabled.newValue);
  }
});

/**
 * Use a MutationObserver to detect navigation between Shorts videos.
 * The <title> tag of the page changes for every Short, making it a reliable and lightweight hook.
 */
const observer = new MutationObserver(() => {
  // Re-apply styles whenever the title changes, which indicates a new video has loaded.
  applyStyling();
});

// Find the title element to observe.
const titleElement = document.querySelector('head > title');
if (titleElement) {
  observer.observe(titleElement, { childList: true });
}

// Apply the initial styling when the content script is first injected.
applyStyling();
