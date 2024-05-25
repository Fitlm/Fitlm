import React, { useState } from "react";
import FrontCard from "./component/FrontCard";
import BackCard from "./component/BackCard";
import "./index.css";

const FitlmPhoto = ({ exerciseInfo, isFlipped, setIsFlipped }) => {
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="scene">
      <div className={`card ${isFlipped ? "is-flipped" : ""}`}>
        <div className="card__face card__face--front">
          <FrontCard handleFlip={handleFlip} exerciseInfo={exerciseInfo} />
        </div>
        <div className="card__face card__face--back">
          <BackCard handleFlip={handleFlip} exerciseInfo={exerciseInfo} />
        </div>
      </div>
    </div>
  );
};

export default FitlmPhoto;
