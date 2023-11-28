import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useContextData from "./useContextData";

const usePropertyBought = () => {
  // hooks
  const axiosSecure = useAxiosSecure();
  const { user } = useContextData();

  const { data: boughtPropertyData = [], isLoading } = useQuery({
    queryKey: ["boughtProperty", user && user?.email],
    queryFn: () =>
      axiosSecure.get(`/property-bought/${user && user?.email}`).then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { boughtPropertyData, isLoading };
};

export default usePropertyBought;
