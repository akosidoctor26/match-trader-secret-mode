const init = async () => {
  const tabs = await chrome.tabs.query({
    url: ['https://mtr.e8markets.com/*'],
  });

  tabs?.forEach((tab) => {
    if (tab && tab.id) {
      chrome.tabs.update(tab?.id, { pinned: true }, () => {
        console.log(`E8 Markets ${tab.id} set to successfully!`);
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
