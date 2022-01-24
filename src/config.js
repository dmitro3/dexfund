const configs = {
  DEV: {
    JSON_RPC: "http://127.0.0.1:8545/",
    gasLimit: "30000",
  },
  DB_URL: "mongodb://localhost:27017/dexify-dapp",
  // MAINNET_ENDPOINT: "https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme",
  MAINNET_ENDPOINT: "https://api.thegraph.com/subgraphs/name/trust0212/dexify-finance-subgraph",
  TESTNET_ENDPOINT: "https://api.thegraph.com/subgraphs/name/trust0212/dexify-subgraph",
  DEBUG_MODE: false,
  BLACKLISTED_VAULTS: [],
  FALLBACK_PROVIDER:
    "https://bsc-dataseed.binance.org/",
  networkId: 56,
  networkId_DEBUG: 97,
  FALLBACK_PROVIDER_DEBUG:
    "https://data-seed-prebsc-1-s1.binance.org:8545/",
  API_ENDPOINT: "http://localhost:3001",
};

module.exports = configs;
