import PropTypes from "prop-types";
import { PiNotePencilBold } from "react-icons/pi";
import { RxUpdate } from "react-icons/rx";

const UpdateBtn = ({
  btnText = "Button",
  handler = () => console.log("click"),
  isDisable = false,
  isLoadingBtn = false,
}) => {
  return (
    <div>
      <button
        className="btn rounded-none border-f-color text-t-color hover:bg-f-color hover:border-f-color duration-[350ms] ease-in-out sm:px-10 max-md:px-6 btn-outline uppercase group max-sm:-py-16 max-sm:btn-sm"
        onClick={handler}
        disabled={isDisable}
      >
        <span className="text-[16px] max-sm:text-sm">{btnText}</span>{" "}
        {isLoadingBtn ? (
          <RxUpdate className="animate-spin-slow text-t-color ml-1 hover:text-white text-lg"></RxUpdate>
        ) : (
          <PiNotePencilBold className="duration-150 scale-x-110 group-hover:translate-x-1 ml-1 text-lg" />
        )}
      </button>
    </div>
  );
};

UpdateBtn.propTypes = {
  btnText: PropTypes.string,
  handler: PropTypes.func,
  isDisable: PropTypes.bool,
  isLoadingBtn: PropTypes.bool,
};

export default UpdateBtn;
