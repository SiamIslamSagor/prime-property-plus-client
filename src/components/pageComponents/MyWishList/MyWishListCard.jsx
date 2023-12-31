import { Link, useLocation } from "react-router-dom";
import PrimaryBtn from "../../utilitiesComponents/PrimaryBtn";
import { LuBadgeCheck } from "react-icons/lu";
import { Fade } from "react-awesome-reveal";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useContextData from "../../../hooks/useContextData";
import DeleteBtn from "../../utilitiesComponents/DeleteBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { setBoughtPropertyIdInLs } from "../../../utils/localStorage";

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
    transactionId,
    agentName,
    agentImg,
  } = property;

  ///////////
  ///////////

  // hooks
  const location = useLocation();
  const { user, mobileNavCall } = useContextData();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  //   context data

  // state
  const [isHomePath, setIsHomePath] = useState(true);

  //

  // mutations
  const { mutate } = useMutation({
    mutationFn: async wishListItemId => {
      const toastId = toast.loading("processing...");

      return axiosSecure
        .delete(`/wish-list-item/delete/${wishListItemId}`)
        .then(res => {
          console.log(res.data);
          toast.success("wish list item deleted successfully.", {
            id: toastId,
          });
        })
        .catch(err => {
          console.log(err);
          toast.error("Failed to delete.", { id: toastId });
        });
    },
    onSuccess: () => {
      console.log("wish deleted by mutate");
      queryClient.invalidateQueries(["wishList", user && user?.email]);
    },
  });

  // handler
  const handleDeleteWish = () => {
    console.log(_id);
    // mutation handler
    mutate(_id);
  };

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
                  alt="House"
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

                {location.pathname !== "/dashboard/property-bought" &&
                  propertyPriceRange && (
                    <p>
                      Price Range: $
                      {propertyPriceRange && propertyPriceRange[0]} to $
                      {propertyPriceRange && propertyPriceRange[1]}
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
                  <DeleteBtn
                    handler={handleDeleteWish}
                    btnText="remove"
                  ></DeleteBtn>
                  <Link to={`/make-an-offer/${_id}`}>
                    <PrimaryBtn btnText="make an offer"></PrimaryBtn>
                  </Link>
                </div>
              )}
              {/*  */}
              {location.pathname === "/dashboard/property-bought" &&
                propertyVerificationStatus === "bought" &&
                transactionId && (
                  <div className=" mb-8 text-right flex justify-center">
                    <p>Transaction Id: {transactionId && transactionId}</p>
                  </div>
                )}
              {/*  */}
              {location.pathname === "/dashboard/property-bought" &&
                propertyVerificationStatus === "accepted" && (
                  // TODO: payment method
                  <div className=" mb-8 text-right flex justify-center">
                    <Link to="/dashboard/payment">
                      <PrimaryBtn
                        handler={() => {
                          console.log(_id);
                          setBoughtPropertyIdInLs(_id);
                        }}
                        btnText="pay now"
                      ></PrimaryBtn>
                    </Link>
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
