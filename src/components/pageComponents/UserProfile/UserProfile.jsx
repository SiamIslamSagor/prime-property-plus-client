import { Fade } from "react-awesome-reveal";
import useContextData from "../../../hooks/useContextData";
import SecondaryBtn from "../../utilitiesComponents/SecondaryBtn";
import { useState } from "react";

const UserProfile = () => {
  const { user } = useContextData();

  //   state
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div>
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
