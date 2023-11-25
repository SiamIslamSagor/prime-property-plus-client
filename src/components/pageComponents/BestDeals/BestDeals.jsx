import { useEffect, useState } from "react";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../../hooks/useProperties";
import useContextData from "../../../hooks/useContextData";

const BestDeals = () => {
  // hooks

  //   context data
  const { propertyCardDelay } = useContextData();

  const { PropertiesData } = useProperties();
  // state

  const [bestDealsProperties, setBestDealsProperties] =
    useState(PropertiesData);

  useEffect(() => {
    const bestDeals = PropertiesData.sort(
      (a, b) => a.propertyPriceRange[0] - b.propertyPriceRange[0]
    );
    setBestDealsProperties(bestDeals?.slice(0, 6));
  }, [PropertiesData]);

  return (
    <div className="container mx-auto">
      <div className="my-10">
        <SectionTitle heading={"best deals"}></SectionTitle>
      </div>
      <div className=" grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {bestDealsProperties &&
          bestDealsProperties?.map((property, idx) => (
            <PropertyCard
              key={property?.agentEmail}
              property={property}
              animDelay={propertyCardDelay[idx]}
            ></PropertyCard>
          ))}
      </div>
    </div>
  );
};

export default BestDeals;
