"use client";
import { useState } from "react";

import { loginUser } from "@/app/utils/api";
import Cookies from "js-cookie";
import Successmodal from "../Modal/Successmodal";
import Errormodal from "../Modal/Errormodal";
import { ClipLoader } from "react-spinners";
import {useRouter } from "next/navigation";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("SignIn");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [flag, setFlag] = useState("");

const router = useRouter();

  // Submitting the form
  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      console.log(response);
      if (response.access) {
        setIsLoading(false);
        setFlag("success");
        router.push("/Inventory");
        console.log("Login successful:", response);
        Cookies.set("token", response.access);
      } else {
        setIsLoading(false);
        setFlag("failure");
      }
      // Handle successful login (e.g., navigate to a dashboard)
    } catch (error) {
      setIsLoading(false);
      setFlag("failure");
      console.error("Login failed:", error);
      // Handle login failure (e.g., show an error message)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  setTimeout(() => {
    setFlag("");
  }, 3000);

  // Sunmitting the email for reset password

  return (
    <>
      {flag === "success" && (
        <Successmodal label="Login successful"  />
      )}
      {flag === "failure" && (
        <Errormodal label="Invalid username or password" />
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="mx-auto text-center sm:w-full sm:max-w-sm">
          <h2 className="mt-20 text-center text-2xl sm:text-3xl font-bold leading-9 text-gray-900 font-inter tracking-wide sm:mt-12 md:mt-8">
            {status === "SignIn" ? "Welcome to ERP" : "Forgot password"}
          </h2>
          <span className="text-sm  text-gray-900  ">
            Lorem Ipsum Dipsum WitchSome coz you got nothing
          </span>
        </div>
        {status === "SignIn" && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-0">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    placeholder="johndoe@email.com"
                    onChange={handleChange}
                    required
                    value={email}
                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-0 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="enter your password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    value={password}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <img src="/assets/Images/eyesOpen.png" className="w-4" />
                    ) : (
                      <img src="/assets/Images/closeEye.png" className="w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md text-white bg-[#FF7645] px-3 py-2 text-sm font-semibold leading-6 shadow-sm  hover:border-[#FF7645]  hover:border-2 hover:py-1.5 hover:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7645] focus-visible:ring-opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-x-3">
                      <ClipLoader color="#fff" loading={isLoading} size={20} />
                      <p>Loading</p>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
                <div className="mt-4">
                  <p className="text-sm">
                    Don't have a account?{" "}
                    <span
                      className="text-[FF7645] cursor-pointer hover:underline" >
                      Sign Up
                    </span>
                  </p>
                </div>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              By clicking "Sign In“ you agree to our{" "}
              <a href="#terms" style={{ borderBottom: "1px solid #000" }}>
                terms of use
              </a>{" "}
              and{" "}
              <a href="#terms" style={{ borderBottom: "1px solid #000" }}>
                privacy policy
              </a>
            </p>
          </div>
        )}

      </div>
    </>
  );
}
