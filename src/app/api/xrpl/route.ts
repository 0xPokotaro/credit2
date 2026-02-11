import { BlockchainService } from "@/services/blockchain/blockchain-service";
import { isXrplAddress } from "@/utils/address";

const blockchainService = new BlockchainService();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("xrpl_address");

  if (!address) {
    return new Response(
      JSON.stringify({ message: "XRPL address is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!isXrplAddress(address)) {
    return new Response(JSON.stringify({ message: "Invalid XRPL address" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
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
    console.error("Failed to get XRPL transactions:", error);
    return new Response(
      JSON.stringify({ message: "Failed to get transactions" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
