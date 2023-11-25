import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProperties = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: propertiesData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: () =>
      axiosPublic.get("/properties").then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { propertiesData, isLoading, isError };
};

export default useProperties;
