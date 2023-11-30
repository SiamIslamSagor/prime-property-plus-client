import { useEffect, useState } from "react";
import DeleteBtn from "../components/utilitiesComponents/DeleteBtn";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import useReviews from "../hooks/useReviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const ManageReviews = () => {
  // hooks
  const { reviewsData } = useReviews();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // state
  const [latestReviews, setLatestReviews] = useState([]);

  //   side effect
  useEffect(() => {
    if (reviewsData.length > 0) {
      const latestReviewsData = reviewsData.sort(
        (a, b) => new Date(b.reviewTime) - new Date(a.reviewTime)
      );

      setLatestReviews(latestReviewsData);
    }
  }, [reviewsData]);

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
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  // handler
  const handleReviewDelete = id => {
    console.log(id);
    // mutation handler
    mutate(id);
  };

  return (
    <div>
      <div className="my-10 lg:my-20">
        <SectionTitle heading={"manage reviews"}></SectionTitle>
      </div>
      <Toaster></Toaster>
      <div>
        {reviewsData.length === 0 && (
          <div className="mt-40 text-center">
            <p className="text-2xl">No review for any Property</p> <br />
          </div>
        )}

        <div className="text-white grid justify-items-center grid-cols-1 lg:grid-cols-2 gap-6 container mx-auto">
          {latestReviews.length !== 0 &&
            latestReviews?.map(singleReview => (
              <div
                className="lg:w-full lg:h-full lg:6 xl:p-10"
                key={singleReview?._id}
              >
                <div className="h-full w-full">
                  <div className="h-full w-full">
                    <div className="p-10 mb-5 text-center max-w-lg lg:max-w-xl 2xl:max-w-2xl border-8 glass group bg-p-color w-full h-full">
                      <div className="max-md:mb-4 md:mb-8 text-center flex justify-center">
                        <img
                          className="w-72 h-64 object-cover rounded-full"
                          src={singleReview.reviewerImg}
                          alt="slide img"
                        />
                      </div>
                      <h4 className="text-2xl">
                        Name: {singleReview?.reviewerName}
                      </h4>
                      <p className=" text-lg">
                        Email: {singleReview?.reviewerEmail}
                      </p>
                      <p className=" text-lg">
                        Review Time: {singleReview?.reviewTime}
                      </p>
                      <p className="mt-4 leading-5 mb-4 text-lg">
                        Review Description: {singleReview?.reviewerDescription}
                      </p>
                      <DeleteBtn
                        handler={() => handleReviewDelete(singleReview._id)}
                        btnText="Delete"
                      ></DeleteBtn>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageReviews;
