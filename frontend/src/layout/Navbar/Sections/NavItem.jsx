import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/thunkFunctions";

const routes = [
  { to: "/login", name: "login", auth: false },
  { to: "/register", name: "register", auth: false },
  { to: "/product/upload", name: "업로드", auth: true },
  { to: "/calendar", name: "Calendar", auth: true },
  { to: "/mypage", name: "Mypage", auth: true },
  { to: "", name: "로그아웃", auth: true },
];

const NavItem = ({ mobile }) => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

  return (
    <ul
      className={`text-md w-full flex ${
        mobile ? "flex-col bg-gray-900 h-screen" : "flex-col"
      } items-center`}
    >
      {routes.map(({ to, name, auth }) => {
        if (isAuth !== auth) return null;
        if (name === "로그아웃") {
          return (
            <li key={name} className="py-4 w-full text-left cursor-pointer">
              <Link
                onClick={handleLogout}
                className="w-full block text-dark-color font-black text-lg hover:text-white"
              >
                {name}
              </Link>
            </li>
          );
        } else {
          return (
            <li key={name} className="py-12 w-full text-left cursor-pointer">
              <Link
                to={to}
                className="w-full block text-dark-color font-black text-lg hover:text-white"
              >
                {name}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

NavItem.propTypes = {
  mobile: PropTypes.bool, // 필수로 요구하지 않음
};

export default NavItem;
