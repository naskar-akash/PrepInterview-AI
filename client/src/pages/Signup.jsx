import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { signupUser } from "../services/AuthServices";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data) => {
    try {
      const response = await signupUser(data);
      alert(response?.data.message);
      if (response?.status === 201){
        navigate("/login");
      }
      reset();
    } catch (error) {
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y:-40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        className="w-full max-w-md rounded-3xl bg-white/80 p-8 shadow-2xl shadow-slate-400 border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-900 text-shadow-md text-shadow-mauve-400">Create Your Account</h2>
          <p className="text-2xs text-green-700 mt-3 bg-green-200 rounded-full mx-8">Start your preparation with us</p>
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
            <span className="text-sm text-red-600 font-medium">{errors.username.message}</span>
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
            <span className="text-sm text-red-600 font-medium">{errors.email.message}</span>
          )}

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
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
            <span className="text-sm text-red-600 font-medium">{errors.password.message}</span>
          )}

          <div className="grid grid-cols-2 gap-4">
              <input
                id="age"
                name="age"
                type="number"
                placeholder="Age"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 shadow-sm transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                {...register("age")}
              />
              <select
                id="gender"
                name="gender"
                defaultValue="Gender"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 shadow-sm transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                {...register("gender")}
              >
                <option value="Gender" disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.90 }}
            transition={{duration: 0.1}}
            type="submit"
            className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-white font-semibold shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            Create account
          </motion.button>
        </form>
        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <button className="font-semibold text-indigo-600 hover:text-indigo-800">Login</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
