import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useReviews from "../../../hooks/useReviews";

const Testimonials = () => {
  // state
  const [latestReviews, setLatestReviews] = useState([]);

  const { reviewsData } = useReviews();

  useEffect(() => {
    const latestReviewsData = reviewsData.sort(
      (a, b) => new Date(b.reviewTime) - new Date(a.reviewTime)
    );

    setLatestReviews(latestReviewsData);
  }, [reviewsData]);

  console.log(latestReviews);

  return (
    <div>
      <h1 className="text-4xl text-center font-bold">Testimonials</h1>
    </div>
  );
};

export default Testimonials;
