/**
 * Unified Blockchain Chain Configuration
 * Centralizes all chain-related configuration including chain IDs, RPCs, explorers, and contract addresses
 */

import { isProduction } from "./env.server";

export type NetworkType = "mainnet" | "testnet";
export type WalletType = "metamask" | "xaman" | "sui";

/**
 * Contract addresses for a specific chain/network
 */
export interface ContractAddresses {
  usdcoin?: string;
  jpyc?: string;
  [key: string]: string | undefined;
}

/**
 * Unified chain configuration interface
 */
export interface ChainConfig {
  /** Unique chain identifier (e.g., 'avalanche-c', 'ethereum', 'xrp') */
  id: string;

  /** Display name for the chain */
  name: string;

  /** Network type (mainnet or testnet) */
  network: NetworkType;

  /** Chain ID in decimal format (for EVM chains) */
  chainId: string;

  /** Chain ID in hex format (for wallet connections) */
  chainIdHex?: string;

  /** Native token symbol */
  nativeTokenSymbol: string;

  /** Native token decimals */
  nativeTokenDecimals: number;

  /** RPC endpoint URLs */
  rpcUrls: string[];

  /** Block explorer base URL */
  explorerUrl: string;

  /** Block explorer name */
  explorerName?: string;

  /** Contract addresses deployed on this chain */
  contractAddresses: ContractAddresses;

  /** Supported wallet types for this chain */
  supportedWallets: WalletType[];

  /** API configuration (if applicable) */
  apiConfig?: {
    apiKey?: string;
    endpoint?: string;
  };
}

/**
 * Avalanche C-Chain Mainnet Configuration
 */
export const AVALANCHE_C_MAINNET: ChainConfig = {
  id: "avalanche-c-mainnet",
  name: "Avalanche C-Chain",
  network: "mainnet",
  chainId: "43114",
  chainIdHex: "0xa86a",
  nativeTokenSymbol: "AVAX",
  nativeTokenDecimals: 18,
  rpcUrls: [
    "https://api.avax.network/ext/bc/C/rpc",
    "https://avalanche-c-chain.publicnode.com",
  ],
  explorerUrl: "https://subnets.avax.network/c-chain",
  explorerName: "Avalanche Explorer",
  contractAddresses: {
    usdcoin: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    jpyc: "0xE7C3D8C9a439feDe00D2600032D5dB0Be71C3c29",
  },
  supportedWallets: ["metamask"],
};

/**
 * Avalanche C-Chain Testnet (Fuji) Configuration
 */
export const AVALANCHE_C_TESTNET: ChainConfig = {
  id: "avalanche-c-testnet",
  name: "Avalanche Fuji C-Chain",
  network: "testnet",
  chainId: "43113",
  chainIdHex: "0xa869",
  nativeTokenSymbol: "AVAX",
  nativeTokenDecimals: 18,
  rpcUrls: [
    "https://api.avax-test.network/ext/bc/C/rpc",
    "https://avalanche-fuji-c-chain.publicnode.com",
  ],
  explorerUrl: "https://subnets-test.avax.network/c-chain",
  explorerName: "Avalanche Fuji Explorer",
  contractAddresses: {
    usdcoin: "0x5425890298aed601595a70AB815c96711a31Bc65",
    // TODO: Add JPYC testnet address when available
    // jpyc: "0x...",
  },
  supportedWallets: ["metamask"],
};

/**
 * Ethereum Mainnet Configuration
 */
export const ETHEREUM_MAINNET: ChainConfig = {
  id: "ethereum-mainnet",
  name: "Ethereum Mainnet",
  network: "mainnet",
  chainId: "1",
  chainIdHex: "0x1",
  nativeTokenSymbol: "ETH",
  nativeTokenDecimals: 18,
  rpcUrls: ["https://eth.llamarpc.com", "https://ethereum.publicnode.com"],
  explorerUrl: "https://etherscan.io",
  explorerName: "Etherscan",
  contractAddresses: {},
  supportedWallets: ["metamask"],
};

/**
 * Polygon Mainnet Configuration
 */
export const POLYGON_MAINNET: ChainConfig = {
  id: "polygon-mainnet",
  name: "Polygon",
  network: "mainnet",
  chainId: "137",
  chainIdHex: "0x89",
  nativeTokenSymbol: "MATIC",
  nativeTokenDecimals: 18,
  rpcUrls: ["https://polygon-rpc.com", "https://polygon-bor.publicnode.com"],
  explorerUrl: "https://polygonscan.com",
  explorerName: "PolygonScan",
  contractAddresses: {},
  supportedWallets: ["metamask"],
};

/**
 * BSC Mainnet Configuration
 */
export const BSC_MAINNET: ChainConfig = {
  id: "bsc-mainnet",
  name: "BNB Smart Chain",
  network: "mainnet",
  chainId: "56",
  chainIdHex: "0x38",
  nativeTokenSymbol: "BNB",
  nativeTokenDecimals: 18,
  rpcUrls: ["https://bsc-dataseed.binance.org", "https://bsc.publicnode.com"],
  explorerUrl: "https://bscscan.com",
  explorerName: "BscScan",
  contractAddresses: {},
  supportedWallets: ["metamask"],
};

/**
 * Optimism Mainnet Configuration
 */
export const OPTIMISM_MAINNET: ChainConfig = {
  id: "optimism-mainnet",
  name: "Optimism",
  network: "mainnet",
  chainId: "10",
  chainIdHex: "0xa",
  nativeTokenSymbol: "ETH",
  nativeTokenDecimals: 18,
  rpcUrls: ["https://mainnet.optimism.io", "https://optimism.publicnode.com"],
  explorerUrl: "https://optimistic.etherscan.io",
  explorerName: "Optimism Explorer",
  contractAddresses: {},
  supportedWallets: ["metamask"],
};

/**
 * Arbitrum Mainnet Configuration
 */
export const ARBITRUM_MAINNET: ChainConfig = {
  id: "arbitrum-mainnet",
  name: "Arbitrum One",
  network: "mainnet",
  chainId: "42161",
  chainIdHex: "0xa4b1",
  nativeTokenSymbol: "ETH",
  nativeTokenDecimals: 18,
  rpcUrls: [
    "https://arb1.arbitrum.io/rpc",
    "https://arbitrum-one.publicnode.com",
  ],
  explorerUrl: "https://arbiscan.io",
  explorerName: "Arbiscan",
  contractAddresses: {},
  supportedWallets: ["metamask"],
};

/**
 * Base Mainnet Configuration
 */
export const BASE_MAINNET: ChainConfig = {
  id: "base-mainnet",
  name: "Base",
  network: "mainnet",
  chainId: "8453",
  chainIdHex: "0x2105",
  nativeTokenSymbol: "ETH",
  nativeTokenDecimals: 18,
  rpcUrls: ["https://mainnet.base.org", "https://base.publicnode.com"],
  explorerUrl: "https://basescan.org",
  explorerName: "BaseScan",
  contractAddresses: {},
  supportedWallets: ["metamask"],
};

/**
 * XRP Ledger Configuration
 */
export const XRP_MAINNET: ChainConfig = {
  id: "xrp-mainnet",
  name: "XRP Ledger",
  network: "mainnet",
  chainId: "xrp",
  nativeTokenSymbol: "XRP",
  nativeTokenDecimals: 6,
  rpcUrls: ["https://s1.ripple.com:51234", "https://xrplcluster.com"],
  explorerUrl: "https://livenet.xrpl.org",
  explorerName: "XRP Ledger Explorer",
  contractAddresses: {},
  supportedWallets: ["xaman"],
};

/**
 * Sui Mainnet Configuration
 */
export const SUI_MAINNET: ChainConfig = {
  id: "sui-mainnet",
  name: "Sui",
  network: "mainnet",
  chainId: "sui",
  nativeTokenSymbol: "SUI",
  nativeTokenDecimals: 9,
  rpcUrls: ["https://fullnode.mainnet.sui.io:443"],
  explorerUrl: "https://suiexplorer.com",
  explorerName: "Sui Explorer",
  contractAddresses: {},
  supportedWallets: ["sui"],
};

/**
 * All supported chains registry
 */
export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  // Avalanche
  "avalanche-c-mainnet": AVALANCHE_C_MAINNET,
  "avalanche-c-testnet": AVALANCHE_C_TESTNET,

  // EVM Chains
  "ethereum-mainnet": ETHEREUM_MAINNET,
  "polygon-mainnet": POLYGON_MAINNET,
  "bsc-mainnet": BSC_MAINNET,
  "optimism-mainnet": OPTIMISM_MAINNET,
  "arbitrum-mainnet": ARBITRUM_MAINNET,
  "base-mainnet": BASE_MAINNET,

  // Non-EVM Chains
  "xrp-mainnet": XRP_MAINNET,
  "sui-mainnet": SUI_MAINNET,
};

/**
 * Chain ID to Chain Config mapping for EVM chains
 */
export const CHAIN_ID_MAP: Record<string, ChainConfig> = {
  // Decimal format
  "43114": AVALANCHE_C_MAINNET,
  "43113": AVALANCHE_C_TESTNET,
  "1": ETHEREUM_MAINNET,
  "137": POLYGON_MAINNET,
  "56": BSC_MAINNET,
  "10": OPTIMISM_MAINNET,
  "42161": ARBITRUM_MAINNET,
  "8453": BASE_MAINNET,

  // Hex format
  "0xa86a": AVALANCHE_C_MAINNET,
  "0xa869": AVALANCHE_C_TESTNET,
  "0x1": ETHEREUM_MAINNET,
  "0x89": POLYGON_MAINNET,
  "0x38": BSC_MAINNET,
  "0xa": OPTIMISM_MAINNET,
  "0xa4b1": ARBITRUM_MAINNET,
  "0x2105": BASE_MAINNET,
};

/**
 * Legacy chain name to chain config mapping for backward compatibility
 */
export const CHAIN_NAME_MAP: Record<string, ChainConfig> = {
  "Avalanche C-Chain": AVALANCHE_C_MAINNET,
  "Avalanche Fuji C-Chain": AVALANCHE_C_TESTNET,
  "Avalance C-Chain": AVALANCHE_C_MAINNET, // Typo in wallet-utils.ts
  ethereum: ETHEREUM_MAINNET,
  polygon: POLYGON_MAINNET,
  bsc: BSC_MAINNET,
  optimism: OPTIMISM_MAINNET,
  arbitrum: ARBITRUM_MAINNET,
  base: BASE_MAINNET,
  xrp: XRP_MAINNET,
  sui: SUI_MAINNET,
};

/**
 * Get chain configuration by chain ID (supports both hex and decimal formats)
 */
export function getChainConfigByChainId(
  chainId: string,
): ChainConfig | undefined {
  return CHAIN_ID_MAP[chainId] || CHAIN_ID_MAP[chainId.toLowerCase()];
}

/**
 * Get chain configuration by chain identifier
 */
export function getChainConfig(
  chainIdentifier: string,
): ChainConfig | undefined {
  return SUPPORTED_CHAINS[chainIdentifier];
}

/**
 * Get chain configuration by chain name (for backward compatibility)
 */
export function getChainConfigByName(
  chainName: string,
): ChainConfig | undefined {
  return CHAIN_NAME_MAP[chainName];
}

/**
 * Get all supported chains as an array
 */
export function getSupportedChains(): ChainConfig[] {
  return Object.values(SUPPORTED_CHAINS);
}

/**
 * Get chains supported by a specific wallet type
 */
export function getChainsByWallet(walletType: WalletType): ChainConfig[] {
  return getSupportedChains().filter((chain) =>
    chain.supportedWallets.includes(walletType),
  );
}

/**
 * Get EVM chains only
 */
export function getEvmChains(): ChainConfig[] {
  return getSupportedChains().filter((chain) => chain.chainIdHex !== undefined);
}

/**
 * Get block explorer URL for a transaction
 */
export function getExplorerTxUrl(
  chainIdentifier: string,
  txHash: string,
): string {
  const config =
    getChainConfig(chainIdentifier) || getChainConfigByName(chainIdentifier);
  if (!config) {
    console.warn(`No chain config found for: ${chainIdentifier}`);
    return "#";
  }
  return `${config.explorerUrl}/tx/${txHash}`;
}

/**
 * Get block explorer URL for an address
 */
export function getExplorerAddressUrl(
  chainIdentifier: string,
  address: string,
): string {
  const config =
    getChainConfig(chainIdentifier) || getChainConfigByName(chainIdentifier);
  if (!config) {
    console.warn(`No chain config found for: ${chainIdentifier}`);
    return "#";
  }
  return `${config.explorerUrl}/address/${address}`;
}

/**
 * Get block explorer URL for a token contract
 */
export function getExplorerTokenUrl(
  chainIdentifier: string,
  contractAddress: string,
): string {
  const config =
    getChainConfig(chainIdentifier) || getChainConfigByName(chainIdentifier);
  if (!config) {
    console.warn(`No chain config found for: ${chainIdentifier}`);
    return "#";
  }
  return `${config.explorerUrl}/token/${contractAddress}`;
}

/**
 * Get the active Avalanche configuration based on environment
 * Returns mainnet in production, testnet otherwise
 */
export function getAvalancheConfig(): ChainConfig {
  return isProduction() ? AVALANCHE_C_MAINNET : AVALANCHE_C_TESTNET;
}

/**
 * Convert chain name to chain identifier
 * This helps with backward compatibility
 */
export function chainNameToId(chainName: string): string {
  const config = getChainConfigByName(chainName);
  return config?.id || chainName;
}
