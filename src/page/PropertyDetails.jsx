import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import { Parallax, Background } from "react-parallax";
import { Map, Marker } from "pigeon-maps";

const PropertyDetails = () => {
  // hooks
  const clickedProperty = useParams();
  const axiosPublic = useAxiosPublic();

  //   state
  const [property, setProperty] = useState({});
  const {
    // _id,
    propertyImg,
    propertyTitle,
    // propertyLocation,
    // propertyPriceRange,
    // propertyVerificationStatus,
    // propertyFeatures,
    // propertyBeauty,
    // agentImg,
    // agentName,
    // agentEmail,
    // locationDetails,
    // locationDescription,
  } = property;

  console.log(property);
  // handler

  // useEffect
  useEffect(() => {
    axiosPublic
      .get(`/property/details/${clickedProperty?.id}`)
      .then(res => {
        const data = res.data;
        setProperty(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [axiosPublic, clickedProperty?.id]);

  const heroBgStyle = {
    //  backgroundImage: `url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const insideStyles = {
    background: "white",
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };

  //   console.log(Object.keys(property).join(","));
  return (
    <div>
      <div className="h-[85vh] w-screen">
        {/* <Map height={300} defaultCenter={[45.4215, -122.6731]} defaultZoom={11}>
          <Marker width={50} anchor={[45.4215, -122.6731]} />
        </Map> */}
        <Parallax
          style={heroBgStyle}
          className="mb-10"
          blur={{ min: -10, max: 10 }}
          bgImage={propertyImg}
          bgImageAlt="the dog"
          strength={290}
        >
          <div className="hero max-sm:max-h-[375px] sm:h-[600px] md:h-[700px]">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content md text-center text-neutral-content">
              <div className="max-w-xl sm:p-10 bg-[#00000065]">
                <h1 className="mb-5 text-5xl font-bold uppercase ">
                  {propertyTitle}
                </h1>
                <p className="mb-5">
                  Lorem Ipsum has been the industry’s standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
              </div>
            </div>
          </div>
        </Parallax>
        {/* <Parallax
          style={{
            height: "70vh",
            width: "100vw",
          }}
          bgImage={propertyImg}
          renderLayer={percentage => (
            <div
              className=" border-4 border-red-500"
              style={{
                position: "absolute",
                background: `rgba(255, 125, 0, ${percentage * 20})`,
                left: "50%",
                top: "50%",
                // width: "500px",
                // height: "500px",
                border: "2px solid green",
              }}
            />
          )}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content md text-center text-neutral-content">
            <div className="max-w-xl sm:p-10 bg-[#00000065]">
              <h1 className="mb-5 text-5xl font-bold uppercase ">
                {propertyTitle}
              </h1>
              <p className="mb-5">
                Lorem Ipsum has been the industry’s standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </Parallax> */}
      </div>
      <div>
        <SectionTitle heading={"property details"}></SectionTitle>
      </div>
    </div>
  );
};

export default PropertyDetails;
