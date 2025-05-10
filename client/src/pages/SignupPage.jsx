import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/api/user/register", userData);
      toast.success("Registered Successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setUserData({
        username: "",
        email: "",
        password: "",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col  min-h-[calc(100vh-128px)] items-center justify-center font-lexend gap-[40px]">
      <h2 className="text-2xl">Create Account</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[24px] w-[80%] md:w-[40%]"
      >
        <div className="flex flex-col gap-[4px]">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={userData.username}
            onChange={onInputChange}
            className="focus:outline-none border rounded-[4px] px-[8px] py-[4px]"
            required
          />
        </div>
        <div className="flex flex-col gap-[4px]">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={userData.email}
            onChange={onInputChange}
            className="focus:outline-none border rounded-[4px] px-[8px] py-[4px]"
            required
          />
        </div>
        <div className="flex flex-col gap-[4px]">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={userData.password}
            onChange={onInputChange}
            className="focus:outline-none border rounded-[4px] px-[8px] py-[4px] "
            minLength={8}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-main text-white px-[24px] py-[8px]
         rounded-full hover:bg-white hover:text-main
         border-1 border-main transition-all duration-300 text-center
         disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Signing-up..." : "Sign Up"}
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login" className="text-main underline underline-offset-2">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
