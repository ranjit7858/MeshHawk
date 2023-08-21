import React from "react";
import { useMutation } from "@tanstack/react-query";
import { getLoginToken } from "../api";
import Loading from "./Loading";
import { Link } from "react-router-dom";

function Login() {
  const loginMutation = useMutation(getLoginToken);

  const setTokenToStorage = (token) => {
    localStorage.removeItem("token");
    localStorage.setItem("token", token); 
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    loginMutation.mutate(formData, {
      onSuccess: (data) => {
        setTokenToStorage(data.access_token);
        window.location.href = "/";
      },
    });
  };

  return (
    <div className="w-full text-white h-full flex justify-center items-center">
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold flex items-center logo">
            <img src="/kavach.png" className="w-[15%]" />
            MeshHawk
          </Link>
        </div>
        <form
          className="bg-primary border-2 rounded-xl shadow-md px-8 pt-6 pb-8 mb-4 h-[20rem] w-[25rem] flex flex-col justify-center items-center"
          onSubmit={loginSubmit}
        >
          {loginMutation.isLoading ? (
            <Loading />
          ) : (
            <div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  name="username" // Added the 'name' attribute to the input
                  defaultValue="sanskardwivedi003@gmail.com" // Use defaultValue instead of value
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  name="password"
                  defaultValue="sanskar@123"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
