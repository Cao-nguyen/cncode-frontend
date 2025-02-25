// Các thư viện sử dụng
import { Link, BrowserRouter as Router, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
// Thêm các trang hỗ trợ giao diện
import Header from "./components/Client/Header/Header";
import HeaderAdmin from "./components/Admin/Header/HeaderAdmin";
import Tab from "./components/Admin/Tab/Tab";
import Footer from "./components/Client/Footer/Footer";
import Login from "./components/Client/Login/Login";
import Forgot from "./components/Client/Forgot/Forgot";
import Register from "./components/Client/Register/Register";
import AppRoutes, { validRoutes } from "./routes/appRoutes";
import AdminRoutes, { isAdminRoute } from "./routes/adminRoutes";
import ThemeAppMiddleware from "./middlewares/ThemeAppMiddleware";
// Giao diện
import lixi from "./assets/Themes/Tet/lixi.png";
import nguoituyet from "./assets/Themes/Noel/nguoituyet.png";
import banhtrungthu from "./assets/Themes/Trungthu/banhtrungthu.png";
import thongoc from "./assets/Themes/Trungthu/thongoc.png";
import trang from "./assets/Themes/Trungthu/trang.png";
// API để gọi dữ liệu
import { getInforApi } from "./services/InforAdminServer";
import { ShowNewClient } from "./services/NewsClientServer";
// Các file css
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.scss";

function App() {
  // Xử lí route bên admin và client
  const location = useLocation();
  const isAdmin = isAdminRoute(location.pathname);
  const hideHeader = validRoutes.includes(location.pathname);

  // Hiện thị đăng nhập - đăng ký - quên mật khẩu khi click
  const [login, setLogin] = useState(false);
  const toggleLogin = () => {
    setLogin(!login);
  };

  const [forgotPassword, setForgotPassword] = useState(false);
  const toggleForgot = () => {
    setForgotPassword(!forgotPassword);
  };

  const [register, setRegister] = useState(false);
  const toggleRegister = () => {
    setRegister(!register);
  };

  // Thay đổi vào lưu giao diện sáng / tối
  const savedTheme = localStorage.getItem("darkMode");
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === "true");

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const [open, setOpen] = useState(true);
  const toggleOpen = () => {
    setOpen(!open);
  };

  // Cấu hình hình ảnh
  const NoelImages = [{ src: nguoituyet, alt: "", className: "noel1" }];

  const TrungthuImages = [
    { src: banhtrungthu, alt: "", className: "trungthu1" },
    { src: thongoc, alt: "", className: "trungthu2" },
    { src: trang, alt: "", className: "trungthu3" },
  ];

  // Gọi các API cần sử dụng khi mở Home
  const useApi = (queryKey, queryFn) => useQuery({ queryKey, queryFn });
  useApi(["Infor"], getInforApi);
  useApi(["news"], ShowNewClient);

  // Xử lí giao diện
  const { tet } = ThemeAppMiddleware();

  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      {isAdmin ? (
        <div className={open ? "admin-layout-open" : "admin-layout"}>
          <div className="phoneAdmin">
            <h1>
              Trang Admin không thể sử dụng trên điện thoại. Vui lòng chuyển
              sang thiết bị khác.
            </h1>
            <Link className="btn btn-primary" to="/">
              Trở về
            </Link>
          </div>
          <div className="sidebar">
            <Tab />
          </div>
          <div className="body">
            <div className="headerAdmin">
              <HeaderAdmin
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                toggleOpen={toggleOpen}
              />
            </div>
            <div className="bodyAdmin">
              <AdminRoutes />
            </div>
          </div>
        </div>
      ) : (
        <div className="client-layout">
          {!hideHeader && (
            <Header
              toggleLogin={toggleLogin}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
          )}

          <div className="tet" style={{ display: tet ? "block" : "none" }}>
            <img className="tet1" src={lixi} alt="" />
          </div>

          <div className="noel" style={{ display: "none" }}>
            {NoelImages.map((img, index) => (
              <img
                key={index}
                className={img.className}
                src={img.src}
                alt={img.alt}
              />
            ))}
          </div>

          <div className="trungthu" style={{ display: "none" }}>
            {TrungthuImages.map((img, index) => (
              <img
                key={index}
                className={img.className}
                src={img.src}
                alt={img.alt}
              />
            ))}
          </div>

          {login && (
            <div className="bg-fixed">
              <div className="fixed">
                <i className="fa-solid fa-x" onClick={toggleLogin} />
                <Login
                  toggleForgot={toggleForgot}
                  toggleLogin={toggleLogin}
                  toggleRegister={toggleRegister}
                />
              </div>
            </div>
          )}

          {forgotPassword && (
            <div className="bg-fixed">
              <div className="fixed">
                <i className="fa-solid fa-x" onClick={toggleForgot} />
                <Forgot />
              </div>
            </div>
          )}

          {register && (
            <div className="bg-fix">
              <div className="fixed">
                <i className="fa-solid fa-x" onClick={toggleRegister} />
                <Register toggleRegister={toggleRegister} />
              </div>
            </div>
          )}

          {/* App content */}
          <div className="app-container">
            <AppRoutes />
          </div>

          {!hideHeader && <Footer />}
        </div>
      )}
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default AppWithRouter;
