import { useNavigate, useParams } from "react-router-dom";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import PrimaryBtn from "../components/utilitiesComponents/PrimaryBtn";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useContextData from "../hooks/useContextData";
import { useForm } from "react-hook-form";
import { getCurrentTimeAndDate } from "../utils/getCurrentTimeAndDate";
import toast, { Toaster } from "react-hot-toast";

const MakeAnOffer = () => {
  // hooks
  const offerPropertyId = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContextData();
  const navigate = useNavigate();

  //   state

  const [propertyInfo, setPropertyInfo] = useState({});
  const [lowerPrice, setLowerPrice] = useState(0);
  const [hightsPrice, setHightsPrice] = useState(0);
  const [dateErr, setDateErr] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  //   react hook from
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   handler
  const onSubmit = data => {
    const toastId = toast.loading("processing...");
    const { _id, ...rest } = propertyInfo;
    const propertyBoughtInfo = { ...data, ...rest };
    ///////////////////
    //  send info in server side
    axiosSecure
      .post("/property-bought", propertyBoughtInfo)
      .then(res => {
        console.log(res.data);
        toast.success("Offered successfully.", { id: toastId });
        navigate("/dashboard/wish-list");
      })
      .catch(err => {
        console.log(err);
        toast.error("Failed to Offered.", { id: toastId });
      });

    ///////////////////
  };

  // effect

  useEffect(() => {
    if (offerPropertyId?.id) {
      axiosSecure
        .get(`/wish-list-item/${offerPropertyId?.id}`)
        .then(res => {
          setPropertyInfo(res.data);
          setLowerPrice(res.data?.propertyPriceRange[0]);
          setHightsPrice(res.data?.propertyPriceRange[1]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [offerPropertyId, axiosSecure]);

  useEffect(() => {
    const ck = getCurrentTimeAndDate().split(",")[0].split("/").reverse();
    const [year, day, month] = ck;
    setCurrentDate(`${year}-${month}-${day}`);
  }, []);
  console.log(currentDate);

  return (
    <div>
      <Toaster></Toaster>
      <div className="mt-10 lg:mt-20">
        <SectionTitle heading={"make an offer"}></SectionTitle>
      </div>
      <div>
        <div className="flex items-center justify-center max-sm:px-2 group my-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-sm:max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                  //   for="grid-password"
                >
                  Property Title
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-600 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="url"
                  defaultValue={propertyInfo?.propertyTitle}
                  placeholder="Property Title"
                  required
                  readOnly
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
                  className="appearance-none block w-full bg-gray-200 text-gray-600 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="url"
                  defaultValue={propertyInfo?.propertyLocation}
                  placeholder="Property Location"
                  readOnly
                  required
                  name="foodImage"
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                  //   for="grid-password"
                >
                  Agent Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-600 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="url"
                  defaultValue={propertyInfo?.agentName}
                  placeholder="Agent Name"
                  required
                  readOnly
                  name="foodImage"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                  Buyer Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-3 px-4 leading-tight mb-2 focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Buyer Name"
                  required
                  defaultValue={user?.displayName}
                  readOnly
                />
              </div>
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                  Buyer Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Buyer Email"
                  required
                  defaultValue={user?.email}
                  readOnly
                />
              </div>
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2 mt-2">
                  Offer Amount
                </label>
                <input
                  className="input input-bordered input-info w-full "
                  type="number"
                  placeholder="$ Offer Your Amount Here"
                  required
                  autoFocus
                  {...register("offeredAmount", {
                    required: true,
                    min: lowerPrice,
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.offeredAmount?.type === "min" && (
                  <p className="text-sm text-red-600 mt-1">
                    your offer amount must greater than or equal price range [ $
                    {lowerPrice} to ${hightsPrice}] *
                  </p>
                )}
              </div>
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2 mt-2">
                  Buying Date
                </label>
                <input
                  className="input input-bordered input-info w-full "
                  type="date"
                  min={currentDate}
                  required
                  {...register("buyingDate", { required: true })}
                />
              </div>
            </div>
            <div className="text-center">
              <PrimaryBtn btnType="submit" btnText="offer"></PrimaryBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeAnOffer;
