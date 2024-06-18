import useApi from "@/lib/useApi";

export const useGetUser = () =>
  useApi("query", (axios) => {
    return {
      queryKey: ["currentUser"],
      queryFn: () => {
        return axios.get<Res<{ usuario: Usuario }>>("/usuario");
      },
    };
  });

export const useGetUserRank = () =>
  useApi("query", (axios) => {
    return {
      queryKey: ["rank"],
      queryFn: () => {
        return axios.get<Res<{ rank: Rank[] }>>("/usuario/rank");
      },
    };
  });

export const useGetQrcode = <Visita = false>(uri?: string) => {
  type Data = Visita extends true
    ? { details: "OK" }
    : { catalogo: CatalogoInfo };

  const isVisit = uri?.startsWith("PAIA:");

  return useApi("query", (axios) => {
    return {
      queryKey: ["qrCode", isVisit ? "PAIA" : uri],
      queryFn: () => {
        return axios.get<Res<Data>>(`/usuario/lerQrCode/${uri}`);
      },
      throwOnError: () => false,
    };
  });
};

// para formatar a resposta da api
type Res<D extends object> = {
  [K in keyof D]: D[K];
} & MetaRes;

interface MetaRes {
  message: string;
}
