import PropTypes from "prop-types";
import PrimaryBtn from "../../utilitiesComponents/PrimaryBtn";
import { LuBadgeCheck } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const PropertyCard = ({ property, animDelay }) => {
  // data
  const {
    _id,
    propertyImg,
    propertyTitle,
    propertyLocation,
    propertyPriceRange,
    propertyVerificationStatus,
    agentName,
    agentImg,
  } = property;
  // hooks
  const location = useLocation();

  //   context data

  // state
  const [isHomePath, setIsHomePath] = useState(true);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePath(true);
    } else setIsHomePath(false);
  }, [location.pathname]);

  return (
    <div className="pt-2 overflow-y-hidden">
      <Fade triggerOnce delay={animDelay} direction="up">
        <div className="flex flex-col items-center justify-center">
          <div>
            <div className="card rounded-none rounded-tr-3xl rounded-bl-3xl w-96 bg-base-100  group hover:border hover:border-f-color ease-in-out hover:-translate-y-2 duration-[350ms] h-[520px]">
              <figure>
                <img
                  className="group-hover:scale-110 duration-1000  rounded-tr-3xl rounded-bl-3xl h-64 w-96"
                  src={propertyImg}
                  alt="Shoes"
                />
              </figure>
              <div className="flex flex-1 flex-col p-6 gap-2 leading-4 font-semibold">
                <h2
                  className="flex items-center gap-2
            font-medium text-xl "
                >
                  <p className="flex-1 text-2xl">{propertyTitle}</p>
                  {isHomePath && (
                    <div className="">
                      <div className="badge text-white bg-f-color">
                        Best Deals
                      </div>
                    </div>
                  )}
                </h2>
                <p>location: {propertyLocation}</p>
                {/* {isHomePath || <p>Agent Name: {agentName}</p>} */}

                {/* <p>img</p> */}
                <p>
                  Price Range: ${propertyPriceRange[0]} to $
                  {propertyPriceRange[1]}
                </p>
                {/* {isHomePath || <p>Property Location: {propertyLocation}</p>} */}

                <div className="flex flex-wrap  justify-start gap-2">
                  {isHomePath && (
                    <div className="badge  text-white bg-p-color py-3">
                      <p className="flex gap-2 items-center ">
                        {propertyVerificationStatus}
                        <LuBadgeCheck></LuBadgeCheck>
                      </p>{" "}
                    </div>
                  )}
                </div>
                {isHomePath || (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full">
                      <img
                        className="w-12 h-12 rounded-full"
                        src={agentImg}
                        alt={agentName}
                      />
                    </div>
                    <div>
                      <p>{agentName}</p>
                    </div>
                    <div className="badge  text-white bg-p-color py-3">
                      <p className="flex gap-2 items-center ">
                        {propertyVerificationStatus}
                        <LuBadgeCheck></LuBadgeCheck>
                      </p>{" "}
                    </div>
                  </div>
                )}
              </div>
              <div
                className=" mb-8 mr-8
             text-right"
              >
                <Link to={`/property-details/${_id}`}>
                  <PrimaryBtn btnText="details"></PrimaryBtn>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
  animDelay: PropTypes.number,
};

export default PropertyCard;
