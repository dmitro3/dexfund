import AaveAdapter from "./ethereum/abis/AaveAdapter.json";
import AlphaHomoraV1Adapter from "./ethereum/abis/AlphaHomoraV1Adapter.json";
import CompoundAdapter from "./ethereum/abis/CompoundAdapter.json";
import CurveExchangeAdapter from "./ethereum/abis/CurveExchangeAdapter.json";
import CurveLiquidityAaveAdapter from "./ethereum/abis/CurveLiquidityAaveAdapter.json";
import CurveLiquidityEursAdapter from "./ethereum/abis/CurveLiquidityEursAdapter.json";
import CurveLiquiditySethAdapter from "./ethereum/abis/CurveLiquiditySethAdapter.json";
import CurveLiquidityStethAdapter from "./ethereum/abis/CurveLiquidityStethAdapter.json";

const configs = {
  SUB_GRAPH_ENDPOINT:
    "https://api.thegraph.com/subgraphs/name/trust0212/radar-graph",
  ENZYME_ENDPOINT:
    "https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme",

  DEV: {
    JSON_RPC: "http://127.0.0.1:8545/",
    gasLimit: "30000",
  },
  MAINNET_ENDPOINT: "",
  DEBUG_MODE: true,
  ADAPTERS: [
    {
      name: "AAVE",
      address: AaveAdapter.address,
    },
    {
      name: "Alpha Homora",
      address: AlphaHomoraV1Adapter.address,
    },
    {
      name: "Compound",
      address: CompoundAdapter.address,
    },
    {
      name: "Curve Exchange",
      address: CurveExchangeAdapter.address,
    },
    {
      name: "Curve Aave Liquidity Pool",
      address: CurveLiquidityAaveAdapter.address,
    },
    {
      name: "Curve Eurs Liquidity Pool",
      address: CurveLiquidityEursAdapter.address,
    },
    {
      name: "Curve Liquidity Seth Pool",
      address: CurveLiquiditySethAdapter.address,
    },
    {
      name: "Curve Liquidity Steth Pool",
      address: CurveLiquidityStethAdapter.address,
    },
  ],
};

export default configs;
