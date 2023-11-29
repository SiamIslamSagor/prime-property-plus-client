import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useContextData from "./useContextData";

const useAgentProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContextData();

  const {
    data: agentPropertyInfo = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["agentProperty", user && user?.email],
    queryFn: () =>
      axiosSecure.get(`/properties/agent/${user && user?.email}`).then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { agentPropertyInfo, isLoading, isError, refetch };
};

export default useAgentProperties;
