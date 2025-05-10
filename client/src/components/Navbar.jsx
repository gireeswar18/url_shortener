import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const LOGIN_EVENT = "userLoggedIn";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuth = () => {
      const userId = localStorage.getItem("USER_ID");
      setShowLogout(!!userId);
    };
    
    checkUserAuth();
    
    const handleLogin = () => {
      checkUserAuth();
    };
    
    window.addEventListener(LOGIN_EVENT, handleLogin);
    
    return () => {
      window.removeEventListener(LOGIN_EVENT, handleLogin);
    };
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("USER_ID");
    setShowLogout(false);
    navigate("/");
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <nav className="flex justify-between items-center py-[8px] md:py-[16px] border-b border-slate-300">
      <p className="font-pattaya text-main font-semibold text-xl md:text-2xl">
        Short It
      </p>
      <div className="flex items-center gap-[16px] md:gap-[40px] font-lexend">
        <button onClick={toggleTheme} className="md:text-xl cursor-pointer">
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
        {showLogout && (
          <button onClick={handleLogout} className="border border-red-600 px-[8px] py-[4px] rounded-[8px] cursor-pointer">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;