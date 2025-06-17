import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginHandler, singupHandler } from "../services/loginHandler";
import { login } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
        navigate("/");
      } else {
        // handle error (optional)
        console.error("Login failed", res);
      }
    } else {
      console.log("akjl");
      singupHandler(data.username, data.name);
    }
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFocus = (name) => setFocused((f) => ({ ...f, [name]: true }));
  const handleBlur = (name) => setFocused((f) => ({ ...f, [name]: false }));

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Submitted:", formData);
  // };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
  );
}
