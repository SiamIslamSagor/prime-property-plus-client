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
import { Fade } from "react-awesome-reveal";

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

  // handler

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
          .catch(() => {
            toast.error("Failed to create account.", { id: toastId });
            setBtnLoading(false);
          });
        toast.success("Account created successfully.", {
          id: toastId,
        });
        setBtnLoading(false);
      })
      .catch(() => {
        toast.error("Failed to create account.", { id: toastId });
        setBtnLoading(false);
      });

    ///////////////////
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
        <title>P P P | SignUp</title>
      </Helmet>

      <Toaster></Toaster>

      <div className="container mx-auto">
        <div>
          <SectionTitle heading={"Sign Up"}></SectionTitle>
        </div>
        <div>
          <div className="max-w-lg mx-auto p-10">
            <div className="overflow-hidden">
              <Fade direction="right">
                <div>
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
                        {...register("name", {
                          required: "Name is required *",
                        })}
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
                            required: true,
                            minLength: 6,
                            maxLength: 32,
                            pattern:
                              /(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[0-9])(?=.*[a-z])/,
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
                      {errors.password?.type === "required" && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.password && (
                            <p className="text-sm text-red-600 mt-1">
                              Password is required *
                            </p>
                          )}
                        </p>
                      )}
                      {errors.password?.type === "minLength" && (
                        <p className="text-sm text-red-600 mt-1">
                          Password must be 6 characters *
                        </p>
                      )}
                      {errors.password?.type === "maxLength" && (
                        <p className="text-sm text-red-600 mt-1">
                          Password must be 20 characters *
                        </p>
                      )}
                      {errors?.password?.type === "pattern" && (
                        <p className="text-sm text-red-600 mt-1">
                          password at least 6 char long & at most 32 char long.
                          spacial char, digit, uppercase, lowercase required *
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
                    <button
                      onClick={handleGoogleLogin}
                      className="btn rounded-full w-full bg-t-color border-t-color text-white hover:border-t-color hover:text-t-color hover:bg-white duration-[350ms] ease-in-out sm:px-8 max-md:px-4 btn-outline uppercase md:text-base"
                    >
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
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
