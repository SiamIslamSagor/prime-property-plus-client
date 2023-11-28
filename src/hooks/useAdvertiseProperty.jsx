import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAdvertiseProperty = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: advertisePropertiesData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["advertiseProperties"],
    queryFn: () =>
      axiosPublic.get("/properties/advertiseProperty").then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { advertisePropertiesData, isLoading, isError };
};

export default useAdvertiseProperty;
