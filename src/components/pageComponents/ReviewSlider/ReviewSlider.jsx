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
import { Fade } from "react-awesome-reveal";

const ReviewSlider = ({ latestReviews }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className="">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
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
            <div className="w-full flex items-center justify-center flex-col py-10">
              <div className="max-md:mb-4 md:mb-8">
                <img
                  className="w-72 h-64 object-cover rounded-full"
                  src={review.reviewerImg}
                  alt="slide img"
                />
              </div>
              <div className=" h-full w-full  flex flex-col gap-2 md:gap-5">
                <Fade direction="up">
                  <p className="text-center my-auto mx-auto font-bold text-2xl sm:text-3xl md:text-4xl text-f-color">
                    I am {review.reviewerName}
                  </p>
                </Fade>
                <Fade delay={600}>
                  <p className="text-center my-auto mx-auto  text-xl text-t-color">
                    I provided reviews for this property:{" "}
                    {review.reviewedPropertyTitle}
                  </p>
                </Fade>

                <Fade direction="up" delay={800}>
                  <p className="text-center my-auto mx-auto sm:max-w-3xl lg:max-w-5xl max-md:text-xl md:text-2xl lg:text-3xl text-p-color">
                    My Review for this property: {review.reviewerDescription}
                  </p>
                </Fade>
              </div>
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
    </div>
  );
};

ReviewSlider.propTypes = {
  latestReviews: PropTypes.array.isRequired,
};

export default ReviewSlider;
