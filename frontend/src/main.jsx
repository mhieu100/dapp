import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import Root from './App.jsx';
import { store } from './redux/store.js';
import vi_VI from 'antd/locale/vi_VN';
import { config } from './config/wagmi.js'
import './index.css';
import { ConfigProvider } from 'antd';
import { MetaMask, WagmiWeb3ConfigProvider } from '@ant-design/web3-wagmi';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(

  <React.StrictMode>
    <WagmiWeb3ConfigProvider
     config={config}
      eip6963={{
        autoAddInjectedWallets: true,
      }}
      ens
      wallets={[
        MetaMask(),
      ]}
    >
      <ConfigProvider locale={vi_VI}>
        <Provider store={store}>
          <Root />
        </Provider>
      </ConfigProvider>
    </WagmiWeb3ConfigProvider>
  </React.StrictMode>,
);