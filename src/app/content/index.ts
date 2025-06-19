import { EVENT_TYPES } from '../constants';

window.addEventListener('load', async (evt) => {
  let numTries = 0;
  const maxTries = 10;

  chrome.runtime.sendMessage({ type: 'PIN_MT_TAB' });

  const intervalId = setInterval(() => {
    const headerValues = document.querySelectorAll('.engine-value__label');
    const chartTitle = document.querySelector('.chart-title__main');
    const chartTitleSymbol = document.querySelector('.chart-title__alias');
    const chartFrame = document.querySelector('.layout-main-desktop__chart');

    if (numTries < maxTries) {
      console.log('Trying to go secret mode...');

      // Header Values
      headerValues?.forEach?.((item) => {
        if (!item.nextElementSibling?.classList.contains('original_elem')) {
          const asterisk = document.createElement('div');
          asterisk.style.color = '#42c4e8';
          asterisk.className = 'asterisk';
          asterisk.innerHTML = '*****';

          if (item) {
            item.nextElementSibling.classList.add('original_elem');
            item.nextElementSibling.style.display = 'none';
            item?.parentNode?.appendChild(asterisk);
          }
        }
      });

      // Where Profit Pill is located
      if (chartTitle && !chartTitle.classList.contains('original_elem')) {
        const symbol = document.createElement('div');
        symbol.className = 'secret_mode_elem';
        symbol.innerText = chartTitleSymbol?.innerHTML || '';
        symbol.style.fontSize = '1.25rem';

        chartTitle.parentElement?.append(symbol);
        chartTitle.style.display = 'none';
        chartTitle.classList.add('original_elem');
      }

      // Chart
      if (chartFrame && !chartFrame.classList.contains('original_elem')) {
        chartFrame.style.display = 'none';
        chartFrame.classList.add('original_elem');
      }

      numTries++;
    } else {
      clearInterval(intervalId);
    }
  }, 500);

  chrome.runtime.onMessage.addListener(async (request) => {
    if (request.type === EVENT_TYPES.ENABLE_TRADE_MODE) {
      const chartFrame = document.querySelector('.layout-main-desktop__chart');
      chartFrame.style.display = request.enabled == true ? 'block' : 'none';
    }
  });

  chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
      if (request.type === EVENT_TYPES.GET_TRADE_MODE) {
        const chartFrame = document.querySelector(
          '.layout-main-desktop__chart'
        );

        sendResponse(chartFrame.style.display === 'block');
      }
    }
  );
});
