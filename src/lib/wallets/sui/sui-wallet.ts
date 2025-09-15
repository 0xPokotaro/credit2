export interface SuiWalletInfo {
  name: string;
  icon: string;
  downloadUrl: string;
  installed: boolean;
}

export interface SuiAccountInfo {
  address: string;
  publicKey: string;
}

export class SuiWalletClient {
  private walletName: string;
  private installed: boolean = false;

  constructor(walletName: string = "Sui Wallet") {
    this.walletName = walletName;
    this.checkInstalled();
  }

  private checkInstalled(): boolean {
    if (typeof window === "undefined") return false;
    
    // Check for Sui Wallet extension
    this.installed = !!(window as any).suiWallet;
    return this.installed;
  }

  async isInstalled(): Promise<boolean> {
    return this.checkInstalled();
  }

  async connect(): Promise<SuiAccountInfo> {
    if (!this.installed) {
      throw new Error(`${this.walletName} is not installed`);
    }

    try {
      const suiWallet = (window as any).suiWallet;
      
      // Request connection
      const result = await suiWallet.connect();
      
      if (!result || !result.accounts || result.accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const account = result.accounts[0];
      
      return {
        address: account.address,
        publicKey: account.publicKey,
      };
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error("User rejected the connection request");
      }
      throw new Error(`Failed to connect to ${this.walletName}: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.installed) {
        const suiWallet = (window as any).suiWallet;
        await suiWallet.disconnect();
      }
    } catch (error) {
      console.error("Error disconnecting Sui wallet:", error);
    }
  }

  async getAccounts(): Promise<string[]> {
    if (!this.installed) {
      throw new Error(`${this.walletName} is not installed`);
    }

    try {
      const suiWallet = (window as any).suiWallet;
      const accounts = await suiWallet.getAccounts();
      return accounts.map((account: any) => account.address);
    } catch (error: any) {
      throw new Error(`Failed to get accounts: ${error.message}`);
    }
  }

  async getBalance(address: string): Promise<string> {
    if (!this.installed) {
      throw new Error(`${this.walletName} is not installed`);
    }

    try {
      const suiWallet = (window as any).suiWallet;
      const balance = await suiWallet.getBalance(address);
      return balance.toString();
    } catch (error: any) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  // Event listeners
  onAccountsChanged(callback: (accounts: string[]) => void): void {
    if (!this.installed) return;

    const suiWallet = (window as any).suiWallet;
    if (suiWallet.on) {
      suiWallet.on('accountsChanged', callback);
    }
  }

  onDisconnect(callback: () => void): void {
    if (!this.installed) return;

    const suiWallet = (window as any).suiWallet;
    if (suiWallet.on) {
      suiWallet.on('disconnect', callback);
    }
  }

  removeAllListeners(): void {
    if (!this.installed) return;

    const suiWallet = (window as any).suiWallet;
    if (suiWallet.removeAllListeners) {
      suiWallet.removeAllListeners();
    }
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    suiWallet?: {
      connect: () => Promise<{ accounts: SuiAccountInfo[] }>;
      disconnect: () => Promise<void>;
      getAccounts: () => Promise<SuiAccountInfo[]>;
      getBalance: (address: string) => Promise<number>;
      on: (event: string, callback: Function) => void;
      removeAllListeners: () => void;
    };
  }
}
