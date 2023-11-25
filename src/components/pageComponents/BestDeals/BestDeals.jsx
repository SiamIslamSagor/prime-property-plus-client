import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import PropertyCard from "../PropertyCard/PropertyCard";

const BestDeals = () => {
  // hooks
  const axiosPublic = useAxiosPublic();
  // state
  const [properties, setProperties] = useState([]);
  // effect
  useEffect(() => {
    axiosPublic
      .get("/properties.json")
      .then(res => {
        const response = res?.data;
        setProperties(response);
      })
      .catch(err => {
        console.log(err);
      });
  }, [axiosPublic]);

  console.log(properties);
  return (
    <div>
      <div>
        <SectionTitle heading={"best deals"}></SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {properties &&
          properties.map(property => (
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
