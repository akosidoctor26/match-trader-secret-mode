import React, { useEffect, useState } from 'react';

const Popup = () => {
  const [allowPin, setAllowPin] = useState<boolean>(true);

  const setupPinSettings = async () => {
    const local = await chrome?.storage?.local?.get(['pinTab']);
    if (local.pinTab === undefined) {
      setAllowPin(true);
      await chrome?.storage?.local?.set({ pinTab: true });
    } else {
      setAllowPin(local?.pinTab);
    }
  };

  useEffect(() => {
    setupPinSettings();
  }, []);

  const onChangePinTab = async () => {
    const newVal = !allowPin;
    setAllowPin(newVal);
    await chrome?.storage?.local?.set({ pinTab: newVal });
    chrome.runtime.sendMessage({ type: 'PIN_MT_TAB' });
  };

  const setSecretMode = () => {
    chrome.runtime.sendMessage({ type: 'ENABLE_SECRET_MODE' });
  };

  return (
    <div style={{ width: 300, margin: '12px' }}>
      <h3>Match Trader Secret Mode</h3>
      <div style={{ margin: '12px 0' }}>
        <label>Domain: </label>
        <input placeholder="mtr.e8markets.com" type="text" />
      </div>
      <div>
        <span>
          <input type="checkbox" onChange={onChangePinTab} checked={allowPin} />
          Pin tab to Hide PnL
        </span>
      </div>
      <hr />
      <div>
        <p>
          If this Chrome extension has made your trading smoother, more
          profitable, or just a little less stressful, consider showing some
          love! Your support helps keep this tool running and improving.
        </p>
        <a href="https://buymeacoffee.com/tieroneapps" target="_blank">
          Buy me a coffee
        </a>
        <br />
        <p style={{ fontSize: 10 }}>https://buymeacoffee.com/tieroneapps</p>
      </div>
      <div>
        <p>TODO: Add E8 Affiliate</p>
      </div>
      <div>
        <button onClick={setSecretMode}>Secret Mode</button>
      </div>
    </div>
  );
};

export default Popup;
