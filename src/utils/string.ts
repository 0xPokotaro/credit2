// アドレスやハッシュを短縮表示する関数
export function shortenAddress(
  address: string,
  startLength = 6,
  endLength = 4,
): string {
  if (!address || address.length <= startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

import { getAvalancheConfig } from "@/constants/blockchain";

// チェーン名とトランザクションハッシュからエクスプローラーURLを生成
export function getExplorerUrl(chainName: string, txHash: string): string {
  if (chainName === "Avalanche C-Chain") {
    const config = getAvalancheConfig();
    return `${config.EXPLORER_URL}/tx/${txHash}`;
  }
  // 将来的に他のチェーンも追加可能
  return "#";
}

// チェーン名とアドレスからエクスプローラーURLを生成
export function getExplorerAddressUrl(
  chainName: string,
  address: string,
): string {
  if (chainName === "Avalanche C-Chain") {
    const config = getAvalancheConfig();
    return `${config.EXPLORER_URL}/address/${address}`;
  }
  // 将来的に他のチェーンも追加可能
  return "#";
}

// チェーン名とトークンコントラクトアドレスからエクスプローラーURLを生成
export function getExplorerTokenUrl(
  chainName: string,
  contractAddress: string,
): string {
  if (chainName === "Avalanche C-Chain") {
    const config = getAvalancheConfig();
    return `${config.EXPLORER_URL}/token/${contractAddress}`;
  }
  // 将来的に他のチェーンも追加可能
  return "#";
}
