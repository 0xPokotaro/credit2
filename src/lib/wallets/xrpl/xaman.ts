import { Xumm as Xaman } from "xumm";
import { clientEnv } from "@/config/env.client";

export class XamanClient {
  private xaman: Xaman | null = null;
  private initialized = false;

  constructor() {
    try {
      const key = clientEnv.XAMAN_API_KEY;
      const secret = clientEnv.XAMAN_API_SECRET;

      if (!key || !secret) {
        console.warn("Xaman API Key or Secret is not configured");
        return;
      }

      this.xaman = new Xaman(key, secret);
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize Xaman client:", error);
      this.xaman = null;
      this.initialized = false;
    }
  }

  async authorize() {
    if (!this.initialized || !this.xaman) {
      throw new Error(
        "Xaman is not initialized. Please configure API Key and Secret.",
      );
    }

    const response = await this.xaman.authorize();

    if (!response) {
      throw new Error("Failed to authorize");
    }

    if (response instanceof Error) {
      if (response.message.includes("Sign In window closed")) {
        return null;
      }

      throw new Error("Failed to authorize");
    }

    return response;
  }

  async logout() {
    if (!this.initialized || !this.xaman) {
      return;
    }

    try {
      await this.xaman.logout();
    } catch (error) {
      console.error("Error during Xaman logout:", error);
    }

    localStorage.removeItem("XummPkceJwt");
    localStorage.removeItem("pkce_state");
    window.location.reload();
  }
}
