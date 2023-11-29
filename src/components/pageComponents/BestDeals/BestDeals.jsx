import { useEffect, useState } from "react";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import PropertyCard from "../PropertyCard/PropertyCard";
import useContextData from "../../../hooks/useContextData";
import CardHolder from "../CardHolder/CardHolder";
import SecondaryBtn from "../../utilitiesComponents/SecondaryBtn";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import useAdvertiseProperty from "../../../hooks/useAdvertiseProperty";

const BestDeals = () => {
  // hooks

  //   context data
  const { propertyCardDelay } = useContextData();

  const { advertisePropertiesData, isLoading } = useAdvertiseProperty();
  // state

  const [bestDealsProperties, setBestDealsProperties] = useState(
    advertisePropertiesData
  );

  useEffect(() => {
    if (advertisePropertiesData.length > 0) {
      const bestDeals = advertisePropertiesData.sort(
        (a, b) => a.propertyPriceRange[0] - b.propertyPriceRange[0]
      );
      setBestDealsProperties(bestDeals?.slice(0, 6));
    }
  }, [advertisePropertiesData]);

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
                key={property?._id}
                property={property}
                animDelay={propertyCardDelay[idx]}
              ></PropertyCard>
            ))}
        </div>
      )}
      <div className="my-10 text-center overflow-hidden">
        <Fade direction="up" delay={300}>
          <Link to="/all-properties">
            <SecondaryBtn btnText="show more"></SecondaryBtn>
          </Link>
        </Fade>
      </div>
    </div>
  );
};

export default BestDeals;
