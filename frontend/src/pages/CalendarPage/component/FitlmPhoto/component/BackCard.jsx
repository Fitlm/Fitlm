import React from "react";
import Footer from "./Footer";

const emotionIcons = {
  bad: "/assets/status/bad.png",
  cry: "/assets/status/cry.png",
  ji: "/assets/status/ji.png",
  ok: "/assets/status/ok.png",
  really_love: "/assets/status/really_love.png",
  want: "/assets/status/want.png",
};

const BackCard = ({ handleFlip, exerciseInfo }) => (
  <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg">
    {exerciseInfo.image ? (
      <div className="bg-light-color mt-3 object-cover w-full h-full flex flex-col items-center justify-around border-l-15 border-r-15 border-white">
        <p className="text-lg font-semibold text-semi-dark-color">
          {exerciseInfo.time || "N/A"}
        </p>
        <p className="text-lg font-semibold text-semi-dark-color">
          {exerciseInfo.type || "N/A"}
        </p>
        <div className="flex items-center justify-center">
          <img
            src={
              emotionIcons[exerciseInfo.emotion] || "/assets/status/default.png"
            }
            alt={exerciseInfo.emotion}
            className="w-19 h-25"
          />
        </div>
        <p className="text-xs font-semilight text-semi-dark-color">
          {exerciseInfo.motivation || "No data available for this date."}
        </p>
      </div>
    ) : (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-lg font-semibold text-semi-dark-color">
          이날 운동을 하지 않았습니다.
        </p>
      </div>
    )}
    <Footer handleFlip={handleFlip} exerciseInfo={exerciseInfo} />
  </div>
);

export default BackCard;
