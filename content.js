chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'hideShortsInfo') {
    const metaPanel = document.getElementById('metapanel');
    if (metaPanel) {
      metaPanel.style.display = 'none';
      sendResponse({ status: "success", message: "#metapanel hidden." });
    } else {
      sendResponse({ status: "error", message: "#metapanel not found." });
    }
  } else if (request.action === 'hideActions') {
    const actionsPanel = document.getElementById('actions');
    if (actionsPanel) {
      actionsPanel.style.display = 'none';
      sendResponse({ status: "success", message: "#actions hidden." });
    } else {
      sendResponse({ status: "error", message: "#actions not found." });
    }
  }
  // Keep the message channel open for asynchronous response
  return true;
});
