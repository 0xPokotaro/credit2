import { BlockchainService } from "@/services/blockchain/blockchain-service";

const blockchainService = new BlockchainService();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("evm_address");

  if (!address) {
    return new Response("EVM address is required", { status: 400 });
  }

  try {
    const transactions = await blockchainService.getTransactions(address);

    return new Response(JSON.stringify(transactions), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to get transactions:", error);
    return new Response("Failed to get transactions", { status: 500 });
  }
}
