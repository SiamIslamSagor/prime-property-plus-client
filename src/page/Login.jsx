import { useState } from "react";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { IoMdEyeOff } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import PrimaryBtn from "../components/utilitiesComponents/PrimaryBtn";
import useContextData from "../hooks/useContextData";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { Fade } from "react-awesome-reveal";

const Login = () => {
  // state
  const [btnLoading, setBtnLoading] = useState(false);
  const [isPasswordType, setIsPasswordType] = useState(true);

  // hooks
  const navigate = useNavigate();
  // context data
  const { logIn, googleLogin } = useContextData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // handler

  const onSubmit = data => {
    setBtnLoading(true);
    const toastId = toast.loading("processing...");

    const { email, password } = data;
    console.log(data);
    console.log(email, password);
    logIn(email, password)
      .then(res => {
        console.log(res);
        reset();
        toast.success("Log In successfully.", { id: toastId });

        navigate("/");
        setBtnLoading(false);
      })
      .catch(() => {
        toast.error("Failed to login.", { id: toastId });
        setBtnLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    const toastId = toast.loading("processing...");

    googleLogin()
      .then(() => {
        toast.success("Log In successfully.", { id: toastId });
        navigate("/");
      })
      .catch(() => {
        toast.error("Failed to login.", { id: toastId });
      });
  };

  return (
    <div className="mt-20 ">
      <Helmet>
        <title>P P P | Log In</title>
      </Helmet>

      <Toaster></Toaster>
      <div className="container mx-auto">
        <div>
          <SectionTitle heading={"log in"}></SectionTitle>
        </div>
        <div className="max-w-lg mx-auto p-10">
          <div className="overflow-hidden">
            <Fade direction="left">
              <div>
                <form
                  className="flex flex-col items-center justify-center"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/*  */}
                  {/*  */}

                  <div className="w-full max-w-sm">
                    <label className="label">
                      <span className="label-text">Your Email</span>
                    </label>

                    <input
                      type="email"
                      className="input input-bordered input-info w-full max-w-sm"
                      {...register("email", {
                        required: "Email Address is required *",
                      })}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full max-w-sm">
                    <label className="label">
                      <span className="label-text">Your Password</span>
                    </label>

                    <div className="relative">
                      <input
                        type={isPasswordType ? "password" : "text"}
                        className="input input-bordered input-info w-full max-w-sm pr-10"
                        {...register("password", {
                          required: "Password is required *",
                        })}
                        aria-invalid={errors.password ? "true" : "false"}
                      />
                      {isPasswordType ? (
                        <IoMdEyeOff
                          onClick={() => setIsPasswordType(!isPasswordType)}
                          className="cursor-pointer text-2xl absolute top-[12px] right-2"
                        ></IoMdEyeOff>
                      ) : (
                        <IoEyeSharp
                          onClick={() => setIsPasswordType(!isPasswordType)}
                          className="cursor-pointer text-2xl absolute top-[12px] right-2"
                        ></IoEyeSharp>
                      )}
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.password?.message}
                      </p>
                    )}
                  </div>

                  <div className="my-8">
                    <PrimaryBtn
                      btnType="submit"
                      btnText="log in"
                      isLoadingBtn={btnLoading}
                    ></PrimaryBtn>
                  </div>
                </form>
                <div className="divider max-w-sm mx-auto">or</div>
                <div className="max-w-sm mx-auto text-center">
                  <button
                    onClick={handleGoogleLogin}
                    className="btn rounded-full w-full bg-t-color border-t-color text-white hover:border-t-color hover:text-t-color hover:bg-white duration-[350ms] ease-in-out sm:px-8 max-md:px-4 btn-outline uppercase md:text-base"
                  >
                    continue with google <FaGoogle></FaGoogle>
                  </button>
                </div>
                <p className="text-center mt-4">
                  New Here?{" "}
                  <span className="text-blue-700 font-medium">
                    <Link to="/auth/signUp">Sign Up</Link>
                  </span>
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
