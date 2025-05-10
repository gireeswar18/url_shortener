import React, { useEffect, useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";
import UrlCard from "../components/UrlCard";
import { toast } from "react-toastify";

const DashBoard = () => {
  const [userData, setUserData] = useState({
    userId: -1,
    username: "",
    email: "",
    urlMappingList: [],
  });
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const res = await api.post("/api/url/create", {
        "userId": userData.userId,
        "originalUrl": url
    });

    if (res.status === 200) {
        setUserData((prev) => ({
            ...prev,
            urlMappingList: [...userData.urlMappingList, res.data]
        }))
        setUrl("");
        toast.success("URL shortened successfully!")
    }
    else {
        toast.error("Error!")
    }
        
  }

  useEffect(() => {
    const userId = localStorage.getItem("USER_ID");

    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await api.get("/api/user/" + userId);

        setUserData({
          userId: res.data.userId,
          username: res.data.username,
          email: res.data.email,
          urlMappingList: res.data.urlMappingList,
        });
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="font-lexend py-[32px] space-y-[32px]">
      <div className="flex flex-col gap-[32px] py-[32px]">
        <h5 className="text-3xl text-center">
          Want to <span className="text-main">shorten</span> your URL?
        </h5>
        <div className="flex items-center justify-center gap-[16px] md:gap-[8px] flex-col md:flex-row">
          <input
            type="text"
            className="bg-white border border-main w-[80%] md:w-[60%] py-[6px] px-[12px] rounded-[6px] focus:outline-none text-black"
            placeholder="paste it..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="bg-main text-white px-[12px] py-[6px] rounded-[6px] disabled:cursor-not-allowed cursor-pointer"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Shortening..." : "Short It"}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col gap-[16px]">
        <h5 className="text-xl">Recent Links</h5>
        <div className="flex flex-col w-[80%] md:w-[70%] lg:w-[50%] gap-[16px]">
          {userData.urlMappingList.length > 0 ? (
            [...userData.urlMappingList].reverse().map((url, i) => (
              <UrlCard
                key={i}
                originalUrl={url.originalUrl}
                shortUrl={url.shortUrl}
              />
            ))
          ) : (
            <p className="text-center">No recent links!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
