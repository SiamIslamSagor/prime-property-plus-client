import { useState } from "react";
import PrimaryBtn from "../components/utilitiesComponents/PrimaryBtn";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import SecondaryBtn from "../components/utilitiesComponents/SecondaryBtn";
import UpdateBtn from "../components/utilitiesComponents/UpdateBtn";
import DeleteBtn from "../components/utilitiesComponents/DeleteBtn";
import HeroBanner from "../components/pageComponents/HeroBanner/HeroBanner";
import PropertyCard from "../components/pageComponents/PropertyCard/PropertyCard";

const Home = () => {
  const [isLoadingPrimary, setIsLoadingPrimary] = useState(false);
  const [isLoadingSecondary, setIsLoadingSecondary] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="">
      <HeroBanner></HeroBanner>
      <div className="">
        <PropertyCard></PropertyCard>
      </div>
      {/* <div className="flex gap-4 justify-center"> */}
      {/* btn here */}
      <div className="text-center my-20">
        <PrimaryBtn
          btnText="click"
          handler={() => {
            console.log("ck2");
            setIsLoadingPrimary(!isLoadingPrimary);
          }}
          isDisable={false}
          isLoadingBtn={isLoadingPrimary}
        ></PrimaryBtn>
      </div>
      <div className="text-center my-20">
        <DeleteBtn
          btnText="delete"
          handler={() => {
            console.log("ck2");
            setIsDeleting(!isDeleting);
          }}
          isDisable={false}
          isLoadingBtn={isDeleting}
        ></DeleteBtn>
      </div>
      <div className="text-center my-20">
        <UpdateBtn
          btnText="Update"
          handler={() => {
            console.log("ck2");
            setIsUpdating(!isUpdating);
          }}
          isDisable={false}
          isLoadingBtn={isUpdating}
        ></UpdateBtn>
      </div>
      <div className="text-center my-20">
        <SecondaryBtn
          btnText="click"
          handler={() => {
            console.log("ck2");
            setIsLoadingSecondary(!isLoadingSecondary);
          }}
          isDisable={false}
          isLoadingBtn={isLoadingSecondary}
        ></SecondaryBtn>
      </div>
      {/* </div> */}
      <div className="min-h-screen"></div>
    </div>
  );
};

export default Home;
