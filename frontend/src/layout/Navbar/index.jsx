import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavItem from "./Sections/NavItem";
import NotificationModal from "../../components/Notification";
import axios from "axios"; // axios를 사용하여 백엔드 서버에 HTTP 요청을 보냅니다.

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const handleMenu = () => {
    setMenu(!menu);
  };

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
    <section className="relative z-10 text-black bg-[#e2d7d2] h-full">
      <div className="w-full h-full">
        <div className="flex flex-col items-start justify-start h-full mx-5 sm:mx-10 lg:mx-20 mt-10">
          <div className="flex items-center text-2xl h-14 mb-6">
            <Link to="/" className="text-dark-color font-bold text-xl">
              Logo
            </Link>
          </div>
          <div className="flex flex-col items-start space-y-4 w-full">
            <NavItem />
            <button
              className="text-dark-color py-4 w-full text-left cursor-pointer hover:text-white font-bold text-lg"
              onClick={handleNotificationClick}
            >
              Notification
            </button>
          </div>
        </div>
      </div>
      <NotificationModal
        show={showModal}
        handleClose={handleCloseModal}
        data={data}
      />
    </section>
  );
};

export default Navbar;
