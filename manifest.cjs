module.exports = {
  manifest_version: 3,
  name: 'Match Trader Secret Mode',
  description: 'Hide Balance, Equity, Funds, PnL',
  version: '1.0.0',
  action: {
    default_popup: 'popup.html',
    default_icon: {
      16: 'images/icon16.png',
      32: 'images/icon32.png',
      48: 'images/icon48.png',
      128: 'images/icon128.png',
    },
  },
  background: {
    service_worker: 'background.js',
  },
  // options_ui: {
  //   page: 'options.html',
  //   open_in_tab: false,
  // },
  content_scripts: [
    {
      matches: [
        'https://mtr.e8markets.com/*',
        'https://demo.match-trader.com/*',
      ],
      js: ['contentScript.js'],
    },
  ],
  permissions: ['activeTab', 'scripting'],
};
