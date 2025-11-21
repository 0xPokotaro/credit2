import { XamanClient } from "./xrpl/xaman";
import { MetaMaskClient } from "./evm/metamask";
import { SuiWalletClient } from "./sui/sui-wallet";
import { useWalletStore } from "../stores/wallet-store";

export class WalletManager {
  private xamanClient: XamanClient | null = null;
  private metaMaskClient: MetaMaskClient;
  private suiClient: SuiWalletClient;

  constructor() {
    try {
      this.xamanClient = new XamanClient();
    } catch (error) {
      console.error("Failed to initialize XamanClient:", error);
      this.xamanClient = null;
    }
    
    this.metaMaskClient = new MetaMaskClient();
    this.suiClient = new SuiWalletClient();
  }

  async connectXaman(): Promise<void> {
    const { setLoading, setError, connectWallet } = useWalletStore.getState();

    try {
      setLoading(true);
      setError(null);

      if (!this.xamanClient) {
        throw new Error("Xaman is not available. Please configure API Key and Secret.");
      }

      const response = await this.xamanClient.authorize();

      if (!response) {
        throw new Error("User cancelled the connection");
      }

      const address = response.me.sub;
      const chain = "xrp"; // XRP Ledger

      connectWallet("xaman", address, chain);
    } catch (error: any) {
      setError(error.message || "Failed to connect to Xaman wallet");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async connectMetaMask(): Promise<void> {
    const { setLoading, setError, connectWallet } = useWalletStore.getState();

    try {
      setLoading(true);
      setError(null);

      const isInstalled = await this.metaMaskClient.isInstalled();
      if (!isInstalled) {
        throw new Error("MetaMask is not installed");
      }

      const { address, chainId } = await this.metaMaskClient.connect();

      // Convert chainId to chain name
      const chain = this.getChainName(chainId);

      connectWallet("metamask", address, chain);
    } catch (error: any) {
      setError(error.message || "Failed to connect to MetaMask");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async connectSui(): Promise<void> {
    const { setLoading, setError, connectWallet } = useWalletStore.getState();

    try {
      setLoading(true);
      setError(null);

      const isInstalled = await this.suiClient.isInstalled();
      if (!isInstalled) {
        throw new Error("Sui Wallet is not installed");
      }

      const { address } = await this.suiClient.connect();
      const chain = "sui"; // Sui blockchain

      connectWallet("sui", address, chain);
    } catch (error: any) {
      setError(error.message || "Failed to connect to Sui Wallet");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async disconnectWallet(): Promise<void> {
    const { walletType, disconnectWallet } = useWalletStore.getState();

    try {
      if (walletType === "xaman") {
        if (this.xamanClient) {
          await this.xamanClient.logout();
        }
      } else if (walletType === "metamask") {
        // MetaMask doesn't have a logout method, just clear the state
        this.metaMaskClient.removeAllListeners();
      } else if (walletType === "sui") {
        await this.suiClient.disconnect();
        this.suiClient.removeAllListeners();
      }

      disconnectWallet();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      // Still disconnect from our state even if the wallet logout fails
      disconnectWallet();
    }
  }

  private getChainName(chainId: string): string {
    const chainIdMap: Record<string, string> = {
      "0x1": "ethereum",
      "0x89": "polygon",
      "0x38": "bsc",
      "0xa": "optimism",
      "0xa4b1": "arbitrum",
      "0x2105": "base",
      "0xa86a": "Avalance C-Chain",
      "0xa869": "Avalanche Fuji C-Chain",
    };

    return chainIdMap[chainId] || `chain-${chainId}`;
  }

  // Event listeners for wallet changes
  setupEventListeners(): void {
    const { walletType, connectWallet, disconnectWallet } =
      useWalletStore.getState();

    if (walletType === "metamask") {
      this.metaMaskClient.onAccountsChanged((accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          // Update address if still connected
          const { chain } = useWalletStore.getState();
          if (chain) {
            connectWallet("metamask", accounts[0], chain);
          }
        }
      });

      this.metaMaskClient.onChainChanged((chainId) => {
        const chain = this.getChainName(chainId);
        const { address } = useWalletStore.getState();
        if (address) {
          connectWallet("metamask", address, chain);
        }
      });
    } else if (walletType === "sui") {
      this.suiClient.onAccountsChanged((accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          // Update address if still connected
          const { chain } = useWalletStore.getState();
          if (chain) {
            connectWallet("sui", accounts[0], chain);
          }
        }
      });

      this.suiClient.onDisconnect(() => {
        disconnectWallet();
      });
    }
  }

  // Cleanup event listeners
  cleanupEventListeners(): void {
    this.metaMaskClient.removeAllListeners();
    this.suiClient.removeAllListeners();
  }
}

// Singleton instance
export const walletManager = new WalletManager();
