import React, { useState } from "react";
import CustomCalendar from "./component/Calendar";
import FitlmPhoto from "./component/FitlmPhoto";

const exerciseData = {
  "2024-05-15": {
    image:
      "https://images.pexels.com/photos/12066797/pexels-photo-12066797.jpeg",
    time: "70min",
    type: "Leg Day",
    motivation: "나약해진 내 자신 지금 내가 하는건 재활운동..",
    count: 7,
    date: "2024-05-15",
    emotion: "ok",
  },
  "2024-05-16": {
    image:
      "https://images.pexels.com/photos/12066797/pexels-photo-12066797.jpeg",
    time: "60min",
    type: "Arm Day",
    motivation: "힘내자! 오늘도 파이팅!",
    count: 7,
    date: "2024-05-16",
    emotion: "really_love",
  },
};

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exerciseInfo, setExerciseInfo] = useState(
    exerciseData[selectedDate.toISOString().split("T")[0]] || {}
  );
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const selectedExerciseInfo = exerciseData[formattedDate] || {
      date: formattedDate,
      count: 0,
    };
    setSelectedDate(date);
    setExerciseInfo(selectedExerciseInfo);
    setIsFlipped(false); // 날짜 변경 시 isFlipped 상태 초기화
  };

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-row items-center space-x-7">
        <FitlmPhoto
          exerciseInfo={exerciseInfo}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
        />
        <CustomCalendar
          onDateChange={handleDateChange}
          exerciseData={exerciseData}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
