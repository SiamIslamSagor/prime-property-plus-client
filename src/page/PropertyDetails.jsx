import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import DetailsCover from "../components/pageComponents/DetailsCover/DetailsCover";
import { Fade } from "react-awesome-reveal";
import LocationMap from "../components/pageComponents/LocationMap/LocationMap";
import SecondaryBtn from "../components/utilitiesComponents/SecondaryBtn";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import useContextData from "../hooks/useContextData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReviewSlider from "../components/pageComponents/ReviewSlider/ReviewSlider";
import UpdateBtn from "../components/utilitiesComponents/UpdateBtn";
import { getCurrentTimeAndDate } from "../utils/getCurrentTimeAndDate";
import { Helmet } from "react-helmet-async";

const PropertyDetails = () => {
  // hooks
  const clickedProperty = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // context data
  const { user } = useContextData();

  //   state
  const [property, setProperty] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const reviewRef = useRef("");
  const {
    _id,
    propertyImg,
    propertyTitle,
    propertyLocation,
    propertyPriceRange,
    propertyFeatures,
    propertyBeauty,
    propertyVerificationStatus,
    agentImg,
    agentName,
    agentEmail,
    locationDetails,
    locationDescription,
    propertyDescription,
  } = property;

  //////////////////////////////////
  const { data: singlePropertyReviewsData = [] } = useQuery({
    queryKey: ["singlePropertyReviews", _id],
    queryFn: () =>
      axiosSecure.get(`/single-property-reviews/${_id}`).then(res => {
        console.log(["singlePropertyReviews", _id]);
        console.log("successfully get review info");
        return res.data;
      }),
    staleTime: 1000 * 10,
  });
  //////////////////////////////////

  // mutations
  const { mutate } = useMutation({
    mutationFn: async newWishListItem => {
      const toastId = toast.loading("processing...");

      return axiosSecure
        .post("/wish-list", newWishListItem)
        .then(res => {
          console.log(res);
          if (res.data.message) {
            return toast.success(
              "This property you have already added in your Wish List.",
              { id: toastId }
            );
          }
          toast.success("Add to Wish List Successfully.", { id: toastId });
        })
        .catch(err => {
          console.log(err);
          toast.success("Add to Wish List Failed.", { id: toastId });
        });
    },
  });

  // mutations
  const { mutate: reviewMutate } = useMutation({
    mutationFn: async newReview => {
      const toastId = toast.loading("processing...");

      return axiosSecure
        .post("/reviews/add", newReview)
        .then(res => {
          console.log(res.data);
          toast.success("give review successfully.", { id: toastId });
        })
        .catch(err => {
          console.log(err);
          toast.error("Failed to review.", { id: toastId });
        });
    },
    onSuccess: () => {
      console.log("review added by mutate");
      queryClient.invalidateQueries(["singlePropertyReviews", _id]);
    },
  });

  // handler
  const handleAddToWishList = () => {
    const info = {
      requesterEmail: user && user.email,
      propertyId: _id,
      propertyImg,
      propertyTitle,
      propertyLocation,
      propertyPriceRange,
      propertyFeatures,
      propertyBeauty,
      propertyVerificationStatus,
      agentImg,
      agentName,
      agentEmail,
      locationDetails,
      locationDescription,
      propertyDescription,
    };

    console.log(info);

    mutate(info);

    /* const toastId = toast.loading("processing...");

    // store property id in db
    axiosSecure
      .post("/wish-list", info)
      .then(res => {
        console.log(res);
        if (res.data.message) {
          return toast.success(
            "This property you have already added in your Wish List.",
            { id: toastId }
          );
        }
        toast.success("Add to Wish List Successfully.", { id: toastId });
      })
      .catch(err => {
        console.log(err);
        toast.success("Add to Wish List Failed.", { id: toastId });
      }); */
  };

  // review handler'
  const handleReview = e => {
    e.preventDefault();

    setRequestLoading(true);
    //////////////////////

    const reviewTime = getCurrentTimeAndDate();

    const reviewerDescription = reviewRef?.current?.value;
    const reviewInfo = {
      reviewerName: user?.displayName,
      reviewerImg: user?.photoURL,
      reviewerEmail: user?.email,
      reviewedPropertyTitle: propertyTitle,
      reviewedPropertyId: _id,
      agentName,
      reviewerDescription,
      reviewTime,
    };

    console.log(reviewInfo);

    // send in server side db

    reviewMutate(reviewInfo);
    /* axiosSecure
      .post("/reviews/add", reviewInfo)
      .then(res => {
        console.log(res.data);
        toast.success("give review successfully.", { id: toastId });
      })
      .catch(err => {
        console.log(err);
        toast.error("Failed to review.", { id: toastId });
      }); */

    //////////////////////
    setRequestLoading(false);
  };

  // useEffect
  useEffect(() => {
    setIsLoading(true);
    axiosSecure
      .get(`/property/details/${clickedProperty?.id}`)
      .then(res => {
        const data = res.data;
        setProperty(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [axiosSecure, clickedProperty?.id]);
  //   console.log(property);

  return (
    <div className="lg:my-40">
      <Helmet>
        <title>P P P | Property Details</title>
      </Helmet>

      <Toaster></Toaster>
      <div className="container lg:px-20 mx-auto">
        <div className="max-lg:hidden">
          <DetailsCover coverImg={propertyImg}></DetailsCover>
        </div>{" "}
        <div className="my-20">
          <SectionTitle heading={"property details"}></SectionTitle>
        </div>
        <div className="mb-24 flex flex-col items-center justify-center container mx-auto font-medium">
          <Fade delay={550}>
            <div className="mb-5">
              <img
                className="w-36 h-36 rounded-full"
                src={agentImg && agentImg}
                alt={agentName && agentName}
              />
            </div>
          </Fade>
          <Fade delay={700}>
            <h4 className="text-2xl md:text-3xl">
              Agent Name:{" "}
              <span className="text-t-color">{agentName && agentName}</span>
            </h4>
          </Fade>
          <Fade delay={850}>
            <h5 className="text-xl md:text-xl">
              Agent Email:{" "}
              <span className="text-t-color">{agentEmail && agentEmail}</span>
            </h5>
          </Fade>
        </div>
        <div className="flex max-lg:flex-col justify-between items-center group">
          <div className="overflow-hidden">
            <Fade direction="right" delay={800}>
              <div>
                <img
                  className="max-w-2xl max-sm:w-full"
                  src={propertyImg}
                  alt=""
                />
              </div>
            </Fade>
          </div>
          <div className="max-w-3xl mt-5 lg:mt-10 px-5 font-medium">
            <div className="overflow-hidden">
              <Fade direction="left">
                <h2 className="text-4xl text-p-color px-2">{propertyTitle}</h2>
              </Fade>
            </div>
            <div className="lg:max-w-lg 2xl:max-w-2xl">
              <Fade>
                <div className="max-md:space-y-2 max-lg:space-y-3 lg:space-y-3 my-3 lg:mt-10 px-2 font-semibold">
                  <p>{}</p>
                  {propertyDescription && (
                    <p>PROPERTY DESCRIPTION: {propertyDescription}</p>
                  )}
                  {locationDescription && (
                    <p>LOCATION DESCRIPTION: {locationDescription}</p>
                  )}
                  <div className="leading-5 text-sm ">
                    {propertyLocation && <p>Location: {propertyLocation}</p>}
                    {propertyFeatures && <p>Features: {propertyFeatures}</p>}
                    {propertyBeauty && <p>Beauty: {propertyBeauty}</p>}
                  </div>
                  {propertyPriceRange && (
                    <p>
                      Price Rage: ${propertyPriceRange[0]} to $
                      {propertyPriceRange[1]}
                    </p>
                  )}
                </div>
              </Fade>
              <div className="flex gap-4 max-sm:flex-col">
                <div className="overflow-hidden">
                  <Fade direction="left">
                    <SecondaryBtn
                      handler={handleAddToWishList}
                      btnText="add to wish list"
                    ></SecondaryBtn>
                  </Fade>
                </div>
                <div className="overflow-hidden">
                  <Fade direction="left">
                    <UpdateBtn
                      handler={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                      btnText="give review"
                    ></UpdateBtn>
                  </Fade>
                </div>
              </div>
              {/*  */}
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>

                  {/* data */}
                  <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                          //   for="grid-password"
                        >
                          Review
                        </label>
                        <textarea
                          className="textarea textarea-info w-full"
                          placeholder="type your personal review for this property"
                          ref={reviewRef}
                          autoFocus={true}
                        ></textarea>
                      </div>
                    </div>
                    <div className="text-center">
                      <SecondaryBtn
                        btnType="submit"
                        handler={handleReview}
                        isLoadingBtn={requestLoading}
                        btnText="review"
                      ></SecondaryBtn>
                    </div>
                  </form>
                </div>
              </dialog>
              {/*  */}
            </div>
          </div>
        </div>
        {singlePropertyReviewsData && (
          <div>
            {singlePropertyReviewsData.length !== 0 && (
              <div className="my-16 lg:my-20">
                <SectionTitle
                  heading={"review for this property"}
                ></SectionTitle>
              </div>
            )}
            <ReviewSlider
              reviewLength={singlePropertyReviewsData.length}
              latestReviews={singlePropertyReviewsData}
            ></ReviewSlider>
          </div>
        )}
        {isLoading ||
          (locationDetails?.latitude && locationDetails?.longitude && (
            <div>
              <div className="max-sm:my-16 sm:my-20 md:my-24 xl:my-28">
                <SectionTitle
                  heading={"location details in map"}
                ></SectionTitle>
              </div>
              <LocationMap
                latitude={locationDetails?.latitude}
                longitude={locationDetails?.longitude}
              ></LocationMap>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PropertyDetails;
