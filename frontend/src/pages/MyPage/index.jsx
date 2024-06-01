import React, { useState } from "react";
import { logoutUser } from "../../store/thunkFunctions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileItem from "./component/ProfileItem";

const MyPage = () => {
  const [name, setName] = useState("Fitlm");
  const [nickname, setNickname] = useState("핏-름");
  const [height, setHeight] = useState("178.5");
  const [weight, setWeight] = useState("73.5");
  const [muscle, setMuscle] = useState("34.2");
  const [fat, setFat] = useState("19.2");

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <section className="h-4/5 w-4/5 bg-light-color rounded-lg">
        <div className="max-w-6xl mx-auto p-10">
          <div className="flex justify-center items-center p-6">
            <div
              className="flex items-center relative"
              style={{ width: "800px" }}
            >
              <img
                src="images/FITLM.jpg"
                alt=""
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  marginRight: "20px",
                  cursor: "pointer",
                }}
              />
              <div className="flex flex-col justify-center" style={{ flex: 1 }}>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-1 text-xl font-bold"
                    style={{
                      backgroundColor: "transparent",
                      color: "#B09C93",
                      border: "none",
                      height: "2rem",
                    }}
                  />
                ) : (
                  <p className="mb-1 text-xl font-bold text-[#401C0C]">
                    {name}
                  </p>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="text-sm"
                    style={{
                      backgroundColor: "transparent",
                      color: "#B09C93",
                      border: "none",
                      height: "1.5rem",
                    }}
                  />
                ) : (
                  <p className="text-sm text-[#401C0C] pt-1">{nickname}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <ProfileItem
              label="키"
              value={height}
              isEditing={isEditing}
              onChange={(e) => setHeight(e.target.value)}
              unit="cm"
            />
            <ProfileItem
              label="몸무게"
              value={weight}
              isEditing={isEditing}
              onChange={(e) => setWeight(e.target.value)}
              unit="kg"
            />
          </div>

          <div className="flex justify-between mt-4">
            <ProfileItem
              label="골격근량"
              value={muscle}
              isEditing={isEditing}
              onChange={(e) => setMuscle(e.target.value)}
              unit="kg"
            />
            <ProfileItem
              label="체지방률"
              value={fat}
              isEditing={isEditing}
              onChange={(e) => setFat(e.target.value)}
              unit="%"
            />
          </div>

          <div className="flex justify-center mt-10">
            <button
              className="px-6 py-2 bg-[#E2D7D2] text-[#401C0C] rounded-3xl"
              style={{ width: "100px" }}
              onClick={handleEdit}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </section>
      <button
        className="w-full block text-dark-color hover:text-white underline hover:text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default MyPage;
