import HeroBanner from "../components/pageComponents/HeroBanner/HeroBanner";
import BestDeals from "../components/pageComponents/BestDeals/BestDeals";
import Testimonials from "../components/pageComponents/Testimonials/Testimonials";
import AboutUs from "../components/pageComponents/AboutUs/AboutUs";
import PropertySolution from "../components/pageComponents/PropertySolution/PropertySolution";
import OurLocationMap from "../components/pageComponents/OurLocationMap/OurLocationMap";

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
      <OurLocationMap></OurLocationMap>
    </div>
  );
};

export default Home;
