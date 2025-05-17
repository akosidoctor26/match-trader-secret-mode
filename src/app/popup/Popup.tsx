import React, { useEffect, useState } from 'react';
import { EVENT_TYPES } from '../constants';
import './popup.css';

const Popup = () => {
  const [enabled, setEnabled] = useState(false);
  const [tabId, setTabId] = useState<number>(-1);

  // event handler when switch is changed
  const onChangePinTab = async (e) => {
    const isChecked = e.target.checked;

    // set state to reflect on the UI
    setEnabled(isChecked);

    // set the storage for future use
    await chrome?.storage?.local?.set({ [tabId]: isChecked });

    // send message to background so that it can inject the script
    await chrome.runtime.sendMessage({
      type: EVENT_TYPES.ENABLE_SECRET,
      enabled: isChecked,
    });
  };

  const manageSecretSettings = async () => {
    // get the active tab's id
    const [tab] = await chrome?.tabs?.query({ active: true });
    const tabId = tab.id;

    if (tabId) {
      setTabId(tab.id);

      // using the active tab's id as a key, get the enabled value from the local storage
      const local = await chrome?.storage?.local?.get(tabId.toString());

      if (local)
        // set state to reflect on the UI
        setEnabled(local[tabId] === undefined ? false : local[tabId]);
    }
  };

  useEffect(() => {
    // When popup loads, check if secret mode is enabled for this tab from storage
    manageSecretSettings();
  }, []);

  return (
    <div style={{ width: 300, margin: '18px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label className="switch">
          <input type="checkbox" onChange={onChangePinTab} checked={enabled} />
          <span className="slider round"></span>
        </label>
        <div style={{ marginLeft: 20, fontSize: 18 }}>
          Secret Mode: {enabled ? 'ON' : 'OFF'}
        </div>
      </div>
      <div>
        <p>
          If this Chrome extension has made your trading smoother, more
          profitable, or just a little less stressful, consider showing some
          love! Your support helps keep this tool running and improving.
        </p>
        <a href="https://buymeacoffee.com/tieroneapps" target="_blank">
          Buy me a coffee
        </a>
        <p style={{ fontSize: 10 }}>https://buymeacoffee.com/tieroneapps</p>
      </div>
      <div style={{ marginTop: '24px' }}>
        <a href="https://e8markets.com/a/B3C909BA" target="_blank">
          Join E8 Markets today!
        </a>
        <p>Over $53,000,000 paid to Traders.</p>
        <p>
          Get 5% Off: <b>MTSECRETOFF5</b>
        </p>
      </div>
    </div>
  );
};

export default Popup;
