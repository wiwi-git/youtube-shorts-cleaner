const hideInfoBtn = document.getElementById('hideInfoBtn');
const hideActionsBtn = document.getElementById('hideActionsBtn');

hideInfoBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Ensure we are on a YouTube Shorts page before sending the message
  if (tab.url && tab.url.startsWith('https://www.youtube.com/shorts/')) {
    chrome.tabs.sendMessage(tab.id, { action: 'hideShortsInfo' });
  } else {
    // Optional: Provide feedback to the user if they are not on a Shorts page
    console.log("Not a YouTube Shorts page.");
  }
});

hideActionsBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.url && tab.url.startsWith('https://www.youtube.com/shorts/')) {
    chrome.tabs.sendMessage(tab.id, { action: 'hideActions' });
  }
});