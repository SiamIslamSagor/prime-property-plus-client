import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProperties = () => {
  const axiosPublic = useAxiosPublic();

  const { data: propertiesData = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: () =>
      axiosPublic.get("/properties").then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { propertiesData };
};

export default useProperties;
