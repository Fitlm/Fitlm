import React from "react";
import Footer from "./Footer";

const emotionIcons = {
  1: "/assets/status/1.png",
  2: "/assets/status/2.png",
  3: "/assets/status/3.png",
  4: "/assets/status/4.png",
  5: "/assets/status/5.png",
  6: "/assets/status/6.png",
  7: "/assets/status/7.png",
};

const BackCard = ({ handleFlip, exerciseInfo }) => (
  <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg">
    {exerciseInfo.image ? (
      <div className="bg-light-color mt-3 object-cover w-full h-full flex flex-col items-center justify-evenly border-l-15 border-r-15 border-white">
        <p className="text-2xl font-semibold text-semi-dark-color">
          {exerciseInfo.time}
        </p>
        <p className="text-2xl font-semibold text-semi-dark-color">
          {exerciseInfo.type}
        </p>
        <div className="flex items-center justify-center">
          <img
            src={emotionIcons[exerciseInfo.emotion]}
            alt={exerciseInfo.emotion}
            className="h-28 object-cover"
          />
        </div>
        <p className="text-lg font-normal text-semi-dark-color">
          {exerciseInfo.motivation}
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