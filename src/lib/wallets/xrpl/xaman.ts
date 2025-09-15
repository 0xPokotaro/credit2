import { Xumm as Xaman } from "xumm";

export class XamanClient {
  private xaman: Xaman;

  constructor() {
    const key = process.env.NEXT_PUBLIC_XAMAN_API_KEY as string;
    const secret = process.env.NEXT_PUBLIC_XAMAN_API_SECRET as string;

    this.xaman = new Xaman(key, secret);
  }

  async authorize() {
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
    await this.xaman.logout();
    localStorage.removeItem("XummPkceJwt");
    localStorage.removeItem("pkce_state");
    window.location.reload();
  }
}
