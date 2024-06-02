import React, { useEffect, useState } from "react";
import CustomCalendar from "./component/Calendar";
import FitlmPhoto from "./component/FitlmPhoto";
import axiosInstance from "../../utils/axios";

const CalendarPage = () => {
  const limit = 4;
  const [exerciseData, setExerciseData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exerciseInfo, setExerciseInfo] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [skip] = useState(0);

  useEffect(() => {
    fetchExerciseData({ skip, limit });
  }, [skip]);

  const fetchExerciseData = async ({ skip, limit, loadMore = false }) => {
    const params = {
      skip,
      limit,
    };

    try {
      const response = await axiosInstance.get("/products", { params });
      console.log("Fetched exercise data:", response.data);

      const newExerciseData = response.data.products.reduce((acc, item) => {
        const date = new Date(item.uploadDate);
        date.setHours(date.getHours() + 9); // 한국 시간 기준으로 변환
        const formattedDate = date.toISOString().split("T")[0];
        acc[formattedDate] = {
          image:
            Array.isArray(item.images) && item.images.length > 0
              ? item.images[0]
              : null,
          time: `${item.exerciseTime}min`,
          type: item.exercisePart,
          motivation: item.memo,
          count: 7,
          date: formattedDate,
          emotion: item.satisfaction,
        };
        return acc;
      }, {});

      if (loadMore) {
        setExerciseData((prevData) => ({ ...prevData, ...newExerciseData }));
      } else {
        setExerciseData(newExerciseData);
      }
    } catch (error) {
      console.error("Error fetching exercise data:", error);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsFlipped(false); // 날짜 변경 시 isFlipped 상태 초기화
  };

  useEffect(() => {
    const date = new Date(selectedDate);
    date.setHours(date.getHours() + 9); // 한국 시간 기준으로 변환
    const formattedDate = date.toISOString().split("T")[0];
    const selectedExerciseInfo = exerciseData[formattedDate] || {
      date: formattedDate,
      count: 0,
    };
    setExerciseInfo(selectedExerciseInfo);
  }, [selectedDate, exerciseData]);

  return (
    <div className="flex flex-col justify-center items-center mr-40">
      <div className="flex flex-row items-center justify-start space-x-8">
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
