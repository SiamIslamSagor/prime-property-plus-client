import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProperties = () => {
  const axiosPublic = useAxiosPublic();

  const { data: PropertiesData } = useQuery({
    queryKey: ["properties"],
    queryFn: () =>
      axiosPublic.get("/properties.json").then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { PropertiesData };
};

export default useProperties;
