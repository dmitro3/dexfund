const configs = {
  // ENZYME_ENDPOINT:
  //   "https://api.thegraph.com/subgraphs/name/trust0212/radar-graph",
  ENZYME_ENDPOINT:
    "https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme",

  DEV: {
    JSON_RPC: "http://127.0.0.1:8545/",
    gasLimit: "30000",
  },
  DB_URL: "mongodb://localhost:27017/radar-dapp",
  MAINNET_ENDPOINT: "",
  DEBUG_MODE: true,
  BLACKLISTED_VAULTS: [],
  FALLBACK_PROVIDER:
    "https://eth-mainnet.alchemyapi.io/v2/BMl6OKMeu0A6ZnM8gj5oBrzdO63r5SXH",
  networkId: 1,
  networkId_DEBUG: 42,
  FALLBACK_PROVIDER_DEBUG:
    "https://eth-kovan.alchemyapi.io/v2/X44WO7iHzVgNQD6unUphe9NoRanDzOiR",
};

module.exports = configs;
