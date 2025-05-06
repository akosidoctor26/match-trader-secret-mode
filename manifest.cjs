module.exports = {
  manifest_version: 3,
  name: 'MatchTrader Secret Mode',
  description: 'Hide Balance, Equity, Funds, PnL',
  version: '0.1.0',
  action: {
    default_popup: 'popup.html',
  },
  background: {
    service_worker: 'background.js',
  },
  content_scripts: [
    {
      matches: ['https://mtr.e8markets.com/*'],
      js: ['contentScript.js'],
    },
  ],
  permissions: [],
};
