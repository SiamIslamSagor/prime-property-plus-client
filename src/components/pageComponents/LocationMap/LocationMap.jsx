import { Map, Marker } from "pigeon-maps";
import PropTypes from "prop-types";

const LocationMap = ({ latitude, longitude }) => {
  return (
    <div>
      <Map height={550} defaultCenter={[latitude, longitude]} defaultZoom={11}>
        <Marker width={50} anchor={[latitude, longitude]} />
      </Map>
    </div>
  );
};

LocationMap.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export default LocationMap;
