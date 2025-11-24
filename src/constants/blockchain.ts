/**
 * @deprecated This file is deprecated. Use @/config/chains instead.
 * This file is kept for backward compatibility only.
 */

import {
  AVALANCHE_C_MAINNET,
  AVALANCHE_C_TESTNET,
  getAvalancheConfig as getAvalancheChainConfig,
} from "@/config/chains";

/**
 * @deprecated Use AVALANCHE_C_MAINNET or AVALANCHE_C_TESTNET from @/config/chains instead
 */
export const AVAX_C_CHAIN = {
  mainnet: {
    chainId: AVALANCHE_C_MAINNET.chainId,
    EXPLORER_URL: AVALANCHE_C_MAINNET.explorerUrl,
    contractAddresses: AVALANCHE_C_MAINNET.contractAddresses,
  },
  testnet: {
    chainId: AVALANCHE_C_TESTNET.chainId,
    EXPLORER_URL: AVALANCHE_C_TESTNET.explorerUrl,
    contractAddresses: AVALANCHE_C_TESTNET.contractAddresses,
  },
};

/**
 * @deprecated Use getAvalancheConfig from @/config/chains instead
 */
export function getAvalancheConfig() {
  const config = getAvalancheChainConfig();
  return {
    chainId: config.chainId,
    EXPLORER_URL: config.explorerUrl,
    contractAddresses: config.contractAddresses,
  };
}
