import { useForm } from "react-hook-form";
import SectionTitle from "../components/utilitiesComponents/SectionTitle/SectionTitle";
import PrimaryBtn from "../components/utilitiesComponents/PrimaryBtn";
import { useState } from "react";
import SecondaryBtn from "../components/utilitiesComponents/SecondaryBtn";

const SignUp = () => {
  // state
  const [btnLoading, setBtnLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    setBtnLoading(true);
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const photoUrl = data.photoUrl;
    console.log(data);
    setBtnLoading(false);
  };

  return (
    <div className="min-h-screen container mx-auto">
      <div>
        <SectionTitle heading={"Sign Up"}></SectionTitle>
      </div>
      <div>
        <div className="border-4 p-10">
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
                className="input input-bordered input-info w-full max-w-sm"
                {...register("name", { required: "Name is required *" })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name?.message}</p>
              )}
            </div>
            <div className="w-full max-w-sm">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>

              <input
                className="input input-bordered input-info w-full max-w-sm"
                {...register("mail", {
                  required: "Email Address is required *",
                })}
                aria-invalid={errors.mail ? "true" : "false"}
              />
              {errors.mail && (
                <p className="text-sm text-red-600">{errors.mail?.message}</p>
              )}
            </div>
            <div className="w-full max-w-sm">
              <label className="label">
                <span className="label-text">Your Photo URL</span>
              </label>

              <input
                className="input input-bordered input-info w-full max-w-sm"
                {...register("photoUrl", {
                  required: "Photo URL is required *",
                })}
                aria-invalid={errors.photoUrl ? "true" : "false"}
              />
              {errors.photoUrl && (
                <p className="text-sm text-red-600">
                  {errors.photoUrl?.message}
                </p>
              )}
            </div>
            <div className="w-full max-w-sm">
              <label className="label">
                <span className="label-text">Your Password</span>
              </label>

              <input
                className="input input-bordered input-info w-full max-w-sm"
                {...register("password", {
                  required: "Password is required *",
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="text-sm text-red-600">
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
            <button className="btn btn-accent uppercase font-medium rounded-full w-full px-4 text-white md:text-lg">
              sign up with google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
