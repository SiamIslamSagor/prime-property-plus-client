import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllProperties = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allPropertyInfo = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allProperty"],
    queryFn: () =>
      axiosSecure.get("/properties/all").then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { allPropertyInfo, isLoading, isError, refetch };
};

export default useAllProperties;
