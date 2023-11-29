import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

import "./NavBar.css";
import { useCallback, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import PrimaryBtn from "../../utilitiesComponents/PrimaryBtn";
import SecondaryBtn from "../../utilitiesComponents/SecondaryBtn";
import useContextData from "../../../hooks/useContextData";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const NavBar = () => {
  // state
  const [mobileNavCall, setMobileNavCall] = useState(false);
  const [navClass, setNavClass] = useState("");
  const [deviceInnerWidth, setDeviceInnerWidth] = useState(window.innerWidth);
  const sideBtnRef = useRef(null);

  // context data
  const { user, logOut } = useContextData();

  const location = useLocation();
  const navigate = useNavigate();

  // handler

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be log out this account form this device!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out.",
    }).then(result => {
      if (result.isConfirmed) {
        // hit delete api in server side by specific id;
        // ////////////////
        const toastId = toast.loading("processing...");
        console.log("clicked");
        logOut()
          .then(() => {
            toast.success("Log out successfully.", { id: toastId });
          })
          .catch(() => {
            toast.success("Log out Failed.", { id: toastId });
          });
        ///////////////////

        /* Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        }); */
      }
    });
  };

  const handleResize = useCallback(() => {
    setDeviceInnerWidth(window.innerWidth);
    setMobileNavCall(false);
    if (deviceInnerWidth >= 1280) {
      setMobileNavCall(false);
    }
  }, [deviceInnerWidth]);

  const handleMobileStateChange = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 1280) {
      setMobileNavCall(!mobileNavCall);
    }
  };

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 420) {
      setNavClass("top-0 left-0 w-full");
    } else {
      setNavClass("");
    }
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        sideBtnRef.current &&
        !sideBtnRef.current.contains(event.target) &&
        event.clientX > 375
      ) {
        setMobileNavCall(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const links = (
    <>
      <div
        onClick={handleMobileStateChange}
        className="uppercase nav-div max-md:w-full md:text-lg font-semibold"
      >
        <NavLink to="/">HOME</NavLink>
      </div>

      <div
        onClick={handleMobileStateChange}
        className="uppercase nav-div max-md:w-full md:text-lg font-semibold"
      >
        <NavLink to="/all-properties">ALL properties</NavLink>
      </div>

      <div
        onClick={handleMobileStateChange}
        className="uppercase nav-div max-md:w-full md:text-lg font-semibold"
      >
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>

      {user && (
        <SecondaryBtn handler={handleLogOut} btnText="log out"></SecondaryBtn>
      )}

      {user === null && (
        <Link state={{ from: location }} to="/auth/login">
          <PrimaryBtn
            onClick={handleMobileStateChange}
            handler={() => {
              console.log("LogIn");
            }}
            btnText="Log In"
            className="uppercase nav-div max-md:w-full md:text-lg font-semibold"
          ></PrimaryBtn>{" "}
        </Link>
      )}
      {user === null && (
        <Link state={{ from: location }} to="/auth/signUp">
          <SecondaryBtn
            onClick={handleMobileStateChange}
            handler={() => {
              console.log("signUp");
            }}
            btnText="Sign Up"
            className="uppercase nav-div max-md:w-full md:text-lg font-semibold"
          ></SecondaryBtn>
        </Link>
      )}
    </>
  );

  return (
    <div className=" sticky top-0 z-[9999] duration-700">
      <Toaster></Toaster>
      <Fade direction="down" delay={1100} triggerOnce>
        <div className={`shadow-lg z-[999] bg-white duration-700 ${navClass}`}>
          <div className="py-3 max-sm:py-3 container mx-auto flex justify-between items-center">
            <div className="flex items-center justify-center max-xl:justify-between max-xl:w-full">
              <div className="flex items-center ">
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
                <img
                  onClick={() => navigate("/")}
                  className="cursor-pointer max-sm:h-12 max-md:h-14 h-16"
                  src={logo}
                  alt="logo"
                />
              </div>
              {/* dropdown for max-xl */}
              {user && (
                <div className="dropdown xl:hidden dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoURL}
                      />
                    </div>
                  </div>
                  <ul className="mt-3 z-[1] p-6 shadow menu menu-sm dropdown-content bg-base-100 rounded-box max-lg:w-80 lg:w-96 text-center font-medium text-s-color">
                    <li>
                      <a className="justify-center mt-2 p-2">
                        Name: {user?.displayName}
                      </a>
                    </li>
                    <li>
                      <a className="justify-center mt-2 p-2">
                        Email: {user?.email}
                      </a>
                    </li>
                    <li>
                      <a className="justify-center mt-2 p-2">Edit Profile</a>
                    </li>
                    <button onClick={handleLogOut}>
                      <li>
                        <a className="justify-center mt-2 p-2">Logout</a>
                      </li>
                    </button>
                  </ul>
                </div>
              )}
            </div>
            <div className="">
              <div
                className={`hidden xl:text-s-color xl:flex items-center gap-4 2xl:gap-10 `}
              >
                {links}
                {user && (
                  <div
                    onClick={handleMobileStateChange}
                    className="uppercase nav-div max-md:w-full md:text-lg font-semibold"
                  >
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <img
                            alt="Tailwind CSS Navbar component"
                            src={user?.photoURL}
                          />
                        </div>
                      </div>
                      <ul className="mt-3 z-[1] p-6 shadow menu menu-sm dropdown-content bg-base-100 rounded-box max-lg:w-80 lg:w-96 text-center">
                        <li>
                          <a className="justify-center mt-2 p-2">
                            Name: {user?.displayName}
                          </a>
                        </li>
                        <li>
                          <a className="justify-center mt-2 p-2">
                            Email: {user?.email}
                          </a>
                        </li>
                        <li>
                          <a className="justify-center mt-2 p-2">
                            Edit Profile
                          </a>
                        </li>
                        <button>
                          <li onClick={handleLogOut}>
                            <a className="justify-center mt-2 p-2">Logout</a>
                          </li>
                        </button>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fade>

      <div className="flex">
        <div
          className={`fixed xl:hidden duration-500 min-h-screen overflow-x-hidden bg-f-color w-[375px] max-sm:top-[72px] -z-10 ${
            mobileNavCall ? "left-0" : "-left-[375px]"
          }`}
        >
          <div className="mt-[140px] text-center flex flex-col items-center gap-4 text-s-color">
            {links}
          </div>
        </div>
        {mobileNavCall && (
          <div
            ref={sideBtnRef}
            onClick={() => setMobileNavCall(!mobileNavCall)}
            className={`h-[40vh] bg-[#173d4523]     absolute left-[375px]  overflow-x-hidden duration-700`}
          ></div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
