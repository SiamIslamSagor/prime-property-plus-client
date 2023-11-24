import { useState } from "react";
import PrimaryBtn from "../components/utilitiesComponents/PrimaryBtn";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <div className="">
        <SectionTitle heading={"hero section"}></SectionTitle>
      </div>
      <div className="flex gap-4 justify-center">
        {/* btn here */}
        <div className="text-center my-20">
          <PrimaryBtn
            btnText="click"
            handler={() => {
              console.log("ck2");
              setIsLoading(!isLoading);
            }}
            isDisable={false}
            isLoadingBtn={isLoading}
            className="btn btn-primary"
          ></PrimaryBtn>
        </div>
        <div className="text-center my-20">
          <PrimaryBtn
            btnText="click"
            handler={() => {
              console.log("ck2");
              setIsLoading(!isLoading);
            }}
            isDisable={false}
            isLoadingBtn={isLoading}
            className="btn btn-primary"
          ></PrimaryBtn>
        </div>
      </div>
      <div className="min-h-screen"></div>
    </div>
  );
};

export default Home;
