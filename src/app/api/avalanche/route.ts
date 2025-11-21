import { Avalanche } from "@avalanche-sdk/chainkit";

/**
 * Unified transaction interface for multiple blockchain chains
 * This interface is designed to work with transactions from different chains
 * (e.g., Avalanche, Ethereum, Polygon, etc.)
 */
export interface Transaction {
  /** Chain identifier (e.g., 'Avalanche C-Chain', 'Ethereum Mainnet', 'Polygon') */
  chainName: string;
  
  /** Block number where the transaction was included */
  blockNumber: string;
  
  /** Unix timestamp of when the transaction was confirmed */
  timestamp: number;
  
  /** Transaction hash (unique identifier) */
  txHash: string;
  
  /** Sender address */
  from: string;
  
  /** Recipient address */
  to: string;
  
  /** Transaction value in the smallest unit (e.g., wei for ETH, nAVAX for AVAX) */
  value: string;
  
  /** Transaction fee in the smallest unit */
  fee: string;
  
  /** Native token symbol (e.g., 'AVAX', 'ETH', 'MATIC') */
  symbol: string;
}

const avalanche = new Avalanche({
  apiKey: process.env.AVALANCHE_API_KEY,
  chainId: "43113" // Fuji
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return new Response('Address is required', { status: 400 });
  }

  const result = await avalanche.data.evm.address.transactions.listNative({
    address: address,
  });

  const transactions: Transaction[] = [];
  for await (const page of result) {
    console.log(page.result.transactions);

    const tx = page.result.transactions[0];
    const fee = BigInt(tx.gasUsed) * BigInt(tx.gasPrice);

    transactions.push({
      chainName: 'Avalanche C-Chain',
      blockNumber: tx.blockNumber,
      timestamp: tx.blockTimestamp,
      txHash: tx.txHash,
      from: tx.from.address,
      to: tx.to.address,
      value: tx.value,
      fee: fee.toString(),
      symbol: 'AVAX',
    });
  }

  console.log(transactions);

  return new Response(JSON.stringify(transactions), { status: 200 });
}
