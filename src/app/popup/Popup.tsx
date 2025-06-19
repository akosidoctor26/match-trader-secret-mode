import React, { useEffect, useState } from 'react';
import { EVENT_TYPES } from '../constants';
import './popup.css';

const Popup = () => {
  const [enabled, setEnabled] = useState(false);

  // event handler when switch is changed
  const onChangePinTab = async (e) => {
    const isChecked = e.target.checked;

    // set state to reflect on the UI
    setEnabled(isChecked);

    chrome.tabs.query(
      { currentWindow: true, active: true },
      async function (tabs) {
        var activeTab = tabs[0];

        // send message to content script
        await chrome.tabs.sendMessage(activeTab.id, {
          type: EVENT_TYPES.ENABLE_TRADE_MODE,
          enabled: isChecked,
        });
      }
    );
  };

  const getMode = async () => {
    chrome.tabs.query(
      { currentWindow: true, active: true },
      async function (tabs) {
        var activeTab = tabs[0];

        // send message to content script
        await chrome.tabs.sendMessage(
          activeTab.id,
          {
            type: EVENT_TYPES.GET_TRADE_MODE,
          },
          (response) => {
            setEnabled(response);
          }
        );
      }
    );
  };

  useEffect(() => {
    getMode();
  }, []);

  return (
    <div style={{ width: 300, margin: '18px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label className="switch">
          <input type="checkbox" onChange={onChangePinTab} checked={enabled} />
          <span className="slider round"></span>
        </label>
        <div style={{ marginLeft: 20, fontSize: 18 }}>Trade Mode</div>
      </div>
    </div>
  );
};

export default Popup;
