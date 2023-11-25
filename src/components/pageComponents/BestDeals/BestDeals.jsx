import { useEffect, useState } from "react";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../../hooks/useProperties";
import useContextData from "../../../hooks/useContextData";
import CardHolder from "../CardHolder/CardHolder";

const BestDeals = () => {
  // hooks

  //   context data
  const { propertyCardDelay } = useContextData();

  const { propertiesData, isLoading } = useProperties();
  // state

  const [bestDealsProperties, setBestDealsProperties] =
    useState(propertiesData);

  useEffect(() => {
    if (propertiesData.length > 0) {
      const bestDeals = propertiesData.sort(
        (a, b) => a.propertyPriceRange[0] - b.propertyPriceRange[0]
      );
      setBestDealsProperties(bestDeals?.slice(0, 6));
    }
  }, [propertiesData]);

  return (
    <div className="container mx-auto">
      <div className="my-10">
        <SectionTitle heading={"best deals"}></SectionTitle>
      </div>
      {isLoading ? (
        <div className=" grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <CardHolder></CardHolder>
          <CardHolder></CardHolder>
          <CardHolder></CardHolder>
          <CardHolder></CardHolder>
          <CardHolder></CardHolder>
          <CardHolder></CardHolder>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default BestDeals;
