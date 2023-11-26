import CardHolder from "../components/pageComponents/CardHolder/CardHolder";
import OurLocationMap from "../components/pageComponents/OurLocationMap/OurLocationMap";
import PropertyCard from "../components/pageComponents/PropertyCard/PropertyCard";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import useContextData from "../hooks/useContextData";
import useVerifiedProperty from "../hooks/useVerifiedProperty";

const AllProperties = () => {
  // state

  // context data
  const { propertyCardDelay } = useContextData();

  // hooks
  const { verifiedPropertiesData, isLoading } = useVerifiedProperty();

  // handler
  return (
    <div className="container mx-auto">
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
