import { Link } from "react-router-dom";
import heroBg from "../../../assets/images/heroImg.jpg";

const HeroBanner = () => {
  const heroBgStyle = {
    backgroundImage: `url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      style={heroBgStyle}
      className="-mt-[96px] relative h-[60vh] sm:h-[70vh] md:h-[911px]  bg-red-200 "
    >
      <div className="w-full h-full absolute bg-[#000000a1]">
        <div className="container mx-auto max-sm:mt-28 sm:mt-36 md:mt-72 lg:mt-96 text-white">
          <div className=" md:max-w-[60%] max-sm:px-2 sm:mx-4 lg:mx-6">
            <p className="mb-6 leading-4 font-normal md:text-xl md:font-medium">
              Welcome to FoodHub, where we turn surplus into smiles. We are on a
              mission to create a world where no one goes to bed hungry. Our
              platform connects the generous hearts of Bangladesh, making it
              easy to share excess food with those who need it most. Join our
              growing community, and let is serve up kindness, one meal at a
              time.
            </p>
            <Link to="/login">
              <button className="btn border-[#f86f03] hover:bg-orange-500 outline-none  hover:border-[#f86f03] text-white bg-transparent dark:bg-red-500 dark:text-green-700">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
