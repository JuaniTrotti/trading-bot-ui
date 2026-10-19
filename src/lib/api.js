export const API_URL =
  "https://jtrotti.com/api/trading-bot-service/testnet/positions/history";

export async function fetchOperations() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data.trades || [];
}
