import PropTypes from "prop-types";
import { RiDeleteBack2Line, RiDeleteBin5Line } from "react-icons/ri";

const DeleteBtn = ({
  btnText = "Button",
  handler = () => console.log("click"),
  isDisable = false,
  isLoadingBtn = false,
}) => {
  return (
    <div>
      <button
        className="btn rounded-none bg-f-color border-f-color text-white hover:border-f-color hover:text-f-color hover:bg-white duration-[350ms] ease-in-out sm:px-10 max-md:px-6 btn-outline uppercase group max-sm:-py-16 max-sm:btn-sm"
        onClick={handler}
        disabled={isDisable}
      >
        <span className="text-[16px] max-sm:text-sm">{btnText}</span>{" "}
        {isLoadingBtn ? (
          <RiDeleteBin5Line className="animate-move-x text-t-color ml-1 hover:text-white text-lg"></RiDeleteBin5Line>
        ) : (
          <RiDeleteBack2Line className="duration-150 scale-x-110 group-hover:translate-x-1 ml-1 text-lg" />
        )}
      </button>
    </div>
  );
};

DeleteBtn.propTypes = {
  btnText: PropTypes.string,
  handler: PropTypes.func,
  isDisable: PropTypes.bool,
  isLoadingBtn: PropTypes.bool,
};

export default DeleteBtn;
