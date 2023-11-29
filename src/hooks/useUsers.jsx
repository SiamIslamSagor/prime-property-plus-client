import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsersInfo = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axiosSecure.get("/users").then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { allUsersInfo, isLoading, isError };
};

export default useUsers;
