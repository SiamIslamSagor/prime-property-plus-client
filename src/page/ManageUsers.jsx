import { FaUser } from "react-icons/fa6";
import PrimaryBtn from "../components/utilitiesComponents/PrimaryBtn";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import useUsers from "../hooks/useUsers";

const ManageUsers = () => {
  // hooks
  const { allUsersInfo } = useUsers();
  console.log(allUsersInfo);

  return (
    <div>
      <div className="my-10 lg:my-20">
        <SectionTitle heading={"manage users"}></SectionTitle>
      </div>
      {/*  */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>User email</th>
                <th>Make Admin</th>
                <th>Make Agent</th>
                <th>Mark as fraud</th>
                <th>Delete user</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allUsersInfo &&
                allUsersInfo?.map((user, idx) => (
                  <tr className="hover" key={user?._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{user?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button className="btn rounded-none bg-f-color border-f-color text-white hover:border-f-color hover:text-f-color hover:bg-white duration-[350ms] ease-in-out sm:px-4 max-md:px-4 btn-outline uppercase group max-sm:-py-16 max-sm:btn-sm  ">
                        <span className="text-[16px] max-sm:text-sm">
                          <FaUser></FaUser>
                        </span>{" "}
                      </button>
                    </td>
                    <td>
                      <button className="btn rounded-none bg-f-color border-f-color text-white hover:border-f-color hover:text-f-color hover:bg-white duration-[350ms] ease-in-out sm:px-4 max-md:px-4 btn-outline uppercase group max-sm:-py-16 max-sm:btn-sm  ">
                        <span className="text-[16px] max-sm:text-sm">
                          <FaUser></FaUser>
                        </span>{" "}
                      </button>
                    </td>
                    <td>
                      <button className="btn rounded-none bg-f-color border-f-color text-white hover:border-f-color hover:text-f-color hover:bg-white duration-[350ms] ease-in-out sm:px-4 max-md:px-4 btn-outline uppercase group max-sm:-py-16 max-sm:btn-sm  ">
                        <span className="text-[16px] max-sm:text-sm">
                          <FaUser></FaUser>
                        </span>{" "}
                      </button>
                    </td>
                    <td>
                      <button className="btn rounded-none bg-f-color border-f-color text-white hover:border-f-color hover:text-f-color hover:bg-white duration-[350ms] ease-in-out sm:px-4 max-md:px-4 btn-outline uppercase group max-sm:-py-16 max-sm:btn-sm  ">
                        <span className="text-[16px] max-sm:text-sm">
                          <FaUser></FaUser>
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
