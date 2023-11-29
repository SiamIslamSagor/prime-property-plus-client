import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import useAllProperties from "../hooks/useAllProperties";
import {
  MdCancelPresentation,
  MdOutlineDomainVerification,
} from "react-icons/md";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";

const ManageProperties = () => {
  // hooks
  const axiosSecure = useAxiosSecure();
  const { allPropertyInfo, refetch } = useAllProperties();
  console.log(allPropertyInfo);

  //

  // handler
  const handleVerify = id => {
    const toastId = toast.loading("processing...");

    console.log(id);
    axiosSecure
      .patch(`/properties/${id}`, {
        status: "verified",
      })
      .then(res => {
        console.log(res.data);
        toast.success("verified successfully.", { id: toastId });
      })
      .catch(() => {
        toast.error("Failed to verified.", { id: toastId });
      });

    refetch();
  };

  const handleReject = id => {
    const toastId = toast.loading("processing...");

    console.log(id);
    axiosSecure
      .patch(`/properties/${id}`, {
        status: "rejected",
      })
      .then(res => {
        console.log(res.data);
        toast.success("rejected successfully.", { id: toastId });
      })
      .catch(() => {
        toast.error("Failed to rejected.", { id: toastId });
      });

    refetch();
  };
  return (
    <div>
      <Helmet>
        <title>P P P | Dashboard | Manage Properties</title>
      </Helmet>
      <Toaster></Toaster>
      <div className="my-10 lg:my-20">
        <SectionTitle heading={"manage properties"}></SectionTitle>
      </div>
      <div className="px-2 sm:px-10">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-s-color">
              <tr className="text-white text-sm lg:text-lg rounded-t-full">
                <th className="py-4 lg:py-6 xl:py-8 rounded-tl-2xl">#</th>
                <th>Property Title</th>
                <th>Property Location</th>
                <th>Agent Name</th>
                <th className="text-center">Agent Email</th>
                <th className="text-center">Price Range</th>
                <th className="text-center">Status</th>
                <th className="text-center">Verify</th>
                <th className="text-center rounded-tr-2xl">Reject</th>
              </tr>
            </thead>
            <tbody>
              {allPropertyInfo &&
                allPropertyInfo?.map((property, idx) => (
                  <tr className="hover" key={property?._id}>
                    <th>{idx + 1}</th>
                    <td className="text-sm lg:text-base">
                      <p>{property?.propertyTitle}</p>
                    </td>
                    <td className="text-sm lg:text-base">
                      <p>{property?.propertyLocation}</p>
                    </td>
                    <td className="text-sm lg:text-base">
                      <p>{property?.agentName}</p>
                    </td>

                    <td className="text-center lg:text-base">
                      <p>{property?.agentEmail}</p>
                    </td>
                    <td className="text-center lg:text-base">
                      <p>{`$${property?.propertyPriceRange[0]} to $${property?.propertyPriceRange[1]}`}</p>
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
                        onClick={() => handleVerify(property?._id)}
                        disabled={
                          (property?.propertyVerificationStatus &&
                            property.propertyVerificationStatus ===
                              "verified") ||
                          property.propertyVerificationStatus === "rejected"
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
                          property.propertyVerificationStatus === "rejected"
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
      </div>
    </div>
  );
};

export default ManageProperties;
