export class MetaMaskClient {
  private ethereum: any;

  constructor() {
    if (typeof window !== "undefined") {
      this.ethereum = (window as any).ethereum;
    }
  }

  async isInstalled(): Promise<boolean> {
    return !!this.ethereum && this.ethereum.isMetaMask;
  }

  async connect(): Promise<{ address: string; chainId: string }> {
    if (!this.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      // Request account access
      const accounts = await this.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const address = accounts[0];

      // Get chain ID
      const chainId = await this.ethereum.request({
        method: "eth_chainId",
      });

      return {
        address,
        chainId: chainId,
      };
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error("User rejected the connection request");
      }
      throw new Error(`Failed to connect to MetaMask: ${error.message}`);
    }
  }

  async getAccount(): Promise<string | null> {
    if (!this.ethereum) return null;

    try {
      const accounts = await this.ethereum.request({
        method: "eth_accounts",
      });
      return accounts[0] || null;
    } catch {
      return null;
    }
  }

  async getChainId(): Promise<string | null> {
    if (!this.ethereum) return null;

    try {
      const chainId = await this.ethereum.request({
        method: "eth_chainId",
      });
      return chainId;
    } catch {
      return null;
    }
  }

  async switchChain(chainId: string): Promise<void> {
    if (!this.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      await this.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        throw new Error(`Chain ${chainId} is not added to MetaMask`);
      }
      throw new Error(`Failed to switch chain: ${error.message}`);
    }
  }

  onAccountsChanged(callback: (accounts: string[]) => void) {
    if (!this.ethereum) return;

    this.ethereum.on("accountsChanged", callback);
  }

  onChainChanged(callback: (chainId: string) => void) {
    if (!this.ethereum) return;

    this.ethereum.on("chainChanged", callback);
  }

  removeAllListeners() {
    if (!this.ethereum) return;

    this.ethereum.removeAllListeners("accountsChanged");
    this.ethereum.removeAllListeners("chainChanged");
  }
}
