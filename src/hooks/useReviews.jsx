import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviewsData = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      axiosPublic.get("/reviews").then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { reviewsData, refetch };
};

export default useReviews;
