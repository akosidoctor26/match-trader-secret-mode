const headerValues = document.querySelectorAll('.engine-value__label');
const chartTitle = document.querySelector('.chart-title__main');
const chartTitleSymbol = document.querySelector('.chart-title__alias');

console.log('Secret Mode On...');

// Header Values
headerValues?.forEach?.((item) => {
  const asterisk = document.createElement('div');
  asterisk.className = 'asterisk secret_mode_elem';
  asterisk.innerHTML = '*****';

  if (item) {
    item.nextElementSibling.classList.add('original_elem');
    item.nextElementSibling.style.display = 'none';
    item?.parentNode?.appendChild(asterisk);
  }
});

// To Hide the Profit Pill, remove the parent
if (chartTitle) {
  const symbol = document.createElement('div');
  symbol.className = 'secret_mode_elem';
  symbol.innerText = chartTitleSymbol?.innerHTML || '';
  symbol.style.fontSize = '1.25rem';

  chartTitle.parentElement?.append(symbol);
  chartTitle.style.display = 'none';
}

// to make sure this will only run once
if (!window.contentScriptExecuted) {
  chrome.runtime.onMessage.addListener(async (request) => {
    if (request.type === 'DISABLE_SECRET_MODE') {
      console.log('Secret Mode Off...');

      chartTitle.style.display = 'flex';

      document.querySelectorAll('.secret_mode_elem')?.forEach((secret) => {
        secret.style.display = 'none';
      });

      document.querySelectorAll('.original_elem')?.forEach((secret) => {
        secret.style.display = 'block';
      });
    } else {
    }
  });
  window.contentScriptExecuted = true;
}
