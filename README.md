This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Setup

Before running the application, you need to configure your environment variables:

1. **Copy the environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure environment variables:**

   Open `.env.local` and set the following variables as needed:

   **Blockchain API Keys (Optional):**
   - `AVALANCHE_API_KEY`: Avalanche SDK API key (server-side only)
     - Get it from: https://www.avax.network/
   - `NEXT_PUBLIC_SNOW_TRACE_API_KEY`: SnowTrace API key (optional)
     - Get it from: https://snowtrace.io/apis

   **Wallet Integration (Optional):**
   - `NEXT_PUBLIC_XAMAN_API_KEY`: Xaman (XRPL) public API key
   - `NEXT_PUBLIC_XAMAN_API_SECRET`: Xaman API secret
     - Get credentials from: https://xumm.app/

3. **Environment Variable Guidelines:**

   - Variables with `NEXT_PUBLIC_` prefix are accessible in the browser (client-side)
   - Variables without this prefix are only available on the server-side
   - The application will warn you about missing optional variables in development mode

## Getting Started

After setting up your environment variables, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
