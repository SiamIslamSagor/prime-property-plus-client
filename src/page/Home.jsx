import { useState } from "react";
import HeroBanner from "../components/pageComponents/HeroBanner/HeroBanner";
import BestDeals from "../components/pageComponents/BestDeals/BestDeals";
import Testimonials from "../components/pageComponents/Testimonials/Testimonials";
import AboutUs from "../components/pageComponents/AboutUs/AboutUs";
import PropertySolution from "../components/pageComponents/PropertySolution/PropertySolution";
import LocationMap from "../components/pageComponents/LocationMap/LocationMap";

const Home = () => {
  const [isLoadingPrimary, setIsLoadingPrimary] = useState(false);
  const [isLoadingSecondary, setIsLoadingSecondary] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="">
      <HeroBanner></HeroBanner>
      <div className="my-20">
        <BestDeals></BestDeals>
      </div>
      <Testimonials></Testimonials>
      <PropertySolution></PropertySolution>
      <AboutUs></AboutUs>
      <LocationMap latitude={51.5072} longitude={0.1276}></LocationMap>

      {/* <div className="min-h-screen"></div> */}
    </div>
  );
};

export default Home;
