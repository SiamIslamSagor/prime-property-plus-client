import PropTypes from "prop-types";
import "animate.css";
import { Fade } from "react-awesome-reveal";

const SectionTitle = ({ heading }) => {
  return (
    <div className=" flex items-center justify-center ">
      <div className="overflow-hidden  -mt-[380px] ">
        <Fade direction="up" delay={500}>
          <div className="max-lg:border-l-8 lg:border-l-[14px] pl-2 border-s-color">
            <h3 className="max-sm:text-2xl  sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight mt-96 -z-10 uppercase ">
              {heading}
            </h3>
          </div>
        </Fade>
      </div>
    </div>
  );
};

SectionTitle.propTypes = {
  heading: PropTypes.string,
};

export default SectionTitle;
