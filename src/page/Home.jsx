import { useState } from "react";
import PrimaryBtn from "../components/utilitiesComponents/PrimaryBtn";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import SecondaryBtn from "../components/utilitiesComponents/SecondaryBtn";
import UpdateBtn from "../components/utilitiesComponents/UpdateBtn";
import DeleteBtn from "../components/utilitiesComponents/DeleteBtn";
import HeroBanner from "../components/pageComponents/HeroBanner/HeroBanner";
import PropertyCard from "../components/pageComponents/PropertyCard/PropertyCard";
import BestDeals from "../components/pageComponents/BestDeals/BestDeals";
import Testimonials from "../components/pageComponents/Testimonials/Testimonials";
import CardHolder from "../components/pageComponents/CardHolder/CardHolder";
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
        {/* <CardHolder></CardHolder> */}
      </div>
      <Testimonials></Testimonials>
      <PropertySolution></PropertySolution>
      <AboutUs></AboutUs>
      <LocationMap></LocationMap>
      {/* <div className="flex gap-4 justify-center"> */}
      {/* btn here */}

      {/* </div> */}
      {/* <div className="min-h-screen"></div> */}
    </div>
  );
};

export default Home;
