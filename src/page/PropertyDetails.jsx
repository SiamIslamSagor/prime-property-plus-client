import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import DetailsCover from "../components/pageComponents/DetailsCover/DetailsCover";
import { Fade } from "react-awesome-reveal";
import LocationMap from "../components/pageComponents/LocationMap/LocationMap";
import SecondaryBtn from "../components/utilitiesComponents/SecondaryBtn";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import useContextData from "../hooks/useContextData";

const PropertyDetails = () => {
  // hooks
  const clickedProperty = useParams();
  const axiosSecure = useAxiosSecure();

  // context data
  const { user } = useContextData();

  //   state
  const [property, setProperty] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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

  // handler
  const handleAddToWishList = () => {
    const toastId = toast.loading("processing...");

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
      });
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
              <div className="overflow-hidden">
                <Fade direction="left">
                  <SecondaryBtn
                    handler={handleAddToWishList}
                    btnText="add to wish list"
                  ></SecondaryBtn>
                </Fade>
              </div>
            </div>
          </div>
        </div>
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
