import { useEffect, useState } from "react";
import useReviews from "../../../hooks/useReviews";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import ReviewSlider from "../ReviewSlider/ReviewSlider";

const Testimonials = () => {
  // state
  const [latestReviews, setLatestReviews] = useState([]);

  //   hooks
  const { reviewsData } = useReviews();

  //   side effect
  useEffect(() => {
    if (reviewsData.length > 0) {
      const latestReviewsData = reviewsData.sort(
        (a, b) => new Date(b.reviewTime) - new Date(a.reviewTime)
      );

      setLatestReviews(latestReviewsData.slice(0, 5));
    }
  }, [reviewsData]);

  return (
    <div>
      <div>
        <SectionTitle heading={"our Latest testimonial"}></SectionTitle>
      </div>
      <div>
        <ReviewSlider latestReviews={latestReviews}></ReviewSlider>
      </div>
    </div>
  );
};

export default Testimonials;
