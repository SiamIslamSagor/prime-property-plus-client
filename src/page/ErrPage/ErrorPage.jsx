import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BsChevronDoubleLeft } from "react-icons/bs";
import errorAnim from "../../assets/animSvg/notFoundAnim.json";
import "./err.css";
const ErrorPage = () => {
  return (
    <div className="container mx-auto flex flex-col  items-center justify-center">
      <Helmet>
        <title>ERROR</title>
      </Helmet>
      <div className="anim-div">
        <Lottie animationData={errorAnim} loop={true}></Lottie>;
      </div>
      <div>
        <div className="border p-10 rounded-lg m-2">
          <h2 className="text-4xl font-medium">Page not found</h2>
          <Link to="/">
            <button className="btn mt-4 font-fontSquare btn-ghost text-blue-700 font-bold">
              <BsChevronDoubleLeft></BsChevronDoubleLeft>
              Go Back Home
            </button>
          </Link>
          <hr />
          <p className="max-w-sm text-gray-600">
            We are sorry, but it seems like you have wandered off the beaten
            path. The page you are looking for is nowhere to be found. If you
            believe this is an error, feel free to reach out to our support
            team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
