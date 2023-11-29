import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useContextData from "../../../hooks/useContextData";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import DeleteBtn from "../../utilitiesComponents/DeleteBtn";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UserReview = () => {
  ////////////////////
  //

  //////////////////
  const { user } = useContextData();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: userReviewsData = [] } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: () =>
      axiosSecure.get(`/reviews/${user && user?.email}`).then(res => {
        return res.data;
      }),
    staleTime: 1000 * 10,
  });

  console.log(userReviewsData);

  // mutations
  const { mutate } = useMutation({
    mutationFn: async reviewId => {
      const toastId = toast.loading("processing...");

      return axiosSecure
        .delete(`/reviews/delete/${reviewId}`)
        .then(res => {
          console.log(res.data);
          toast.success("Review deleted successfully.", { id: toastId });
        })
        .catch(err => {
          console.log(err);
          toast.error("Failed to delete review.", { id: toastId });
        });
    },
    onSuccess: () => {
      console.log("review deleted by mutate");
      queryClient.invalidateQueries(["reviews", user?.email]);
    },
  });

  // handler
  const handleDeleteReview = id => {
    console.log(id);
    // mutation
    mutate(id);
  };
  //////////////////
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>P P P | Dashboard | My Review</title>
      </Helmet>
      <Toaster></Toaster>
      <div className="my-10 lg:my-20">
        <SectionTitle heading={"my reviews"}></SectionTitle>
      </div>

      {userReviewsData.length === 0 && (
        <div className="mt-40 text-center">
          <p className="text-2xl">
            You do not provide reviews for any properties
          </p>{" "}
          <br />
          <p className="text-xl">
            go to{" "}
            <Link
              className="text-blue-700  font-medium hover:link"
              to="/all-properties"
            >
              review
            </Link>{" "}
          </p>
        </div>
      )}

      <div className="text-white grid justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 container mx-auto">
        {userReviewsData.length !== 0 &&
          userReviewsData?.map(singleReview => (
            <div key={singleReview?._id}>
              <div className="">
                <div className="">
                  <div className="p-10 mb-5 text-center max-w-lg lg:max-w-sm border-8 glass group bg-p-color">
                    <h4 className="text-3xl">
                      Property Title: {singleReview?.reviewedPropertyTitle}
                    </h4>
                    <p className="mt-4 text-lg">
                      Agent Name: {singleReview?.agentName}
                    </p>
                    <p className=" text-lg">
                      Review Time: {singleReview?.reviewTime}
                    </p>
                    <p className="leading-5 mb-4 text-lg">
                      Review Description: {singleReview?.reviewerDescription}
                    </p>
                    <DeleteBtn
                      handler={() => handleDeleteReview(singleReview?._id)}
                      btnText="Delete"
                    ></DeleteBtn>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserReview;
