import toast, { Toaster } from "react-hot-toast";
import SecondaryBtn from "../components/utilitiesComponents/SecondaryBtn";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import useContextData from "../hooks/useContextData";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  // hooks
  const { user } = useContextData();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // mutations
  const { mutate } = useMutation({
    mutationFn: async newProperty => {
      const toastId = toast.loading("processing...");
      console.log(newProperty);

      return axiosSecure
        .post("/properties/agent/add", newProperty)
        .then(res => {
          console.log(res.data);
          toast.success("property added successfully.", { id: toastId });
          navigate("/dashboard/my-added-properties");
        })
        .catch(err => {
          console.log(err);
          toast.error("Failed to add property.", { id: toastId });
        });
    },
    onSuccess: () => {
      console.log("property added by mutate");
      queryClient.invalidateQueries(["allProperty"]);
    },
  });

  //   handler
  const handleAddNewProperty = e => {
    e.preventDefault();
    const form = e.target;
    const newProperty = {
      propertyImg: form.propertyImg.value,
      propertyTitle: form.propertyTitle.value,
      propertyLocation: form.propertyLocation.value,
      propertyPriceRange: [
        form.propertyPriceRangeMin.value * 1,
        form.propertyPriceRangeMax.value * 1,
      ],
      propertyFeatures: [form.propertyFeatures.value],
      propertyBeauty: [form.propertyBeauty.value],

      agentImg: user.photoURL,
      agentName: user.displayName,
      agentEmail: user.email,

      locationDetails: {
        latitude: form.locationDetailsLatitude.value * 1,
        longitude: form.locationDetailsLongitude.value * 1,
      },

      locationDescription: form.locationDescription.value,
      propertyDescription: form.propertyDescription.value,
    };
    console.log(newProperty);
    console.log(JSON.stringify(newProperty));

    // send new property data in server side by using mutation, and store in db
    mutate(newProperty);
  };
  return (
    <div>
      <Helmet>
        <title>P P P | Dashboard | Add Property</title>
      </Helmet>
      <Toaster></Toaster>
      <div className="my-10 lg:my-20">
        <SectionTitle heading={"add property"}></SectionTitle>
      </div>
      <div>
        <div>
          <div className="flex items-center justify-center max-sm:px-2 group my-10">
            <form
              onSubmit={handleAddNewProperty}
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
                    placeholder="Property Image URL"
                    name="propertyImg"
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                    Property Title
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Property Title"
                    name="propertyTitle"
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                    Property Location
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Property Location"
                    name="propertyLocation"
                  />
                </div>
                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                    Latitude (optional Example: 42)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    //   placeholder="Property Title"
                    name="locationDetailsLatitude"
                  />
                </div>
                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                    Longitude (optional Example: -71)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    //   placeholder="Property Title"
                    name="locationDetailsLongitude"
                  />
                </div>
                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                    Property Features (optional)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Property Features"
                    name="propertyFeatures"
                  />
                </div>
                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                    Property Beauty (optional)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Property Beauty"
                    name="propertyBeauty"
                  />
                </div>
                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                    Location Description (optional)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Property Location Description"
                    name="locationDescription"
                  />
                </div>
                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                    Property Description
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    required
                    placeholder="Property Description"
                    name="propertyDescription"
                  />
                </div>
                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                    Minimum Price Range ($)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    required
                    //   placeholder="Property Title"
                    name="propertyPriceRangeMin"
                  />
                </div>
                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                    Maximum Price Range ($)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    required
                    //   placeholder="Property Title"
                    name="propertyPriceRangeMax"
                  />
                </div>
              </div>

              <div className="text-center">
                <SecondaryBtn btnType="submit" btnText="add"></SecondaryBtn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
