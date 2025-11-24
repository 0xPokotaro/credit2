export const AVAX_C_CHAIN = {
  mainnet: {
    chainId: "43114",
    EXPLORER_URL: "https://subnets.avax.network/c-chain",
  },
  testnet: {
    chainId: "43113",
    EXPLORER_URL: "https://subnets-test.avax.network/c-chain",
  },
};

export function getAvalancheConfig() {
  return process.env.NODE_ENV === "production"
    ? AVAX_C_CHAIN.mainnet
    : AVAX_C_CHAIN.testnet;
}
