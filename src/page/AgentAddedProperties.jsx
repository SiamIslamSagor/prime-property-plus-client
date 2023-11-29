import { Helmet } from "react-helmet-async";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import { Toaster } from "react-hot-toast";
import useAgentProperties from "../hooks/useAgentProperties";
import CardHolder from "../components/pageComponents/CardHolder/CardHolder";
import { Link } from "react-router-dom";
import PrimaryBtn from "../components/utilitiesComponents/PrimaryBtn";
import { LuBadgeCheck } from "react-icons/lu";
import { Fade } from "react-awesome-reveal";
import useContextData from "../hooks/useContextData";
import DeleteBtn from "../components/utilitiesComponents/DeleteBtn";

const AgentAddedProperties = () => {
  // hooks
  const { agentPropertyInfo, isLoading } = useAgentProperties();
  const { propertyCardDelay } = useContextData();
  console.log(agentPropertyInfo);
  return (
    <div>
      <Helmet>
        <title>P P P | My Added Properties</title>
      </Helmet>

      <Toaster></Toaster>
      <div className="my-10 lg:my-20">
        <SectionTitle heading={"my added properties"}></SectionTitle>
      </div>
      <div>
        {isLoading ? (
          <div className=" grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
            <CardHolder></CardHolder>
          </div>
        ) : (
          <div className=" grid gap-8 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {agentPropertyInfo?.map((singleProperty, idx) => (
              <div key={singleProperty?._id} className="pt-2 overflow-y-hidden">
                <Fade triggerOnce direction="up" delay={propertyCardDelay[idx]}>
                  <div className="flex flex-col items-center justify-center">
                    <div>
                      <div className="card rounded-none rounded-tr-3xl rounded-bl-3xl w-96 bg-base-100  group hover:border hover:border-f-color ease-in-out hover:-translate-y-2 duration-[350ms] h-[520px]">
                        <figure>
                          <img
                            className="group-hover:scale-110 duration-1000  rounded-tr-3xl rounded-bl-3xl h-64 w-96"
                            src={singleProperty?.propertyImg}
                            alt="Shoes"
                          />
                        </figure>
                        <div className="flex flex-1 flex-col p-6 gap-2 leading-4 font-semibold">
                          <h2
                            className="flex items-center gap-2
            font-medium text-xl "
                          >
                            <p className="flex-1 text-2xl">
                              {singleProperty?.propertyTitle}
                            </p>
                            {/* {isHomePath && (
                            <div className="">
                              <div className="badge text-white bg-f-color">
                                Best Deals
                              </div>
                            </div>
                          )} */}
                          </h2>
                          <p>location: {singleProperty?.propertyLocation}</p>
                          {/* {isHomePath || <p>Agent Name: {agentName}</p>} */}

                          {/* <p>img</p> */}
                          <p>
                            Price Range: $
                            {singleProperty?.propertyPriceRange[0]} to $
                            {singleProperty?.propertyPriceRange[1]}
                          </p>
                          {/* {isHomePath || <p>Property Location: {propertyLocation}</p>} */}

                          <div className="flex flex-wrap  justify-start gap-2">
                            {/* {isHomePath && (
                            <div className="badge  text-white bg-p-color py-3">
                              <p className="flex gap-2 items-center ">
                                {propertyVerificationStatus}
                                <LuBadgeCheck></LuBadgeCheck>
                              </p>{" "}
                            </div>
                          )} */}
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full">
                              <img
                                className="w-12 h-12 rounded-full"
                                src={singleProperty?.agentImg}
                                alt={singleProperty?.agentName}
                              />
                            </div>
                            <div>
                              <p>{singleProperty?.agentName}</p>
                            </div>
                            {singleProperty?.propertyVerificationStatus ? (
                              <div className="badge  text-white bg-p-color py-3">
                                <p className="flex gap-2 items-center ">
                                  {singleProperty?.propertyVerificationStatus}
                                  {singleProperty?.propertyVerificationStatus ===
                                  "verified" ? (
                                    <LuBadgeCheck></LuBadgeCheck>
                                  ) : (
                                    " !!!"
                                  )}
                                </p>
                              </div>
                            ) : (
                              <div className="badge  text-white bg-p-color py-3">
                                <p className="flex gap-2 items-center ">
                                  pending...
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className=" mb-8   text-right flex justify-center">
                          <DeleteBtn btnText="delete"></DeleteBtn>
                          {singleProperty?.propertyVerificationStatus !==
                            "rejected" && (
                            <Link
                              to={`/dashboard/update-my-properties/${singleProperty?._id}`}
                            >
                              <PrimaryBtn btnText="update"></PrimaryBtn>
                            </Link>
                          )}
                          {singleProperty?.propertyVerificationStatus ===
                            "rejected" && (
                            <PrimaryBtn
                              isDisable={true}
                              btnText="update"
                            ></PrimaryBtn>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentAddedProperties;
