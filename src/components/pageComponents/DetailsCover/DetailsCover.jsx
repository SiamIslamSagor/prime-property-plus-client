import { Parallax } from "react-parallax";
import PropTypes from "prop-types";
import "./detailsCover.css";
const DetailsCover = ({ coverImg, children }) => {
  const insideStyles = {
    background: "white",
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };

  return (
    <div>
      <div className="h-[440px] sm:h-[540px] md:h-[560px] xl:h-[720px] max-w-[1920px] relative">
        <Parallax className="imgDiv" bgImage={coverImg} strength={350}>
          <div className="childParent" style={{ height: 500 }}>
            {children && <div style={insideStyles}>{children}</div>}
          </div>
        </Parallax>
      </div>
    </div>
  );
};

DetailsCover.propTypes = {
  coverImg: PropTypes.string,
  children: PropTypes.node,
};

export default DetailsCover;
