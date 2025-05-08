const init = async () => {
  const local = await chrome?.storage?.local?.get(['pinTab']);
  const tabs = await chrome.tabs.query({
    url: ['https://mtr.e8markets.com/*'],
  });
  const pinned = local?.pinTab === undefined ? true : local?.pinTab;

  tabs?.forEach((tab) => {
    if (tab && tab.id) {
      chrome.tabs.update(tab?.id, { pinned }, () => {
        console.log(`${tab.id} set to pinned=${pinned} successfully!`);
      });
    }
  });
};

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request?.type == 'PIN_MT_TAB') {
    init();
  }
});
