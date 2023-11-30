import { FaUserShield, FaUserTie } from "react-icons/fa6";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import useUsers from "../hooks/useUsers";
import { FaUserAltSlash } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

const ManageUsers = () => {
  // hooks
  const { allUsersInfo } = useUsers();

  return (
    <div>
      <div className="my-10 lg:my-20">
        <SectionTitle heading={"manage users"}></SectionTitle>
      </div>
      <div className="px-2 sm:px-10">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-s-color">
              <tr className="text-white text-sm lg:text-lg rounded-t-full">
                <th className="py-4 lg:py-6 xl:py-8 rounded-tl-2xl">#</th>
                <th>User Name</th>
                <th>User Email</th>
                <th className="text-center">Make Admin</th>
                <th className="text-center">Make Agent</th>
                <th className="text-center">Mark as fraud</th>
                <th className="text-center rounded-tr-2xl">Delete user</th>
              </tr>
            </thead>
            <tbody>
              {allUsersInfo &&
                allUsersInfo?.map((user, idx) => (
                  <tr className="hover" key={user?._id}>
                    <th>{idx + 1}</th>
                    <td className="text-sm lg:text-base">
                      <div className="">
                        <div>
                          <div className="font-bold">{user?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm lg:text-base">
                      <div className="">
                        <div>
                          <div className="font-bold">{user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      {user.role === "admin" ? (
                        <div className="">
                          <div>
                            <div className="font-bold">Admin</div>
                          </div>
                        </div>
                      ) : (
                        <button className="btn rounded-full  bg-p-color border-p-color text-white hover:border-p-color hover:text-p-color hover:bg-white duration-[350ms] ease-in-out  btn-outline uppercase group max-sm:btn-sm sm:py-3 w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16  ">
                          <span className="text-[20px]  max-sm:text-sm">
                            <FaUserShield></FaUserShield>
                          </span>{" "}
                        </button>
                      )}
                    </td>
                    <td className="text-center">
                      {user.role === "agent" ? (
                        <div className="">
                          <div>
                            <div className="font-bold">Agent</div>
                          </div>
                        </div>
                      ) : (
                        <button className="btn rounded-full  border-t-color text-t-color hover:bg-t-color hover:border-t-color duration-[350ms] ease-in-out  btn-outline uppercase group max-sm:btn-sm sm:py-3 w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16">
                          <span className="text-[20px]  max-sm:text-sm">
                            <FaUserTie></FaUserTie>
                          </span>{" "}
                        </button>
                      )}
                    </td>
                    <td className="text-center">
                      {user.role === "fraud" ? (
                        <div className="">
                          <div>
                            <div className="font-bold">Fraud</div>
                          </div>
                        </div>
                      ) : (
                        <button className="btn rounded-full  bg-f-color border-f-color text-white hover:border-f-color hover:text-f-color hover:bg-white duration-[350ms] ease-in-out  btn-outline uppercase group max-sm:btn-sm sm:py-3 w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16  ">
                          <span className="text-[20px]  max-sm:text-sm">
                            <FaUserAltSlash></FaUserAltSlash>
                          </span>{" "}
                        </button>
                      )}
                    </td>
                    <td className="text-center">
                      <button className="btn rounded-full  border-red-600 text-red-600 hover:bg-red-600 hover:border-red-600 duration-[350ms] ease-in-out  btn-outline uppercase group max-sm:btn-sm sm:py-3 w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 ">
                        <span className="text-[20px]  max-sm:text-sm">
                          <RiDeleteBin6Fill></RiDeleteBin6Fill>
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

export default ManageUsers;
