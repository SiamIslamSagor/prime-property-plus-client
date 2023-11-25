import React from "react";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import PrimaryBtn from "../../utilitiesComponents/PrimaryBtn";

const PropertyCard = () => {
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

  return (
    <div className="flex flex-col items-center justify-center my-40">
      <SectionTitle heading={"best deal"}></SectionTitle>
      <div>
        <div className="card rounded-none rounded-tr-3xl rounded-bl-3xl w-96 bg-base-100 shadow-xl group hover:border hover:border-f-color translate-y-2 hover:-translate-y-2 duration-1000">
          <figure>
            <img
              className="group-hover:scale-110 duration-1000  rounded-tr-3xl rounded-bl-3xl"
              src={data.propertyImg}
              alt="Shoes"
            />
          </figure>
          <div className="flex flex-1 flex-col p-8 gap-2">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
              <PrimaryBtn></PrimaryBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
