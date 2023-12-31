import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import useRequestedProperties from "../hooks/useRequestedProperties";
import {
  MdCancelPresentation,
  MdOutlineDomainVerification,
} from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useContextData from "../hooks/useContextData";

const RequestedProperties = () => {
  // hooks
  const { requestedPropertyData } = useRequestedProperties();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContextData();
  console.log(requestedPropertyData);

  // mutations
  const { mutate } = useMutation({
    mutationFn: async propertyId => {
      const toastId = toast.loading("processing...");
      console.log(propertyId);
      return axiosSecure
        .patch(`/property-bought/agent/${propertyId.id}`, propertyId)
        .then(res => {
          console.log(res.data);

          /////////////////////////
          axiosSecure
            .patch("/property/agent/accepted/rest-reject", propertyId.info)
            .then(res => {
              console.log("in axios");
              console.log(res.data);
              toast.success(`${propertyId.actionInfo.status} successfully.`, {
                id: toastId,
              });
            })
            .catch(err => {
              console.log("in axios err");
              console.log(err);
            });
          /////////////////////////

          toast.success(`${propertyId.actionInfo.status} successfully.`, {
            id: toastId,
          });
        })
        .catch(err => {
          console.log(err);
          console.log(propertyId.actionInfo.status);
          toast.error(`Failed to ${propertyId.actionInfo.status} .`, {
            id: toastId,
          });
        });
    },
    onSuccess: () => {
      console.log("accepted by mutate");
      queryClient.invalidateQueries(["requestedProperty", user && user?.email]);
    },
  });

  //   handler
  const handleAccept = (id, propertyTitle) => {
    console.log(id);
    const actionInfo = {
      status: "accepted",
    };

    const info = {
      propertyTitle: propertyTitle,
      agentEmail: user.email,
      propertyVerificationStatus: "pending",
    };
    console.log(info);
    ///////////////////////////
    // { propertyId: "65684dc7bdbc649f3ae58652", agentEmail: "developerw406@gmail.com", propertyVerificationStatus: 'pending'}
    //  { propertyId: '65685b9a77f277acd7a8f4a5', agentEmail: 'developerw406@gmail.com',  propertyVerificationStatus: 'pending' }

    ///////////////////////////
    //
    // console.log("out axios");

    /* axiosSecure
      .patch("/property/agent/accepted/rest-reject", info)
      .then(res => {
        console.log("in axios");
        console.log(res.data);
      })
      .catch(err => {
        console.log("in axios err");
        console.log(err);
      }); */
    // console.log("out axios 2");

    // TODO: comment out
    mutate({ id, actionInfo, info });
  };

  //   handler
  const handleReject = id => {
    console.log(id);
    const actionInfo = {
      status: "rejected",
    };
    //
    mutate({ id, actionInfo });
  };
  return (
    <div>
      <Helmet>
        <title>P P P | Dashboard | Requested Property</title>
      </Helmet>
      <Toaster></Toaster>
      <div className="my-10 lg:my-20">
        <SectionTitle heading={"requested properties"}></SectionTitle>
      </div>
      <div>
        <div className="px-2 sm:px-10">
          {requestedPropertyData && requestedPropertyData.length !== 0 && (
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead className="bg-s-color">
                  <tr className="text-white text-sm lg:text-lg rounded-t-full">
                    <th className="py-4 lg:py-6 xl:py-8 rounded-tl-2xl">#</th>
                    <th>Property Title</th>
                    <th>Property Location</th>
                    <th>Buyer Name</th>
                    <th className="text-center">Buyer Email</th>
                    <th className="text-center">Offered Amount</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Accept</th>
                    <th className="text-center rounded-tr-2xl">Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {requestedPropertyData &&
                    requestedPropertyData?.map((property, idx) => (
                      <tr className="hover" key={property?._id}>
                        <th>{idx + 1}</th>
                        <td className="text-sm lg:text-base">
                          <p>{property?.propertyTitle}</p>
                        </td>
                        <td className="text-sm lg:text-base">
                          <p>{property?.propertyLocation}</p>
                        </td>
                        <td className="text-sm lg:text-base">
                          <p>{property?.buyerName}</p>
                        </td>

                        <td className="text-center lg:text-base">
                          <p>{property?.buyerEmail}</p>
                        </td>
                        <td className="text-center lg:text-base">
                          <p>${property?.offeredAmount}</p>
                        </td>
                        <td className="text-center lg:text-base">
                          <p>
                            {property?.propertyVerificationStatus
                              ? property.propertyVerificationStatus
                              : "pending..."}
                          </p>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() =>
                              handleAccept(
                                property?._id,
                                property?.propertyTitle
                              )
                            }
                            disabled={
                              (property?.propertyVerificationStatus &&
                                property.propertyVerificationStatus ===
                                  "verified") ||
                              property.propertyVerificationStatus ===
                                "rejected" ||
                              property.propertyVerificationStatus ===
                                "accepted" ||
                              property.propertyVerificationStatus === "bought"
                                ? true
                                : false
                            }
                            className="btn rounded-full  bg-f-color border-f-color text-white hover:border-f-color hover:text-f-color hover:bg-white duration-[350ms] ease-in-out  btn-outline uppercase group max-sm:btn-sm sm:py-3 w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16  "
                          >
                            <span className="text-[20px]  max-sm:text-sm">
                              <MdOutlineDomainVerification className="text-lg md:text-2xl"></MdOutlineDomainVerification>
                            </span>{" "}
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => handleReject(property?._id)}
                            disabled={
                              (property?.propertyVerificationStatus &&
                                property.propertyVerificationStatus ===
                                  "verified") ||
                              property.propertyVerificationStatus ===
                                "rejected" ||
                              property.propertyVerificationStatus ===
                                "accepted" ||
                              property.propertyVerificationStatus === "bought"
                                ? true
                                : false
                            }
                            className="btn rounded-full  border-red-600 text-red-600 hover:bg-red-600 hover:border-red-600 duration-[350ms] ease-in-out  btn-outline uppercase group max-sm:btn-sm sm:py-3 w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 "
                          >
                            <span className="text-[20px]  max-sm:text-sm">
                              <MdCancelPresentation></MdCancelPresentation>
                            </span>{" "}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestedProperties;
