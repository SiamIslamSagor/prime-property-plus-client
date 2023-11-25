import PropTypes from "prop-types";
import PrimaryBtn from "../../utilitiesComponents/PrimaryBtn";
import { LuBadgeCheck } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PropertyCard = ({ property }) => {
  // data
  const {
    propertyImg,
    propertyTitle,
    propertyLocation,
    propertyPriceRange,
    propertyVerificationStatus,
    agentName,
  } = property;
  // hooks
  const location = useLocation();

  // state
  const [isHomePath, setIsHomePath] = useState(true);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePath(true);
    } else setIsHomePath(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center my-40">
      <div>
        <div className="card rounded-none rounded-tr-3xl rounded-bl-3xl w-96 bg-base-100 shadow-xl group hover:border hover:border-f-color ease-in-out hover:-translate-y-2 duration-[350ms]">
          <figure>
            <img
              className="group-hover:scale-110 duration-1000  rounded-tr-3xl rounded-bl-3xl h-64"
              src={propertyImg}
              alt="Shoes"
            />
          </figure>
          <div className="flex flex-1 flex-col p-8 gap-2 leading-4">
            <h2 className="card-title">
              {propertyTitle}
              {isHomePath && (
                <div className="badge text-white bg-f-color">Best Deals</div>
              )}
            </h2>
            <p>location: {propertyLocation}</p>
            <p>
              Price Range: ${propertyPriceRange[0]} to ${propertyPriceRange[1]}
            </p>
            {isHomePath || <p>Agent Name: {agentName}</p>}
            {isHomePath || <p>Agent Name: {propertyLocation}</p>}

            <div className="flex flex-wrap  justify-start gap-2">
              <div className="badge  text-white bg-p-color py-3">
                <p className="flex gap-2 items-center ">
                  {propertyVerificationStatus}
                  <LuBadgeCheck></LuBadgeCheck>
                </p>{" "}
              </div>
            </div>
            <div className=" text-right">
              <PrimaryBtn btnText="details"></PrimaryBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object.isRequired,
};

export default PropertyCard;
