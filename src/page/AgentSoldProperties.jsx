import { Helmet } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import useSoldData from "../hooks/useSoldData";

const AgentSoldProperties = () => {
  // hooks
  const { soldData } = useSoldData();

  console.log(soldData);
  return (
    <div>
      <Helmet>
        <title>P P P | Dashboard | Add Property</title>
      </Helmet>
      <Toaster></Toaster>
      <div className="my-10 lg:my-20">
        <SectionTitle heading={"My sold properties"}></SectionTitle>
      </div>
      {soldData.length === 0 && (
        <div className="mt-40 text-center">
          <p className="text-2xl">You do not have any sold property</p> <br />
        </div>
      )}
      {soldData && soldData.length !== 0 && (
        <div className="px-2 sm:px-10">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-s-color">
                <tr className="text-white text-sm lg:text-lg rounded-t-full">
                  <th className="py-4 lg:py-6 xl:py-8 rounded-tl-2xl">#</th>
                  <th className="text-center">Property Title</th>
                  <th className="text-center">Property Location</th>
                  <th className="text-center">Buyer Email</th>
                  <th className="text-center">Buyer Name</th>
                  <th className="text-center rounded-tr-2xl">Sold Price</th>
                </tr>
              </thead>
              <tbody>
                {soldData &&
                  soldData?.map((data, idx) => (
                    <tr className="hover" key={data?._id}>
                      <th>{idx + 1}</th>
                      <td className="text-sm lg:text-base text-center">
                        <div className="">
                          <div>
                            <div className="font-bold">
                              {data.propertyTitle}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-sm lg:text-base text-center">
                        <div className="">
                          <div>
                            <div className="font-bold">
                              {data.propertyLocation}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="text-sm lg:text-base text-center">
                        <div className="">
                          <div>
                            <div className="font-bold">{data.buyerEmail}</div>
                          </div>
                        </div>
                      </td>

                      <td className="text-sm lg:text-base text-center">
                        <div className="">
                          <div>
                            <div className="font-bold">{data.buyerName}</div>
                          </div>
                        </div>
                      </td>

                      <td className="text-sm lg:text-base text-center">
                        <div className="">
                          <div>
                            <div className="font-bold">
                              $ {data.offeredAmount}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentSoldProperties;
