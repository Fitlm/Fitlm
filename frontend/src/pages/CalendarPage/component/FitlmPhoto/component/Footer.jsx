import React from "react";
import { LuRefreshCcw } from "react-icons/lu";

const Footer = ({ handleFlip, exerciseInfo }) => (
  <div className="flex flex-row items-end justify-between w-full h-[20vh] px-3 pb-5">
    <div className="flex items-center">
      <p className="text-lg font-semibold text-dark-color">
        {exerciseInfo.count || 0}
      </p>
      <button className="pl-1 text-dark-color" onClick={handleFlip}>
        <LuRefreshCcw className="text-base" />
      </button>
    </div>
    <p className="text-lg font-semibold text-dark-color">{exerciseInfo.date}</p>
  </div>
);

export default Footer;