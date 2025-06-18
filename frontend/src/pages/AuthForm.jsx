import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginHandler, singupHandler } from "../services/Handler";
import { login } from "../store";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
export default function AuthForm({ isLogin }) {
  const { register, handleSubmit } = useForm();
  console.log("hell");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function onSubmit(data) {
    if (isLogin) {
      const res = await loginHandler(data.username);
      if (res.status == "success") {
        dispatch(login({ username: data.username }));
        navigate("/u");
      } else {
        // handle error (optional)
        console.error("Login failed", res);
      }
    } else {
      console.log("akjl");
      singupHandler(data.username, data.name);
    }
  }

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleFocus = (name) => setFocused((f) => ({ ...f, [name]: true }));
  const handleBlur = (name) => setFocused((f) => ({ ...f, [name]: false }));

  return (
    <div className="flex items-center justify-center w-screen min-h-screen px-4 border-2 border-red-600 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <div className="absolute z-50 top-6 left-6">
        <div className="p-5 bg-white border border-gray-200 shadow-xl dark:bg-gray-900 rounded-2xl w-72 dark:border-gray-700">
          <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white">
            Test Credentials →
          </h3>
          <ul className="mb-4 space-y-1 font-mono text-sm text-gray-700 dark:text-gray-300">
            <li>• aayush_smart</li>
            <li>• tushar_boi</li>
            <li>• vivek_hi</li>
          </ul>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Go to{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-600 dark:text-blue-400"
            >
              Sign In
            </Link>{" "}
            page to login.
          </p>
        </div>
      </div>
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          {isLogin ? "Welcome Back 👋" : "Create an Account 🚀"}
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                UserName
              </label>
              <input
                type="text"
                name="name"
                className={`w-full px-4 py-2 border ${
                  focused.name ? "border-purple-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400`}
                {...register("username")}
                onFocus={() => handleFocus("name")}
                onBlur={() => handleBlur("name")}
              />
            </div>
          }
          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                className={`w-full px-4 py-2 border ${
                  focused.name ? "border-purple-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400`}
                {...register("name")}
                onFocus={() => handleFocus("name")}
                onBlur={() => handleBlur("name")}
              />
            </div>
          )}
          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white font-semibold transition-all ${
              isLogin
                ? "bg-indigo-500 hover:bg-indigo-600"
                : "bg-purple-500 hover:bg-purple-600"
            }`}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <Link
            to={isLogin ? "/signup" : "/signin"}
            className="text-indigo-600 underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
}
