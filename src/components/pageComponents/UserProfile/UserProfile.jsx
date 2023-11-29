import { Fade } from "react-awesome-reveal";
import useContextData from "../../../hooks/useContextData";
import SecondaryBtn from "../../utilitiesComponents/SecondaryBtn";
import { useState } from "react";
import SectionTitle from "../../utilitiesComponents/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import useAdmin from "../../../hooks/useAdmin";
import useAgent from "../../../hooks/useAgent";

const UserProfile = () => {
  // hooks
  const { user } = useContextData();
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();
  console.log("isAdmin: ", isAdmin);
  console.log("isAgent: ", isAgent);

  //   state
  //   TODO: edit profile functionality
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[75vh]">
      <Helmet>
        <title>P P P | Dashboard | My Profile</title>
      </Helmet>
      <div>
        <div className="my-10">
          <SectionTitle heading={"my profile"}></SectionTitle>
        </div>
        <div>
          <div className="mb-24 flex flex-col items-center justify-center container mx-auto font-medium">
            <Fade delay={550}>
              <div className="mb-5">
                <img
                  className="w-36 h-36 rounded-full"
                  src={user?.photoURL && user?.photoURL}
                  alt={user?.displayName && user?.displayName}
                />
              </div>
            </Fade>
            {isAdmin && (
              <Fade delay={900}>
                <h5 className="text-xl md:text-xl mt-2">
                  Role: <span className="text-t-color">P P P Admin</span>
                </h5>
              </Fade>
            )}
            {isAgent && (
              <Fade delay={900}>
                <h5 className="text-xl md:text-xl mt-2">
                  Role: <span className="text-t-color">P P P Agent</span>
                </h5>
              </Fade>
            )}
            <Fade delay={700}>
              <h4 className="text-2xl md:text-3xl">
                Welcome :{" "}
                <span className="text-t-color">
                  {user?.displayName && user?.displayName}
                </span>
              </h4>
            </Fade>

            <Fade delay={800}>
              <h5 className="text-xl md:text-xl mt-2">
                Email:{" "}
                <span className="text-t-color">
                  {user?.email && user?.email}
                </span>
              </h5>
            </Fade>

            <div className="overflow-hidden my-5">
              <Fade direction="down" delay={1000}>
                <SecondaryBtn
                  btnText="edit profile"
                  isLoadingBtn={isLoadingBtn}
                ></SecondaryBtn>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
