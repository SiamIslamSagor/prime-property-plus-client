import { useParams } from "react-router-dom";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import PrimaryBtn from "../components/utilitiesComponents/PrimaryBtn";

const MakeAnOffer = () => {
  const offerPropertyId = useParams();
  //   console.log(offerPropertyId);
  return (
    <div>
      <div className="mt-10 lg:mt-20">
        <SectionTitle heading={"make an offer"}></SectionTitle>
      </div>
      <div>
        <div className="flex items-center justify-center max-sm:px-2 group my-10">
          <form
            // onSubmit={handleSubmit}
            className="w-full max-sm:max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl"
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                  //   for="grid-password"
                >
                  Food Image
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-600 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="url"
                  placeholder="Food Image"
                  required
                  name="foodImage"
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                  //   for="grid-password"
                >
                  Food Image
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-600 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="url"
                  placeholder="Food Image"
                  required
                  name="foodImage"
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                  //   for="grid-password"
                >
                  Food Image
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-600 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="url"
                  placeholder="Food Image"
                  required
                  name="foodImage"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                  Food Donar Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-300 text-gray-400 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Food Donar Name"
                  required
                  //   defaultValue={user?.displayName}
                  readOnly
                />
              </div>
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
                  Food Donar Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-300 text-gray-400 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Food Donar Name"
                  required
                  //   defaultValue={user?.displayName}
                  readOnly
                />
              </div>
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2 mt-2">
                  Food Donar Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-300 text-gray-400 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="email"
                  placeholder="Food Donar Email"
                  required
                  //   defaultValue={user?.email}
                  readOnly
                />
              </div>
            </div>
            <div className="text-center">
              <PrimaryBtn btnText="offer"></PrimaryBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeAnOffer;
