import configs from './../config';
import Onboard from 'bnc-onboard'

import store from './../redux/store';
import { ACCOUNT_CHANGE, ACCOUNT_DISCONNECT, ONBOARD_CREATED, ONBOARD_UPDATED, ONBOARD_ADDRESS_CHANGE, ONBOARD_BALANCE_UPDATE, ONBOARD_NETWORK_CHANGE } from './../redux/actions/OnboardActions';

const netId = () => {
    return configs.DEBUG_MODE ? configs.networkId_DEBUG : configs.networkId;
}

const onboardUpdateWallet = (wallet) => {
  console.log("UPDATING WALLET")
  var state = store.getState();
  console.log("STATE: "+JSON.stringify(state))
  if (state.onboard.walletConnected)
    store.dispatch({
      type: ACCOUNT_CHANGE,
      payload: wallet
    })
}

const onboardUpdateAddress = (address) => {
  console.log("UPDATING ADDRESS")
  var state = store.getState();
  if (state.onboard.walletConnected)
    store.dispatch({
      type: ONBOARD_ADDRESS_CHANGE,
      payload: address
    })
    // addressChange(address);
}

const onboardUpdateBalance = (balance) => {
  console.log("UPDATING BALANCE")
  var state = store.getState();
  if (state.onboard.walletConnected)
    store.dispatch({
      type: ONBOARD_BALANCE_UPDATE,
      payload: balance
    })
}

const onboardUpdateNetwork = (network) => {
  var state = store.getState();
  if (state.onboard.walletConnected)
    store.dispatch({
      type: ONBOARD_NETWORK_CHANGE,
      payload: network
    });
}

export function initOnboard() {
    const onboard = Onboard;
    
    const rpcUrl = configs.DEBUG_MODE ? configs.FALLBACK_PROVIDER_DEBUG : configs.FALLBACK_PROVIDER;
    return onboard({
    //   dappId,
      hideBranding: false,
      networkId: netId(),
    //   apiUrl,
      darkMode: true,
      subscriptions: {
          wallet: onboardUpdateWallet,
          address: onboardUpdateAddress,
          balance: onboardUpdateBalance,
          network: onboardUpdateNetwork
      },
      walletSelect: {
        wallets: [
          { walletName: 'metamask', preferred: true },
          {
            walletName: 'trezor',
            appUrl: 'https://radarprotocol.com',
            email: 'contact@radar.global',
            rpcUrl,
            preferred: true
          },
          {
            walletName: 'ledger',
            rpcUrl,
            preferred: true
          },
          {
            walletName: 'walletConnect',
            rpc: {
                [42]: configs.FALLBACK_PROVIDER_DEBUG,
                [1]: configs.FALLBACK_PROVIDER,
                [31337]: configs.FALLBACK_PROVIDER_DEBUG
            },
            preferred: true
          },
          { walletName: 'coinbase', preferred: true, rpcUrl },
          { walletName: "gnosis" },
        //   { walletName: 'cobovault', appName: 'React Demo', rpcUrl },
        //   { walletName: 'keystone', appName: 'React Demo', rpcUrl },
        //   { walletName: 'keepkey', rpcUrl },
        //   {
        //     walletName: 'lattice',
        //     appName: 'Onboard Demo',
        //     rpcUrl
        //   },
        //   { walletName: 'status' },
        //   { walletName: 'walletLink', rpcUrl },
        //   {
        //     walletName: 'portis',
        //     apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
        //   },
          { walletName: 'fortmatic', apiKey: 'pk_live_FAF338DA9462AB2F' },
        //   { walletName: 'torus' },
        //   { walletName: 'trust', rpcUrl },
        //   { walletName: 'opera' },
        //   { walletName: 'operaTouch' },
        //   { walletName: 'imToken', rpcUrl },
        //   { walletName: 'meetone' },
        //   { walletName: 'mykey', rpcUrl },
        //   { walletName: 'wallet.io', rpcUrl },
          { walletName: 'huobiwallet', rpcUrl, preferred: true },
        //   { walletName: 'alphawallet', rpcUrl },
        //   { walletName: 'hyperpay' },
        //   { walletName: 'atoken' },
        //   { walletName: 'liquality' },
        //   { walletName: 'frame' },
        //   { walletName: 'tokenpocket', rpcUrl },
        //   { walletName: 'authereum', disableNotifications: true },
        //   { walletName: 'ownbit' },
        //   { walletName: 'gnosis' },
        //   { walletName: 'dcent' },
        //   { walletName: 'bitpie' },
        //   { walletName: 'xdefi' },
        //   { walletName: 'binance' },
        //   { walletName: 'tp' },
        ]
      },
      walletCheck: [
        { checkName: 'derivationPath' },
        { checkName: 'connect' },
        { checkName: 'accounts' },
        { checkName: 'network' },
        // { checkName: 'balance', minimumBalance: '100000' }
      ]
    })
  }
  
//   export function initNotify() {
//     const notify = staging ? stagingNotify : Notify
//     return notify({
//     //   dappId,
//       networkId: netId(),
//     //   apiUrl,
//       onerror: error => console.log(`Notify error: ${error.message}`)
//     })
//   }