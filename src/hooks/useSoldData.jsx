import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useContextData from "./useContextData";

const useSoldData = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContextData();

  const { data: soldData = [] } = useQuery({
    queryKey: ["sold"],
    queryFn: () =>
      axiosSecure
        .get(`/property-bought/agent/sold/${user && user?.email}`)
        .then(res => {
          return res.data;
        }),
    staleTime: 1000 * 10,
  });
  return { soldData };
};

export default useSoldData;
