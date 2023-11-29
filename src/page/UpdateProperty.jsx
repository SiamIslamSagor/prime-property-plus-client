import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import UpdateBtn from "../components/utilitiesComponents/UpdateBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const UpdateProperty = () => {
  // hooks
  const { id: clickedProperty } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // state
  const [property, setProperty] = useState({});

  const {
    _id,
    propertyImg,
    propertyTitle,
    propertyLocation,
    propertyPriceRange,
    propertyFeatures,
    propertyBeauty,
    agentImg,
    agentName,
    agentEmail,
    locationDetails,
    locationDescription,
    propertyDescription,
    isAdvertiseProperty,
    propertyVerificationStatus,
  } = property;

  // useEffect
  useEffect(() => {
    axiosSecure
      .get(`/property/details/${clickedProperty}`)
      .then(res => {
        const data = res.data;
        setProperty(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [axiosSecure, clickedProperty]);
  console.log(property);

  // mutations
  const { mutate } = useMutation({
    mutationFn: async newOffer => {
      const toastId = toast.loading("processing...");

      return axiosSecure
        .post("/property-bought", newOffer)
        .then(res => {
          console.log(res.data);
          toast.success("Offered successfully.", { id: toastId });
          navigate("/dashboard/my-added-properties");
        })
        .catch(err => {
          console.log(err);
          toast.error("Failed to Offered.", { id: toastId });
        });
    },
  });

  //   react hook from
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   handler
  const onSubmit = data => {
    // const toastId = toast.loading("processing...");
    const { _id, propertyVerificationStatus, ...rest } = property;
    const propertyBoughtInfo = {
      data,
    };
    ///////////////////
    //  send info in server side

    mutate(propertyBoughtInfo);

    /* axiosSecure
      .post("/property-bought", propertyBoughtInfo)
      .then(res => {
        console.log(res.data);
        toast.success("Offered successfully.", { id: toastId });
        navigate("/dashboard/wish-list");
      })
      .catch(err => {
        console.log(err);
        toast.error("Failed to Offered.", { id: toastId });
      }); */

    ///////////////////
  };

  return (
    <div>
      <Helmet>
        <title>P P P | Dashboard | Update Property</title>
      </Helmet>
      <Toaster></Toaster>
      <div className="my-10 lg:my-20">
        <SectionTitle heading={"update property"}></SectionTitle>
      </div>
      <p>{propertyTitle?.propertyTitle}</p>
      <div>
        {property?.propertyTitle && (
          <div>
            <div className="flex items-center justify-center max-sm:px-2 group my-10">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-sm:max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl"
              >
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Property Image
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      defaultValue={propertyImg}
                      //   placeholder="Property Title"
                      required
                      name="foodImage"
                    />
                  </div>
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Property Title
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      defaultValue={propertyTitle}
                      //   placeholder="Property Title"
                      required
                      name="foodImage"
                    />
                  </div>
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Property Location
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      defaultValue={propertyLocation}
                      //   placeholder="Property Title"
                      required
                      name="foodImage"
                    />
                  </div>
                  <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Latitude (optional)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      defaultValue={locationDetails.latitude}
                      //   placeholder="Property Title"
                      required
                    />
                  </div>
                  <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Longitude (optional)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      defaultValue={locationDetails.longitude}
                      //   placeholder="Property Title"
                      required
                    />
                  </div>

                  <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Minimum Price Range ($)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="number"
                      defaultValue={propertyPriceRange[0]}
                      //   placeholder="Property Title"
                      required
                      name="foodImage"
                    />
                  </div>
                  <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Maximum Price Range ($)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="number"
                      defaultValue={propertyPriceRange[1]}
                      //   placeholder="Property Title"
                      required
                      name="foodImage"
                    />
                  </div>
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                      //   for="grid-password"
                    >
                      Property Location
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100 text-gray-600 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="url"
                      defaultValue={propertyLocation}
                      placeholder="Property Location"
                      required
                      name="foodImage"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Agent Name
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-3 px-4 leading-tight mb-2 focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      placeholder="Agent Name"
                      required
                      defaultValue={agentName}
                      readOnly
                    />
                  </div>
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Agent Email
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      placeholder="Agent Email"
                      required
                      defaultValue={agentEmail}
                      readOnly
                    />
                  </div>
                </div>
                <div className="text-center">
                  <UpdateBtn btnType="update" btnText="offer"></UpdateBtn>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProperty;
