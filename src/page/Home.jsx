import { useState } from "react";
import PrimaryBtn from "../components/utilitiesComponents/PrimaryBtn";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import SecondaryBtn from "../components/utilitiesComponents/SecondaryBtn";
import UpdateBtn from "../components/utilitiesComponents/UpdateBtn";

const Home = () => {
  const [isLoadingPrimary, setIsLoadingPrimary] = useState(false);
  const [isLoadingSecondary, setIsLoadingSecondary] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  return (
    <div>
      <div className="">
        <SectionTitle heading={"hero section"}></SectionTitle>
      </div>
      <div className="flex gap-4 justify-center">
        {/* btn here */}
        {/* <div className="text-center my-20">
          <PrimaryBtn
            btnText="click"
            handler={() => {
              console.log("ck2");
              setIsLoadingPrimary(!isLoadingPrimary);
            }}
            isDisable={false}
            isLoadingBtn={isLoadingPrimary}
          ></PrimaryBtn>
        </div> */}
        <div className="text-center my-20">
          <UpdateBtn
            btnText="Update"
            handler={() => {
              console.log("ck2");
              setIsLoadingPrimary(!isLoadingPrimary);
            }}
            isDisable={false}
            isLoadingBtn={isLoadingPrimary}
          ></UpdateBtn>
        </div>
        {/* <div className="text-center my-20">
          <SecondaryBtn
            btnText="click"
            handler={() => {
              console.log("ck2");
              setIsLoadingSecondary(!isLoadingSecondary);
            }}
            isDisable={false}
            isLoadingBtn={isLoadingSecondary}
          ></SecondaryBtn>
        </div> */}
      </div>
      <div className="min-h-screen"></div>
    </div>
  );
};

export default Home;
