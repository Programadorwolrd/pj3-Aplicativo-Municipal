import useApi from "@/lib/useApi";
interface Ranking {
  id: string;
  qrCodeUnicosLidos: number;
}

export function rankOrdenado(): Ranking[] {
  const userRank = useApi("query", (axios) => ({
    retry: 5,
    queryKey: ["rank"],
    queryFn: () => axios.get("/usuario/rank"),
  }));

  const rankings: Ranking[] = userRank.data?.data.rank || [];
  return rankings.sort((a, b) => b.qrCodeUnicosLidos - a.qrCodeUnicosLidos);
}
