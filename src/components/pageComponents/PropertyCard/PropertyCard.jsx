import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import PrimaryBtn from "../../utilitiesComponents/PrimaryBtn";
import { LuBadgeCheck } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PropertyCard = () => {
  // hooks
  const location = useLocation();

  // state
  const [isHomePath, setIsHomePath] = useState(true);

  const data = {
    propertyImg: "https://i.ibb.co/TYT1m3d/home12.jpg",
    propertyTitle: "Elegant Townhome",
    propertyLocation: "Sophisticated Suburb",
    propertyPriceRange: [5000, 8000],
    propertyVerificationStatus: "verified",
    propertyFeatures: [
      "Gourmet Kitchen",
      "Private Patio",
      "Luxurious Finishes",
    ],
    propertyBeauty: "Classic elegance and modern amenities",
    agentImg: "https://i.ibb.co/sRZchZr/12.png",
    agentName: "Ava Robinson",
    agentEmail: "ava.robinson@example.com",
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePath(true);
    } else setIsHomePath(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center my-40">
      <SectionTitle heading={"best deal"}></SectionTitle>
      <div>
        <div className="card rounded-none rounded-tr-3xl rounded-bl-3xl w-96 bg-base-100 shadow-xl group hover:border hover:border-f-color ease-in-out hover:-translate-y-2 duration-[350ms]">
          <figure>
            <img
              className="group-hover:scale-110 duration-1000  rounded-tr-3xl rounded-bl-3xl"
              src={data.propertyImg}
              alt="Shoes"
            />
          </figure>
          <div className="flex flex-1 flex-col p-8 gap-2 leading-4">
            <h2 className="card-title">
              {data?.propertyTitle}
              {isHomePath && (
                <div className="badge text-white bg-f-color">Best Deals</div>
              )}
            </h2>
            <p>location: {data?.propertyLocation}</p>
            <p>
              Price Range: ${data?.propertyPriceRange[0]} to $
              {data?.propertyPriceRange[1]}
            </p>
            {isHomePath || <p>Agent Name: {data?.agentName}</p>}
            {isHomePath || <p>Agent Name: {data?.propertyLocation}</p>}

            <div className="flex flex-wrap  justify-start gap-2">
              <div className="badge  text-white bg-p-color py-3">
                <p className="flex gap-2 items-center ">
                  {data?.propertyVerificationStatus}
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

export default PropertyCard;
