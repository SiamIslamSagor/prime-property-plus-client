import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import useContextData from "../hooks/useContextData";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  // state
  const { mobileNavCall, setMobileNavCall } = useContextData();

  //   hooks
  const navigate = useNavigate();

  const dashboardLink = (
    <>
      <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4">
        <NavLink to="/dashboard" end>
          My Profile
        </NavLink>
      </div>

      <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4">
        <NavLink to="/dashboard/wish-list">WishList</NavLink>
      </div>

      <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4">
        <NavLink to="/dashboard/property-bought">Property bought</NavLink>
      </div>

      <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4">
        <NavLink to="/dashboard/my-reviews">My Reviews</NavLink>
      </div>
    </>
  );

  return (
    <div className="max-w-[1920px] mx-auto">
      <Helmet>
        <title>P P P | Dashboard</title>
      </Helmet>
      <div className="">
        <div className="lg:grid lg:grid-cols-12 lg:min-h-screen relative">
          <div className="max-lg:hidden col-span-3 xl:col-span-2 bg-t-color text-white font-medium">
            <div className="max-w-xs px-1 ">
              <div className="">
                <img
                  onClick={() => navigate("/")}
                  className="cursor-pointer max-xl:w-52 p-5"
                  src={logo}
                  alt="logo"
                />
              </div>
              <div className="space-y-4 py-10 text-center">{dashboardLink}</div>
            </div>
          </div>
          {/*  */}
          <div className="flex items-center lg:hidden ">
            <div className="">
              <button
                onClick={() => setMobileNavCall(!mobileNavCall)}
                tabIndex={0}
                className="btn btn-ghost xl:hidden"
              >
                {mobileNavCall ? (
                  <AiOutlineClose className={`text-3xl`}></AiOutlineClose>
                ) : (
                  <AiOutlineMenu className={`text-3xl`}></AiOutlineMenu>
                )}
              </button>
            </div>
            <div>
              <img
                onClick={() => navigate("/")}
                className="ml-4 cursor-pointer max-sm:h-12 max-md:h-14 h-16"
                src={logo}
                alt="logo"
              />
            </div>
          </div>

          {/*  */}
          <div className="max-lg:flex relative lg:col-span-9 xl:col-span-10 z-50">
            {mobileNavCall && (
              <div className="lg:hidden bg-green-200 absolute  duration-700 h-full">
                <div
                  className={`bg-f-color h-full min-h-screen max-w-sm -ml-96 duration-500 z-50 ${
                    mobileNavCall ? "ml-0" : "-ml-96"
                  }`}
                >
                  <div className="duration-700 space-y-5 py-10 text-white">
                    {dashboardLink}
                  </div>
                </div>
              </div>
            )}
            <div className="max-lg:col-span-12  min-h-screen  -z-20 max-lg:w-full">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
