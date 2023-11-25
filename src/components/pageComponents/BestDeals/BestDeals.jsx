import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../../hooks/useProperties";

const BestDeals = () => {
  // hooks
  //   const axiosPublic = useAxiosPublic();

  const { PropertiesData } = useProperties();
  console.log(PropertiesData);
  // state

  return (
    <div className="container mx-auto">
      <div>
        <SectionTitle heading={"best deals"}></SectionTitle>
      </div>
      <div className=" grid gap-4 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {PropertiesData &&
          PropertiesData?.map(property => (
            <PropertyCard
              key={property?.agentEmail}
              property={property}
            ></PropertyCard>
          ))}
      </div>
    </div>
  );
};

export default BestDeals;
