import { useQuery } from "@tanstack/react-query";
import useContextData from "./useContextData";
import useAxiosSecure from "./useAxiosSecure";

const useAgent = () => {
  // hooks
  const axiosSecure = useAxiosSecure();
  const { user, Loading } = useContextData();
  const { data: isAgent, isLoading: isAgentLoading } = useQuery({
    queryKey: [user?.email, "isAgent"],
    // run this code block when loading are false
    enabled: !Loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/agent/${user?.email}`);
      return res.data?.agent;
    },
  });

  return [isAgent, isAgentLoading];
};

export default useAgent;
