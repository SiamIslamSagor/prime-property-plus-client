import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useContextData from "./useContextData";

const useWishList = () => {
  // hooks
  const axiosSecure = useAxiosSecure();
  const { user } = useContextData();

  const { data: wishListData = [], isLoading } = useQuery({
    queryKey: ["wishList", user && user?.email],
    queryFn: () =>
      axiosSecure.get(`/wish-list/${user && user?.email}`).then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  return { wishListData, isLoading };
};

export default useWishList;
