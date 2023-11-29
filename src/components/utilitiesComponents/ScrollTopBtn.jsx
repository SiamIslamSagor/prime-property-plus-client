import { FaArrowUpLong } from "react-icons/fa6";
import useContextData from "../../hooks/useContextData";
import { useState } from "react";

const ScrollTopBtn = () => {
  // state
  const [btnCls, setBtnCls] = useState("hidden");

  // hook
  const { scrollTop } = useContextData();

  // handler
  const handleGoTop = () => {
    scrollTop();
  };

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 420) {
      setBtnCls("");
    } else {
      setBtnCls("hidden");
    }
  });

  return (
    <div>
      <div
        className={`pr-3 lg:pr-8 w-full flex justify-end ${btnCls} duration-1000`}
      >
        <div
          onClick={handleGoTop}
          className="fixed  duration-1000 bottom-16 cursor-pointer z-[999] bg-gray-300 hover:bg-base-200 p-4 rounded-full group"
        >
          <FaArrowUpLong className="text-2xl  translate-y-2 group-hover:-translate-y-2 duration-500 text-p-color"></FaArrowUpLong>
        </div>
      </div>
    </div>
  );
};

export default ScrollTopBtn;
