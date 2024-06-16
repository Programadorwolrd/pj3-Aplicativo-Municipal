import { useGetUserRank } from "./querys";

interface Ranking {
  id: string;
  qrCodeUnicosLidos: number;
}

export function ranksOrdenados(): Ranking[] {
  const { data: userRank } = useGetUserRank();
  const rankings: Ranking[] = userRank?.data?.rank || [];
  return rankings.sort((a, b) => b.qrCodeUnicosLidos - a.qrCodeUnicosLidos);
}
