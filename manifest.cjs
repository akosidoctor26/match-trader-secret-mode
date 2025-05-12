module.exports = {
  manifest_version: 3,
  name: 'MatchTrader Secret Mode',
  description: 'Hide Balance, Equity, Funds, PnL',
  version: '0.1.0',
  action: {
    // default_popup: 'popup.html',
    default_icon: {
      16: 'images/icon-16.png',
      32: 'images/icon-32.png',
      48: 'images/icon-48.png',
      128: 'images/icon-128.png',
    },
  },
  background: {
    service_worker: 'background.js',
  },
  // content_scripts: [
  //   {
  //     matches: [
  //       'https://mtr.e8markets.com/*',
  //       'https://demo.match-trader.com/*',
  //     ],
  //     js: ['contentScript.js'],
  //   },
  // ],
  permissions: ['tabs', 'storage', 'activeTab', 'scripting'],
};
