import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import LocationMap from "../LocationMap/LocationMap";

const OurLocationMap = () => {
  return (
    <div>
      <div className="my-20">
        <SectionTitle heading={"our location details in map"}></SectionTitle>
      </div>
      <LocationMap latitude={51.5072} longitude={0.1276}></LocationMap>
    </div>
  );
};

export default OurLocationMap;
