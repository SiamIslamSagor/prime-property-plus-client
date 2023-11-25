import PropTypes from "prop-types";
import { FaArrowRightLong } from "react-icons/fa6";

const PrimaryBtn = ({
  btnText = "Button",
  handler = () => console.log("click"),
  isDisable = false,
  isLoadingBtn = false,
}) => {
  return (
    <div>
      <button
        className="btn rounded-none border-f-color text-t-color hover:bg-f-color hover:border-f-color duration-[350ms] ease-in-out sm:px-8 max-md:px-4 btn-outline uppercase group max-sm:-py-16 max-sm:btn-sm"
        onClick={handler}
        disabled={isDisable}
      >
        <span className="text-[16px] max-sm:text-sm">{btnText}</span>{" "}
        {isLoadingBtn ? (
          <span className="loading loading-xs loading-spinner text-t-color ml-1 hover:text-white max-sm:text-sm"></span>
        ) : (
          <FaArrowRightLong className="duration-150 scale-x-110 group-hover:animate-bounce-x ml-2 max-sm:text-sm" />
        )}
      </button>
    </div>
  );
};

PrimaryBtn.propTypes = {
  btnText: PropTypes.string,
  handler: PropTypes.func,
  isDisable: PropTypes.bool,
  isLoadingBtn: PropTypes.bool,
};

export default PrimaryBtn;
