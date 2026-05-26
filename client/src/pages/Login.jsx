import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { loginUser } from "../services/AuthServices";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      alert(response?.data.message);
      if (response?.status === 200){
        navigate("/dashboard");
      }
    } catch (error) {
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        className="w-full max-w-md rounded-3xl bg-white/80 p-8 shadow-2xl shadow-slate-400 border border-slate-200"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-900 text-shadow-md text-shadow-mauve-400">
            Login Here
          </h2>
          <p className="text-2xs text-green-700 mt-3 bg-green-200 rounded-full mx-8">
            Welcome back! Please login to your account.
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 shadow-sm transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            {...register("username", {
              required: { value: true, message: "This field is required" },
            })}
          />
          {errors.username && (
            <span className="text-sm text-red-600 font-medium">
              {errors.username.message}
            </span>
          )}

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email address"
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 shadow-sm transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            {...register("email", {
              required: { value: true, message: "This field is required" },
            })}
          />
          {errors.email && (
            <span className="text-sm text-red-600 font-medium">
              {errors.email.message}
            </span>
          )}

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 shadow-sm transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            {...register("password", {
              required: { value: true, message: "This field is required" },
              minLength: {
                value: 8,
                message: "Password should contain at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-sm text-red-600 font-medium">
              {errors.password.message}
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
            type="submit"
            className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-white font-semibold shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
