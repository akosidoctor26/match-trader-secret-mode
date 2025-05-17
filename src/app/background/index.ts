import { EVENT_TYPES } from '../constants';

chrome.runtime.onMessage.addListener(async (request) => {
  const [tab] = await chrome.tabs.query({ active: true });
  const tabId = tab?.id;

  // when the secret's switch is changed from the popup...
  if (request.type === EVENT_TYPES.ENABLE_SECRET) {
    const enabled = request.enabled;

    if (tabId) {
      if (enabled) {
        // pin the tab because the PnL is displayed in the title
        chrome.tabs.update(tabId, { pinned: true }, () => {
          console.log(`${tabId} set to pinned=${true} successfully!`);
        });

        // Run the script file
        await chrome.scripting.executeScript({
          files: ['contentScript.js'],
          target: { tabId },
        });
      } else {
        // if secret is disabled
        // send message to the content to show the hidden original elements
        chrome.tabs.sendMessage(tabId, {
          type: 'DISABLE_SECRET_MODE',
        });
      }
    }
  }

  // when the page is about to unload
  if (request.type === EVENT_TYPES.CLEAR) {
    // remove the kv pair in the local storage to avoid polluting the storage
    if (tabId) await chrome.storage.local.remove(tabId?.toString());
  }
});
