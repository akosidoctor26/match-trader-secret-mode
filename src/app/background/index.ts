chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: 'OFF' });
});

//#region Handler when action badge is clicked
chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab.id;
  if (tabId) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId,
      text: nextState,
    });

    if (nextState === 'ON') {
      chrome.tabs.update(tabId, { pinned: true }, () => {
        console.log(`${tabId} set to pinned=${true} successfully!`);
      });

      // Run the script file when the user turns the extension on
      await chrome.scripting.executeScript({
        files: ['contentScript.js'],
        target: { tabId },
      });
    } else if (nextState === 'OFF') {
      // Show the hidden original elements when secret mode is disabled
      chrome.tabs.sendMessage(tabId, {
        type: 'DISABLE_SECRET_MODE',
      });
    }
  }
});
//#endregion
