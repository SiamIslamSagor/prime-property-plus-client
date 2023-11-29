import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import useContextData from "../hooks/useContextData";
import { Helmet } from "react-helmet-async";
import useAdmin from "../hooks/useAdmin";
import {
  MdAddToPhotos,
  MdLibraryAddCheck,
  MdOutlineAlarmAdd,
  MdOutlineManageSearch,
  MdRateReview,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaUsers, FaListUl, FaBookmark } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { VscDiffAdded } from "react-icons/vsc";
import useAgent from "../hooks/useAgent";
import ScrollTopBtn from "../components/utilitiesComponents/ScrollTopBtn";

const Dashboard = () => {
  // state
  const { mobileNavCall, setMobileNavCall } = useContextData();

  //   hooks
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();

  const dashboardLink = (
    <>
      <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4 lg:flex lg:items-center gap-2">
        <CgProfile className="max-lg:hidden"></CgProfile>
        <NavLink to="/dashboard" end>
          My Profile
        </NavLink>{" "}
      </div>

      {/* admin route */}

      {isAdmin && (
        <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4 lg:flex lg:items-center gap-2">
          <MdOutlineManageSearch className="max-lg:hidden"></MdOutlineManageSearch>
          <NavLink to="/dashboard/manage-properties">Manage Properties</NavLink>
        </div>
      )}

      {isAdmin && (
        <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4 lg:flex lg:items-center gap-2">
          <FaUsers className="max-lg:hidden"></FaUsers>
          <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
        </div>
      )}

      {isAdmin && (
        <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4 lg:flex lg:items-center gap-2">
          <MdOutlineReviews className="max-lg:hidden"></MdOutlineReviews>
          <NavLink to="/dashboard/manage-reviews">Manage Reviews</NavLink>
        </div>
      )}

      {/* Agent route */}
      {isAgent && (
        <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4 lg:flex lg:items-center gap-2">
          <VscDiffAdded className="max-lg:hidden"></VscDiffAdded>
          <NavLink to="/dashboard/add-property"> Add Property</NavLink>
        </div>
      )}
      {isAgent && (
        <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4 lg:flex lg:items-center gap-2">
          <MdAddToPhotos className="max-lg:hidden"></MdAddToPhotos>
          <NavLink to="/dashboard/my-added-properties">
            {" "}
            My added properties
          </NavLink>
        </div>
      )}
      {isAgent && (
        <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4 lg:flex lg:items-center gap-2">
          <MdLibraryAddCheck className="max-lg:hidden"></MdLibraryAddCheck>
          <NavLink to="/dashboard/my-sold-properties">
            {" "}
            My sold properties
          </NavLink>
        </div>
      )}
      {isAgent && (
        <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4 lg:flex lg:items-center gap-2">
          <MdOutlineAlarmAdd className="max-lg:hidden"></MdOutlineAlarmAdd>
          <NavLink to="/dashboard/requested-properties">
            Requested properties{" "}
          </NavLink>
        </div>
      )}

      {/* user route */}

      {isAdmin || isAgent || (
        <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4 lg:flex lg:items-center gap-2">
          <FaListUl className="max-lg:hidden"></FaListUl>
          <NavLink to="/dashboard/wish-list">WishList</NavLink>
        </div>
      )}

      {isAdmin || isAgent || (
        <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4 lg:flex lg:items-center gap-2">
          <FaBookmark className="max-lg:hidden"></FaBookmark>
          <NavLink to="/dashboard/property-bought">Property bought</NavLink>
        </div>
      )}

      {isAdmin || isAgent || (
        <div className="uppercase nav-div max-md:w-full md:text-lg font-semibold max-w-xs px-4 lg:flex lg:items-center gap-2">
          <MdRateReview className="max-lg:hidden"></MdRateReview>
          <NavLink to="/dashboard/my-reviews">My Reviews</NavLink>
        </div>
      )}
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
            <ScrollTopBtn></ScrollTopBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
