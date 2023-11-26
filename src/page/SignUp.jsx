import { useForm } from "react-hook-form";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import PrimaryBtn from "../components/utilitiesComponents/PrimaryBtn";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import useContextData from "../hooks/useContextData";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  // state
  const [btnLoading, setBtnLoading] = useState(false);
  const [isPasswordType, setIsPasswordType] = useState(true);

  // hooks
  const navigate = useNavigate();

  // context data
  const {
    createUser,
    profileUpdate,
    googleLogin,
    updateUserData,
    setProfileUpdate,
  } = useContextData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = data => {
    setBtnLoading(true);
    const toastId = toast.loading("processing...");

    const { name, email, photoUrl, password } = data;
    console.log(Object.keys(data).join(","));
    ///////////////////

    //
    createUser(email, password)
      .then(res => {
        console.log(res.user);
        updateUserData(name, photoUrl)
          .then(() => {
            console.log("profile updated");
            setProfileUpdate(!profileUpdate);
            navigate("/");
            reset();
          })
          .catch(err => {
            console.log(err);
          });
        toast.success("Account created successfully.", {
          id: toastId,
        });
        setBtnLoading(false);
      })
      .catch(() => {
        toast.error("Failed to create account.", { id: toastId });
      });

    ///////////////////
  };

  return (
    <div className="mt-20 ">
      <Helmet>
        <title>P P P | SignUp</title>
      </Helmet>

      <Toaster></Toaster>

      <div className="container mx-auto">
        <div>
          <SectionTitle heading={"Sign Up"}></SectionTitle>
        </div>
        <div>
          <div className=" p-10">
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/*  */}
              {/*  */}

              <div className="w-full max-w-sm">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-info w-full max-w-sm"
                  {...register("name", { required: "Name is required *" })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>
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
                  <span className="label-text">Your Photo URL</span>
                </label>

                <input
                  type="url"
                  className="input input-bordered input-info w-full max-w-sm"
                  {...register("photoUrl", {
                    required: "Photo URL is required *",
                  })}
                  aria-invalid={errors.photoUrl ? "true" : "false"}
                />
                {errors.photoUrl && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.photoUrl?.message}
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
                  btnText="sign up"
                  isLoadingBtn={btnLoading}
                ></PrimaryBtn>
              </div>
            </form>
            <div className="divider max-w-sm mx-auto">or</div>
            <div className="max-w-sm mx-auto text-center">
              <button className="btn rounded-full w-full bg-t-color border-t-color text-white hover:border-t-color hover:text-t-color hover:bg-white duration-[350ms] ease-in-out sm:px-8 max-md:px-4 btn-outline uppercase md:text-base">
                Sign up with google <FaGoogle></FaGoogle>
              </button>
            </div>
            <p className="text-center mt-4">
              Already Have an account?{" "}
              <span className="text-blue-700 font-medium">
                <Link to="/auth/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
