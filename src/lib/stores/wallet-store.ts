import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WalletState {
  address: string | null;
  chain: string | null;
  walletType: "xaman" | "metamask" | "sui" | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface WalletActions {
  connectWallet: (
    walletType: "xaman" | "metamask" | "sui",
    address: string,
    chain: string,
  ) => void;
  disconnectWallet: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export type WalletStore = WalletState & WalletActions;

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      // State
      address: null,
      chain: null,
      walletType: null,
      isConnected: false,
      isLoading: false,
      error: null,

      // Actions
      connectWallet: (walletType, address, chain) => {
        set({
          address,
          chain,
          walletType,
          isConnected: true,
          isLoading: false,
          error: null,
        });
      },

      disconnectWallet: () => {
        set({
          address: null,
          chain: null,
          walletType: null,
          isConnected: false,
          isLoading: false,
          error: null,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error, isLoading: false });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "wallet-storage",
      partialize: (state) => ({
        address: state.address,
        chain: state.chain,
        walletType: state.walletType,
        isConnected: state.isConnected,
      }),
    },
  ),
);
