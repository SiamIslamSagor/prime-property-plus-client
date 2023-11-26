import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useVerifiedProperty = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: verifiedPropertiesData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: () =>
      axiosPublic.get("/properties/verified").then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { verifiedPropertiesData, isLoading, isError };
};

export default useVerifiedProperty;
