import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviewsData = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      axiosPublic.get("/reviews").then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { reviewsData };
};

export default useReviews;
