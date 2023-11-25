import PropTypes from "prop-types";
import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./reviewSlider.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const ReviewSlider = ({ latestReviews }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {latestReviews?.map(review => (
          <SwiperSlide key={review._id}>
            <img
              className="w-full h-full object-cover"
              src={review.reviewerImg}
              alt="slide img"
            />
            <div className="absolute text-white h-full w-full bg-[#000000a1] flex">
              <p className="text-center my-auto mx-auto p-4 sm:p-8 md:p-12 sm:text-2xl lg:text-3xl lg:px-32  xl:px-44 2xl:px-60">
                {review.reviewedPropertyTitle}
              </p>
              <p className="text-center my-auto mx-auto p-4 sm:p-8 md:p-12 sm:text-2xl lg:text-3xl lg:px-32  xl:px-44 2xl:px-60">
                {review.reviewerName}
              </p>
              <p className="text-center my-auto mx-auto p-4 sm:p-8 md:p-12 sm:text-2xl lg:text-3xl lg:px-32  xl:px-44 2xl:px-60">
                {review.reviewerDescription}
              </p>
            </div>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

ReviewSlider.propTypes = {
  latestReviews: PropTypes.array.isRequired,
};

export default ReviewSlider;
