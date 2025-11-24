export const AVAX_C_CHAIN = {
  mainnet: {
    chainId: "43114",
    EXPLORER_URL: "https://subnets.avax.network/c-chain",
    contractAddresses: {
      usdcoin: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    },
  },
  testnet: {
    chainId: "43113",
    EXPLORER_URL: "https://subnets-test.avax.network/c-chain",
    contractAddresses: {
      usdcoin: "0x5425890298aed601595a70AB815c96711a31Bc65",
    },
  },
};

export function getAvalancheConfig() {
  return process.env.NODE_ENV === "production"
    ? AVAX_C_CHAIN.mainnet
    : AVAX_C_CHAIN.testnet;
}
