import Image from "next/image";

export interface Wallet {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

export const EVM_WALLETS: Wallet[] = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "The most popular Ethereum wallet",
    icon: (
      <Image
        src="/metamask.svg"
        alt="MetaMask Wallet"
        width={32}
        height={32}
        className="w-8 h-8 rounded"
      />
    ),
  },
];

export const XRP_WALLETS: Wallet[] = [
  {
    id: "xaman",
    name: "Xaman",
    description: "Secure and trusted XRP Ledger wallet",
    icon: (
      <Image
        src="/xaman.png"
        alt="Xaman Wallet"
        width={32}
        height={32}
        className="w-8 h-8 rounded"
      />
    ),
  },
];

export const SUI_WALLETS: Wallet[] = [
  {
    id: "sui",
    name: "Sui Wallet",
    description: "Official Sui blockchain wallet",
    icon: (
      <Image
        src="/sui.png"
        alt="Sui Wallet"
        width={32}
        height={32}
        className="w-8 h-8 rounded"
      />
    ),
  },
];
