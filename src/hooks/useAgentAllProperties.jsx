import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAgentAllProperties = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: agentAllPropertyInfo = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["agentAllProperty"],
    queryFn: () =>
      axiosSecure.get("/properties/agent/all").then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { agentAllPropertyInfo, isLoading, isError, refetch };
};

export default useAgentAllProperties;
