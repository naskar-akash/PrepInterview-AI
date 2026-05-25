import React from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div classname="flex justify-center items-center">
      <div className="bg-red-500 min-h-screen max-w-4xl">
        <div className="flex flex-col">
          <h2 className="">Create Your Account</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className=""
            {...register("username", {
              required: { value: true, message: "This field is required" },
            })}
          />
          {errors.username && (
            <span className="text-[2px] text-red-600 font-semibold">
              {errors.username.message}
            </span>
          )}
          <input
            type="text"
            className=""
            {...register("email", {
              required: { value: true, message: "This field is required" },
            })}
          />
          {errors.email && (
            <span className="text-[2px] text-red-600 font-semibold">
              {errors.email.message}
            </span>
          )}
          <input
            type="password"
            {...register(
              "password",
              { required: { value: true, message: "This field is required" } },
              {
                minLength: {
                  value: 8,
                  message: "Password should contain min 8 characters",
                },
              },
            )}
          />
          {errors.password && (
            <span className="text-[2px] text-red-600 font-semibold">
              {errors.password.message}
            </span>
          )}
          <input type="number" {...register("age")} />
          <select {...register("gender")}>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>

          <input type="submit" />
        </form>
        <div>
          <p>Already have account?  <button>Login</button> to your account</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
