import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useContextData from "./useContextData";

const useRequestedProperties = () => {
  // hooks
  const axiosSecure = useAxiosSecure();
  const { user } = useContextData();

  const { data: requestedPropertyData = [], isLoading } = useQuery({
    queryKey: ["requestedProperty", user && user?.email],
    queryFn: () =>
      axiosSecure
        .get(`/property-bought/agent/${user && user?.email}`)
        .then(res => {
          return res.data;
        }),
    staleTime: 1000 * 10,
  });
  return { requestedPropertyData, isLoading };
};

export default useRequestedProperties;
