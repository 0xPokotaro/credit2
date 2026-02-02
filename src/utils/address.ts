/**
 * EVM形式（0x + 40文字の16進）かどうかを判定する
 */
export function isEvmAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address.trim());
}

/**
 * XRPLクラシックアドレス（r始まり、Base58、25〜34文字）かどうかを判定する
 */
export function isXrplAddress(address: string): boolean {
  return /^r[1-9A-HJ-NP-Za-km-z]{24,33}$/.test(address.trim());
}
