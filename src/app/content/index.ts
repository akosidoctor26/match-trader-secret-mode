window.addEventListener('load', async (evt) => {
  let numTries = 0;
  const maxTries = 10;

  chrome.runtime.sendMessage({ type: 'PIN_MT_TAB' });

  const intervalId = setInterval(() => {
    const valuesElems = document.querySelectorAll('.engine-value__label');
    const profitPill = document.querySelector('.chart-title__symbol-profit');

    if (numTries < maxTries) {
      console.log('Trying to go secret mode...');

      // Header Values
      valuesElems?.forEach?.((item) => {
        const asterisk = document.createElement('div');
        asterisk.className = 'asterisk';
        asterisk.innerHTML = '*****';
        item?.nextElementSibling?.remove?.();
        item?.parentNode?.appendChild(asterisk);
      });

      // Profit Pill
      if (profitPill) profitPill?.remove?.();

      numTries++;
    } else {
      clearInterval(intervalId);
    }
  }, 500);
});
