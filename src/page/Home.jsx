import HeroBanner from "../components/pageComponents/HeroBanner/HeroBanner";
import BestDeals from "../components/pageComponents/BestDeals/BestDeals";
import Testimonials from "../components/pageComponents/Testimonials/Testimonials";
import AboutUs from "../components/pageComponents/AboutUs/AboutUs";
import PropertySolution from "../components/pageComponents/PropertySolution/PropertySolution";
import LocationMap from "../components/pageComponents/LocationMap/LocationMap";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";

const Home = () => {
  return (
    <div className="">
      <HeroBanner></HeroBanner>
      <div className="my-20">
        <BestDeals></BestDeals>
      </div>
      <Testimonials></Testimonials>
      <PropertySolution></PropertySolution>
      <AboutUs></AboutUs>
      <div>
        <div className="my-20">
          <SectionTitle heading={"our location details in map"}></SectionTitle>
        </div>
        <LocationMap latitude={51.5072} longitude={0.1276}></LocationMap>
      </div>
    </div>
  );
};

export default Home;
