import useApi from "@/lib/useApi";

export const useGetUser = useApi("query", (axios) => {
  return {
    retry: 5,
    queryKey: ["user"],
    queryFn: () => {
      return axios.get("/usuario");
    },
  };
});

export const useGetUserRank = useApi("query", (axios) => {
  return {
    retry: 5,
    queryKey: ["rank"],
    queryFn: () => {
      return axios.get("/usuario/rank");
    },
  };
});
