import React from "react";
import Footer from "./Footer";

const FrontCard = ({ handleFlip, exerciseInfo }) => {
  const { image } = exerciseInfo;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg">
      {image ? (
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/products/image/${image}`}
          alt="User Workout"
          className="pt-5 object-cover w-[20vw] h-[70vh] max-h-[70vh]"
        />
      ) : (
        <div className="mt-3 bg-gray-300 w-[23.5vw] h-[70vh] max-h-[70vh]"></div>
      )}
      <Footer handleFlip={handleFlip} exerciseInfo={exerciseInfo} />
    </div>
  );
};

export default FrontCard;
