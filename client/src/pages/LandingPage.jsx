import React, { useEffect } from "react";
import { FaShieldAlt, FaCheckCircle, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const userId = localStorage.getItem("USER_ID");

        if (userId) {
            navigate("/dashboard");
        }
    }, [])

  return (
    <div
      className="flex flex-col gap-[32px] items-center justify-center py-[16px] font-lexend text-center
     min-h-[calc(100vh-128px)] "
    >
      <div className="flex flex-col gap-[16px] md:gap-[32px]">
        <h1 className="text-4xl md:text-6xl font-semibold">
          Tired of <span className="text-main">Long</span> URLs?
        </h1>
        <p className="text-[16px] md:text-xl text-slate-500">
          Use{" "}
          <span className="text-main underline underline-offset-2">
            Short It
          </span>{" "}
          to Shorten your URLs in Seconds
        </p>
      </div>
      <Link
        to="/signup"
        className="bg-main text-white px-[24px] py-[8px]
         rounded-full hover:bg-white hover:text-main
         border-1 border-main transition-all duration-300"
      >
        Get Started for Free
      </Link>
      <div className="flex text-xl gap-[16px] md:gap-[48px] py-[32px]">
        <p className="flex flex-col gap-[8px] items-center text-[16px] md:text-xl">
          <FaCheckCircle className="text-main" /> Simple
        </p>
        <p className="flex flex-col gap-[8px] items-center text-[16px] md:text-xl">
          <FaShieldAlt className="text-main" /> Robust
        </p>
        <p className="flex flex-col gap-[8px] items-center text-[16px] md:text-xl">
          <FaLock className="text-main" /> Secure
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
