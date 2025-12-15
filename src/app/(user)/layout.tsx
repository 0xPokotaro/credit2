import "./globals.css";
import { Topbar } from "@/components/layout/topbar";
import { WalletProvider } from "@/components/wallet/wallet-provider";
import { Providers } from "../providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <WalletProvider>
          <Topbar />
          {children}
        </WalletProvider>
      </Providers>
    </NextIntlClientProvider>
  );
}

