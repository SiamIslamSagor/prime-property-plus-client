import { useEffect, useState } from "react";
import useReviews from "../../../hooks/useReviews";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import ReviewSlider from "../ReviewSlider/ReviewSlider";

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
      <div>
        <SectionTitle heading={"Testimonials"}></SectionTitle>
      </div>
      <div>
        <ReviewSlider latestReviews={latestReviews}></ReviewSlider>
      </div>
    </div>
  );
};

export default Testimonials;
