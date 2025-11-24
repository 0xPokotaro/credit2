/**
 * Centralized utility functions for wallet and chain display formatting.
 * This module consolidates duplicate formatting functions used across the application.
 */

/**
 * Gets the display name for a wallet type.
 *
 * @param type - The wallet type identifier (e.g., "metamask", "xaman", "sui")
 * @returns The human-readable wallet name or "Unknown" if not recognized
 *
 * @example
 * getWalletDisplayName("metamask") // Returns "MetaMask"
 * getWalletDisplayName("xaman") // Returns "Xaman"
 */
export function getWalletDisplayName(type: string | null): string {
  if (!type) return "";

  switch (type) {
    case "xaman":
      return "Xaman";
    case "metamask":
      return "MetaMask";
    case "sui":
      return "Sui Wallet";
    default:
      return "Unknown";
  }
}

/**
 * Gets the display name for a blockchain chain.
 *
 * @param chainName - The chain identifier (e.g., "ethereum", "polygon", "xrp")
 * @returns The human-readable chain name or the original name if not recognized
 *
 * @example
 * getChainDisplayName("ethereum") // Returns "Ethereum"
 * getChainDisplayName("xrp") // Returns "XRP Ledger"
 */
export function getChainDisplayName(chainName: string | null): string {
  if (!chainName) return "";

  switch (chainName) {
    case "xrp":
      return "XRP Ledger";
    case "ethereum":
      return "Ethereum";
    case "polygon":
      return "Polygon";
    case "bsc":
      return "BSC";
    case "optimism":
      return "Optimism";
    case "arbitrum":
      return "Arbitrum";
    case "base":
      return "Base";
    default:
      return chainName;
  }
}

/**
 * Shortens an address or hash for display purposes.
 * Takes the first N characters and last M characters, joining them with "...".
 *
 * @param address - The full address or hash to shorten
 * @param startLength - Number of characters to show at the start (default: 6)
 * @param endLength - Number of characters to show at the end (default: 4)
 * @returns The shortened address in the format "0x1234...5678"
 *
 * @example
 * shortenAddress("0x1234567890abcdef1234567890abcdef12345678") // Returns "0x1234...5678"
 * shortenAddress("0x1234567890abcdef1234567890abcdef12345678", 8, 6) // Returns "0x123456...345678"
 */
export function shortenAddress(
  address: string | null,
  startLength = 6,
  endLength = 4,
): string {
  if (!address || address.length <= startLength + endLength) {
    return address || "";
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

/**
 * Alias for shortenAddress to maintain backward compatibility.
 *
 * @deprecated Use shortenAddress instead
 */
export const formatAddress = shortenAddress;
