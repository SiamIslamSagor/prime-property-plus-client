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
    console.log("effect");
    if (reviewsData.length > 0) {
      const latestReviewsData = reviewsData.sort(
        (a, b) => new Date(b.reviewTime) - new Date(a.reviewTime)
      );

      setLatestReviews(latestReviewsData);
    }
  }, [reviewsData]);

  //   console.log(latestReviews);

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
