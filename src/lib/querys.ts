import useApi from "@/lib/useApi";

export const useGetUser = () =>
  useApi("query", (axios) => {
    return {
      queryKey: ["currentUser"],
      queryFn: () => {
        return axios.get("/usuario");
      },
    };
  });

export const useGetUserRank = () =>
  useApi("query", (axios) => {
    return {
      queryKey: ["rank"],
      queryFn: () => {
        return axios.get("/usuario/rank");
      },
    };
  });
