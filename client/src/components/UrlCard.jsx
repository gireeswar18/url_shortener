import React from "react";

const UrlCard = ({ originalUrl, shortUrl }) => {
  return (
    <div className="border border-slate-500 rounded-[8px] shadow-xl shadow-main/20">
      <div className="flex flex-col p-[16px] gap-[8px]">
        <p>
          <span className="font-bold">Original URL:</span>{" "}
          <a
            className="underline underline-offset-2 decoration-blue-600 text-blue-600 break-all"
            href={originalUrl}
            target="_blank"
          >
            {originalUrl}
          </a>
        </p>
        <p>
          <span className="font-bold">Short URL:</span>{" "}
          <a
            className="underline underline-offset-2 decoration-blue-600 text-blue-600 break-all"
            href={"http://localhost:8080/" + shortUrl}
            target="_blank"
          >
            {"http://localhost:8080/" + shortUrl}
          </a>
        </p>
      </div>
    </div>
  );
};

export default UrlCard;
