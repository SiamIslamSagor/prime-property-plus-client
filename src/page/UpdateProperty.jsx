import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
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
    agentName,
    agentEmail,
    locationDetails,
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

  // mutations
  const { mutate } = useMutation({
    mutationFn: async data => {
      const toastId = toast.loading("processing...");
      console.log(data._id, data.updatedProperty);

      return axiosSecure
        .put(`/property/agent/update/${data._id}`, data.updatedProperty)
        .then(res => {
          console.log(res.data);
          toast.success("Update successfully.", { id: toastId });
          navigate("/dashboard/my-added-properties");
        })
        .catch(err => {
          console.log(err);
          toast.error("Failed to Update.", { id: toastId });
        });
    },
    onSuccess: () => {
      console.log("property updated by mutate");
      queryClient.invalidateQueries(["allProperty"]);
    },
  });

  //   handler
  const handleUpdateProperty = e => {
    e.preventDefault();
    const form = e.target;
    const updatedProperty = {
      propertyImg: form.propertyImg.value,
      propertyTitle: form.propertyTitle.value,
      propertyLocation: form.propertyLocation.value,
      propertyPriceRange: [
        form.propertyPriceRangeMin.value * 1,
        form.propertyPriceRangeMax.value * 1,
      ],
      locationDetails: {
        latitude: form.locationDetailsLatitude.value * 1,
        longitude: form.locationDetailsLongitude.value * 1,
      },
      propertyFeatures: [form.propertyFeatures.value],
      propertyBeauty: [form.propertyBeauty.value],
    };
    console.log({ _id, updatedProperty });

    // send updated data in server side to update this property
    mutate({ _id, updatedProperty });
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
      {/* <p>{propertyTitle?.propertyTitle}</p> */}
      <div>
        {1 === 1 && (
          <div>
            <div className="flex items-center justify-center max-sm:px-2 group my-10">
              <form
                onSubmit={handleUpdateProperty}
                className="w-full max-sm:max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl"
              >
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Property Image
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="url"
                      //   placeholder="Property Title"
                      name="propertyImg"
                      defaultValue={propertyImg}
                    />
                  </div>
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Property Title
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      //   placeholder="Property Title"
                      name="propertyTitle"
                      defaultValue={propertyTitle}
                    />
                  </div>
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Property Location
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      //   placeholder="Property Title"
                      name="propertyLocation"
                      defaultValue={propertyLocation}
                    />
                  </div>
                  <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Latitude (optional Example: 45.4215)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="number"
                      //   placeholder="Property Title"
                      name="locationDetailsLatitude"
                      defaultValue={locationDetails?.latitude}
                    />
                  </div>
                  <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Longitude (optional Example: -122.6731)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="number"
                      //   placeholder="Property Title"
                      name="locationDetailsLongitude"
                      defaultValue={locationDetails?.longitude}
                    />
                  </div>
                  <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Property Features (optional)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      //   placeholder="Property Title"
                      name="propertyFeatures"
                      defaultValue={propertyFeatures}
                    />
                  </div>
                  <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Property Beauty (optional)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      //   placeholder="Property Title"
                      name="propertyBeauty"
                      defaultValue={propertyBeauty}
                    />
                  </div>
                  <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Minimum Price Range ($)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="number"
                      //   placeholder="Property Title"
                      name="propertyPriceRangeMin"
                      defaultValue={propertyPriceRange && propertyPriceRange[0]}
                    />
                  </div>
                  <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                      Maximum Price Range ($)
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="number"
                      //   placeholder="Property Title"
                      name="propertyPriceRangeMax"
                      defaultValue={propertyPriceRange && propertyPriceRange[1]}
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
                      readOnly
                      defaultValue={agentName}
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
                      readOnly
                      defaultValue={agentEmail}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <UpdateBtn btnType="submit" btnText="update"></UpdateBtn>
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
