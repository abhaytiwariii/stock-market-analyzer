import api from "@/lib/api";

export const getStockData = async (symbol: string, period: string) => {
  try {
    const response = await api.get(`/api/stock/${symbol}?period=${period}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};
