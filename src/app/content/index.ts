window.addEventListener('load', (evt) => {
  let numTries = 0;
  const maxTries = 5;

  const intervalId = setInterval(() => {
    console.log('Trying to go secret mode...');

    const valuesClass = '.engine-value__label';
    const valuesElems = document.querySelectorAll(valuesClass);
    if (valuesElems && valuesElems?.length > 0) {
      valuesElems.forEach((item) => {
        const asterisk = document.createElement('div');
        asterisk.className = 'asterisk';
        asterisk.innerHTML = '*****';
        item?.nextElementSibling?.remove?.();
        item?.parentNode?.appendChild(asterisk);
      });

      console.log('Secret mode successful');
      if (numTries === maxTries) clearInterval(intervalId);
      numTries++;
    } else {
      console.log('Retrying...');
    }
  }, 500);
});
