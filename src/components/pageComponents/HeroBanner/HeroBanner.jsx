/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import heroBg from "../../../assets/images/heroImg.jpg";
import PrimaryBtn from "../../utilitiesComponents/PrimaryBtn";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import { Fade } from "react-awesome-reveal";
import SecondaryBtn from "../../utilitiesComponents/SecondaryBtn";

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
      className="-mt-[96px] relative h-[60vh] sm:h-[75vh] md:h-[850px] lg:h-[920px]  bg-red-200 "
    >
      <div className="w-full h-full absolute bg-[#000000a1]">
        <div className="container mx-auto max-sm:mt-28 sm:mt-36 md:mt-72 lg:mt-96 text-white">
          <div className=" md:max-w-[60%] max-sm:px-2 sm:mx-4 lg:mx-6 max-md:text-center max-md:mt-60 max-sm:mt-40">
            <div className="my-6">
              <SectionTitle
                heading={"Welcome to Your Future Home"}
              ></SectionTitle>
            </div>
            <Fade delay={800}>
              <p className="mb-6 leading-4 font-normal md:text-xl lg:font-medium">
                At Prime Property Pulse, we understand that your dream home is
                more than a place; it's an emotion. Let us be the rhythm that
                leads you to a property where your heart truly belongs. Explore
                the heartbeat of exceptional living with Prime Property Pulse.
              </p>
            </Fade>
            <div className="flex gap-6 max-sm:flex-col-reverse max-sm:gap-4">
              <div className=" inline overflow-hidden  ">
                <Fade direction="down">
                  <Link to="auth/login">
                    <SecondaryBtn btnText="get started"></SecondaryBtn>
                  </Link>
                </Fade>
              </div>
              <div className=" inline overflow-hidden  ">
                <Fade direction="up">
                  <Link to="auth/signUp">
                    <PrimaryBtn btnText="get started"></PrimaryBtn>
                  </Link>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
