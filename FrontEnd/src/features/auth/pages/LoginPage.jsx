import React from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router'
import { useDispatch } from "react-redux";
import { loginUser } from "../state/action/authThunk";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
     mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log(data);
    await dispatch(loginUser(data));
    alert("Login Successful");
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
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

          <p className="text-slate-400 mt-2">Login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm text-slate-300 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="
              w-full
              h-12
              px-6
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
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="
              w-full
              h-12
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
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>

            <button
              type="button"
              className="
              text-sm
              text-blue-500
              hover:text-blue-400
            "
            >
              Forgot Password?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
            w-full
            h-12
            rounded-lg
            bg-blue-600
            hover:bg-blue-500
            transition-all
            text-white
            font-semibold
            disabled:opacity-70
          "
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <span className="text-blue-500 hover:text-blue-400 cursor-pointer" onClick={() => navigate("/auth/register")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
