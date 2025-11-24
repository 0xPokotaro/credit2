import {
  getExplorerTxUrl,
  getExplorerAddressUrl as getChainExplorerAddressUrl,
  getExplorerTokenUrl as getChainExplorerTokenUrl,
} from "@/config/chains";

// アドレスやハッシュを短縮表示する関数
// Re-export from centralized wallet-display utilities
export { shortenAddress } from "@/lib/utils/wallet-display";

// チェーン名とトランザクションハッシュからエクスプローラーURLを生成
export function getExplorerUrl(chainName: string, txHash: string): string {
  return getExplorerTxUrl(chainName, txHash);
}

// チェーン名とアドレスからエクスプローラーURLを生成
export function getExplorerAddressUrl(
  chainName: string,
  address: string,
): string {
  return getChainExplorerAddressUrl(chainName, address);
}

// チェーン名とトークンコントラクトアドレスからエクスプローラーURLを生成
export function getExplorerTokenUrl(
  chainName: string,
  contractAddress: string,
): string {
  return getChainExplorerTokenUrl(chainName, contractAddress);
}
