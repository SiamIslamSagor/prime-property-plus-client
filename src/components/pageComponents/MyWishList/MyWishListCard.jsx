import { Link, useLocation } from "react-router-dom";
import PrimaryBtn from "../../utilitiesComponents/PrimaryBtn";
import { LuBadgeCheck } from "react-icons/lu";
import { Fade } from "react-awesome-reveal";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useContextData from "../../../hooks/useContextData";
import DeleteBtn from "../../utilitiesComponents/DeleteBtn";

const MyWishListCard = ({ property, animDelay }) => {
  // data
  const {
    _id,
    // propertyId,
    propertyImg,
    propertyTitle,
    propertyLocation,
    propertyPriceRange,
    offeredAmount,
    propertyVerificationStatus,
    agentName,
    agentImg,
  } = property;
  // hooks
  const location = useLocation();
  console.log(location);
  const { mobileNavCall } = useContextData();

  //   context data

  // state
  const [isHomePath, setIsHomePath] = useState(true);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePath(true);
    } else setIsHomePath(false);
  }, [location.pathname]);

  return (
    <div
      className={`pt-2 overflow-y-hidden ${mobileNavCall && "max-lg:-z-10"}`}
    >
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

                {location.pathname !== "/dashboard/property-bought" && (
                  <p>
                    Price Range: ${propertyPriceRange[0]} to $
                    {propertyPriceRange[1]}
                  </p>
                )}

                {location.pathname === "/dashboard/property-bought" && (
                  <p>Offered Amount: ${offeredAmount}</p>
                )}

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
                    <div
                      className={`${
                        location.pathname === "/dashboard/property-bought" &&
                        "tooltip tooltip-top"
                      }`}
                      data-tip="wait for accept your offer"
                    >
                      <div className="badge  text-white bg-p-color py-3">
                        <p className="flex gap-2 items-center ">
                          {propertyVerificationStatus}
                          <LuBadgeCheck></LuBadgeCheck>
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {location.pathname !== "/dashboard/property-bought" && (
                <div
                  className=" mb-8 
             text-right flex justify-center"
                >
                  <DeleteBtn btnText="remove"></DeleteBtn>
                  <Link to={`/make-an-offer/${_id}`}>
                    <PrimaryBtn btnText="make an offer"></PrimaryBtn>
                  </Link>
                </div>
              )}
              {/*  */}
              {location.pathname === "/dashboard/property-bought" &&
                propertyVerificationStatus === "accepted" && (
                  // TODO: payment method
                  <div
                    className=" mb-8 
             text-right flex justify-center"
                  >
                    <PrimaryBtn btnText="pay"></PrimaryBtn>
                  </div>
                )}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

MyWishListCard.propTypes = {
  property: PropTypes.object.isRequired,
  animDelay: PropTypes.number,
};

export default MyWishListCard;
