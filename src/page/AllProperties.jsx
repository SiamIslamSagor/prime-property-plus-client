import { Helmet } from "react-helmet-async";
import CardHolder from "../components/pageComponents/CardHolder/CardHolder";
import OurLocationMap from "../components/pageComponents/OurLocationMap/OurLocationMap";
import PropertyCard from "../components/pageComponents/PropertyCard/PropertyCard";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import useContextData from "../hooks/useContextData";
import useVerifiedProperty from "../hooks/useVerifiedProperty";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const AllProperties = () => {
  // state

  // context data
  const { propertyCardDelay, scrollTop } = useContextData();

  // hooks
  const { verifiedPropertiesData, isLoading } = useVerifiedProperty();

  // effect
  useEffect(() => {
    scrollTop();
  }, [scrollTop]);

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>P P P | All Properties</title>
      </Helmet>

      <Toaster></Toaster>
      <div className="max-lg:my-10 lg:my-20">
        <SectionTitle heading={"all properties"}></SectionTitle>{" "}
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
          {verifiedPropertiesData &&
            verifiedPropertiesData?.map((property, idx) => (
              <PropertyCard
                key={property?.agentEmail}
                property={property}
                animDelay={propertyCardDelay[idx]}
              ></PropertyCard>
            ))}
        </div>
      )}
      <div>
        <OurLocationMap></OurLocationMap>
      </div>
    </div>
  );
};

export default AllProperties;
