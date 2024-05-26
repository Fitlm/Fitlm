import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NotificationModal from "../../../components/Notification";
import axios from "axios"; // axios를 사용하여 백엔드 서버에 HTTP 요청을 보냅니다.

const routes = [
  { to: "/", name: "PictureBoard(TEST)", auth: null },
  { to: "/login", name: "Login", auth: false },
  { to: "/register", name: "Register", auth: false },
  { to: "/product/upload", name: "Upload", auth: true },
  { to: "/calendar", name: "Calendar", auth: true },
  { to: "/mypage", name: "Mypage", auth: true },
];

const NavItem = ({ mobile }) => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const handleNotificationClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/quotes/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching motivation quotes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`text-dark-color font-bold text-xl ${mobile ? "bg-gray-900 h-screen" : ""}`}>
      <ul
        className={`text-md w-full flex ${
          mobile ? "flex-col" : "flex-col"
        } items-center`}
      >
        {routes.map(({ to, name, auth }) => {
          if (auth !== null && isAuth !== auth) return null;

          if (name === "Upload" && isAuth) {
            return (
              <React.Fragment key={name}>
                <li className="py-16 w-full text-left cursor-pointer">
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `w-full block ${isActive ? "text-white" : ""} hover:text-white`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
                <li className="py-16 w-full cursor-pointer">
                  <button
                    className="w-full block text-left hover:text-white"
                    onClick={handleNotificationClick}
                  >
                    Notification
                  </button>
                </li>
              </React.Fragment>
            );
          }

          return (
            <li key={name} className="py-16 w-full text-left cursor-pointer">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `w-full block ${isActive ? "text-white" : ""} hover:text-white`
                }
              >
                {name}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <NotificationModal
        show={showModal}
        handleClose={handleCloseModal}
        data={data}
      />
    </div>
  );
};

NavItem.propTypes = {
  mobile: PropTypes.bool, // 필수로 요구하지 않음
};

export default NavItem;