import PropTypes from "prop-types";
import { FaArrowRightLong } from "react-icons/fa6";

const SecondaryBtn = ({
  btnText = "Button",
  handler = () => console.log("click"),
  isDisable = false,
  isLoadingBtn = false,
}) => {
  return (
    <div className="inline-block">
      <button
        className="btn rounded-none bg-f-color border-f-color text-white hover:border-f-color hover:text-f-color hover:bg-white duration-[350ms] ease-in-out sm:px-8 max-md:px-4 btn-outline uppercase group max-sm:-py-16 max-sm:btn-sm  "
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

SecondaryBtn.propTypes = {
  btnText: PropTypes.string,
  handler: PropTypes.func,
  isDisable: PropTypes.bool,
  isLoadingBtn: PropTypes.bool,
};

export default SecondaryBtn;
