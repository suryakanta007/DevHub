import React from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router'
import { useDispatch } from "react-redux";
import { registerUser } from "../state/action/authThunk";
const RegisterPage = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    mode : "onChange"
  });


  const onSubmit = async (data) => {
    console.log(data);

  
    await dispatch(registerUser(data));

    alert("Registration Successful");
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Card */}
      <div
        className="
        w-full
        max-w-md
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-6
        sm:p-8
        shadow-2xl
      "
      >
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-slate-400 mt-2">
            Register your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="mb-5">
            <label className="block text-sm text-slate-300 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              className="
              w-full
              py-3
              px-4
              rounded-lg
              bg-slate-950
              border
              border-slate-700
              text-white
              placeholder:text-slate-500
              outline-none
              focus:border-blue-500
              transition-all
            "
              {...register("username", {
                required: "Username is required",
              })}
            />

            {errors.username && (
              <p className="text-red-500 text-sm mt-2">
                {errors.username.message}
              </p>
            )}
          </div>
          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-sm text-slate-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter username"
              className="
              w-full
              py-3
              px-4
              rounded-lg
              bg-slate-950
              border
              border-slate-700
              text-white
              placeholder:text-slate-500
              outline-none
              focus:border-blue-500
              transition-all
            "
              {...register("fullName", {
                required: "Fullname is required",
              })}
            />

            {errors.fullName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="
              w-full
              py-3
              px-4
              rounded-lg
              bg-slate-950
              border
              border-slate-700
              text-white
              placeholder:text-slate-500
              outline-none
              focus:border-blue-500
              transition-all
            "
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="
              w-full
              py-3
              px-4
              rounded-lg
              bg-slate-950
              border
              border-slate-700
              text-white
              placeholder:text-slate-500
              outline-none
              focus:border-blue-500
              transition-all
            "
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label className="block text-sm text-slate-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="
              w-full
              py-3
              px-4
              rounded-lg
              bg-slate-950
              border
              border-slate-700
              text-white
              placeholder:text-slate-500
              outline-none
              focus:border-blue-500
              transition-all
            "
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") ||
                  "Passwords do not match",
              })}
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Checkbox */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                className="accent-blue-500"
                {...register("terms", {
                  required: "Accept terms first",
                })}
              />

              I agree to Terms & Conditions
            </label>

            {errors.terms && (
              <p className="text-red-500 text-sm mt-2">
                {errors.terms.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
            w-full
            py-3
            rounded-lg
            bg-blue-600
            hover:bg-blue-500
            transition-all
            text-white
            font-semibold
            disabled:opacity-70
          "
          >
            {isSubmitting
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/auth/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;