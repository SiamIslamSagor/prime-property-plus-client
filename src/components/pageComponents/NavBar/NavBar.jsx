import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

import "./NavBar.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import PrimaryBtn from "../../utilitiesComponents/PrimaryBtn";
import SecondaryBtn from "../../utilitiesComponents/SecondaryBtn";

const NavBar = () => {
  // state
  const [mobileNavCall, setMobileNavCall] = useState(false);
  const [navClass, setNavClass] = useState("");
  const user = null;
  const [deviceInnerWidth, setDeviceInnerWidth] = useState(window.innerWidth);
  const sideBtnRef = useRef(null);

  // context data

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  // handler

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
      setNavClass("top-0 left-0 w-full bg-black");
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

      <div
        onClick={handleMobileStateChange}
        className="uppercase nav-div max-md:w-full md:text-lg font-semibold"
      >
        <NavLink to="/dashboard">Dashboard</NavLink>
      </div>

      {user === null && (
        <PrimaryBtn
          onClick={handleMobileStateChange}
          handler={() => {
            console.log("LogIn");
            navigate("auth/login");
            return (
              <Navigate state={location.pathname} to="auth/login"></Navigate>
            );
          }}
          btnText="Log In"
          className="uppercase nav-div max-md:w-full md:text-lg font-semibold"
        ></PrimaryBtn>
      )}
      {user === null && (
        <SecondaryBtn
          onClick={handleMobileStateChange}
          handler={() => {
            console.log("signUp");
            navigate("auth/signUp");
          }}
          btnText="Sign Up"
          className="uppercase nav-div max-md:w-full md:text-lg font-semibold"
        ></SecondaryBtn>
      )}
    </>
  );

  return (
    <div className=" sticky mb-3 top-0 z-[9999] duration-700">
      <Toaster></Toaster>
      <div className={`shadow-lg z-[999] bg-white duration-700 ${navClass}`}>
        <div className="py-3 max-sm:py-3 container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="">
              <button
                onClick={() => setMobileNavCall(!mobileNavCall)}
                tabIndex={0}
                className="btn btn-ghost xl:hidden"
              >
                {mobileNavCall ? (
                  <AiOutlineClose
                    className={`text-3xl bt ${
                      location.pathname === "/" && window.scrollY >= 420
                        ? "text-black"
                        : location.pathname === "/"
                        ? "text-black"
                        : "text-black"
                    }`}
                  ></AiOutlineClose>
                ) : (
                  <AiOutlineMenu
                    className={`text-3xl bt ${
                      location.pathname === "/" && window.scrollY >= 420
                        ? "text-black"
                        : location.pathname === "/"
                        ? "text-black"
                        : "text-black"
                    }`}
                  ></AiOutlineMenu>
                )}
              </button>
            </div>
            <img
              className=" max-sm:h-12 max-md:h-14 h-16"
              src={logo}
              alt="logo"
            />
          </div>
          <div className="">
            <div
              className={`hidden xl:text-s-color xl:flex items-center gap-4 2xl:gap-10 ${
                location.pathname === "/" && window.scrollY >= 420
                  ? "text-black"
                  : location.pathname === "/"
                  ? "text-black"
                  : "text-[#f86f03]"
              }`}
            >
              {links}
              {user && (
                <div
                  onClick={handleMobileStateChange}
                  className="uppercase nav-div max-md:w-full md:text-lg font-semibold"
                >
                  <button
                    onClick={handleMobileStateChange}
                    className={`btn border-[#f86f03] hover:bg-orange-500 outline-none  hover:border-[#f86f03] hover:text-black bg-transparent  ${
                      location.pathname === "/" && window.scrollY <= 420
                        ? "text-black"
                        : location.pathname === "/" &&
                          window.scrollY >= 420 &&
                          "text-black"
                    } hover:border`}
                  >
                    log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
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
