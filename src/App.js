// Các thư viện sử dụng
import { Link, BrowserRouter as Router, useLocation } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Aos from "aos";
// Thêm các trang hỗ trợ giao diện
import Header from "./components/Client/Header/Header";
import HeaderAdmin from "./components/Admin/Header/HeaderAdmin";
import Tab from "./components/Admin/Tab/Tab";
import Footer from "./components/Client/Footer/Footer";
import Login from "./components/Client/Login/Login";
import AppRoutes, { validateRoutes, clientRoutes } from "./routes/appRoutes";
import AdminRoutes, { isAdminRoute } from "./routes/adminRoutes";
import ThemeClientApp from "./middlewares/ThemeClientMiddleware";
import Nguyen from "./assets/Khac/Nguyen.png";
import logo from "./assets/logo.png";
import cozyMusic from "./assets/nhaccho/cozycoffeehouse.mp3";
import PageTransitionWrapper from "./components/Service/Common";
// API để gọi dữ liệu
import { getInforApi } from "./services/InforAdminServer";
import { ShowNewClient } from "./services/NewsClientServer";
// Các file css
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "aos/dist/aos.css";
import "./App.scss";
import { WebAdminRead } from "./services/WebAdminServer";
import TeacherRoutes, { isTeacherRoute } from "./routes/teacherRoutes";

function App() {
  // Xử lí route bên admin và client
  const location = useLocation();
  const isClientRoutes =
    /^\/[^/]+$/.test(location.pathname) &&
    !clientRoutes.includes(location.pathname);
  const hideHeader =
    validateRoutes.some((route) =>
      location.pathname.startsWith(route.replace(":username", ""))
    ) || isClientRoutes;
  const isAdmin = isAdminRoute(location.pathname);
  const isTeacher = isTeacherRoute(location.pathname);

  // Khởi tạo aos
  useEffect(() => {
    Aos.init({ duration: 3000, offset: 200, once: false });
  }, []);

  // Hiện thị đăng nhập - đăng ký - quên mật khẩu khi click
  const [login, setLogin] = useState(false);
  const toggleLogin = () => {
    setLogin(!login);
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

  // Gọi các API cần sử dụng khi mở Home
  const useApi = (queryKey, queryFn) => useQuery({ queryKey, queryFn });
  useApi(["Infor"], getInforApi);
  useApi(["news"], ShowNewClient);

  const [isCheck, setIsCheck] = useState(true);

  const audioRef = useRef(new Audio(cozyMusic));

  const startMusic = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    audioRef.current.loop = true;
  };

  useEffect(() => {
    const getData = async () => {
      const data = await WebAdminRead();
      if (data && data.EC === 0) {
        setIsCheck(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };

    getData();
  }, []);

  return (
    <div>
      {isCheck ? (
        <div className="container-load">
          <div className="logo-load">
            <img src={logo} alt="" />
          </div>
          <div className="load-bar"></div>
          <div className="btn btn-primary mt-5" onClick={startMusic}>
            {" "}
            Phát nhạc chờ
          </div>
        </div>
      ) : (
        <div className={isDarkMode ? "dark-mode" : ""}>
          {isAdmin && (
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
          )}

          {!isAdmin && (
            <div className="client-layout">
              {!hideHeader && (
                <Header
                  toggleLogin={toggleLogin}
                  isDarkMode={isDarkMode}
                  toggleTheme={toggleTheme}
                />
              )}

              <div className="icon-link">
                {location.pathname !== "/chatwithnguyen" &&
                  location.pathname !== "/hoidap" &&
                  location.pathname !== "/shop" &&
                  location.pathname !== "/diendan" && (
                    <>
                      <Link to="/chatwithnguyen">
                        <div className="icon-link-item">
                          <label>Chat với Nguyên</label>
                          <p>
                            <img src={Nguyen} alt="" />
                          </p>
                        </div>
                      </Link>

                      <Link to="/hoidap">
                        <div className="icon-link-item">
                          <label>Hỏi đáp</label>
                          <p>
                            <i class="fa-solid fa-comment"></i>
                          </p>
                        </div>
                      </Link>

                      <Link to="/shop">
                        <div className="icon-link-item">
                          <label>Bách hoá vật phẩm</label>
                          <p>
                            <i class="fa-solid fa-store"></i>
                          </p>
                        </div>
                      </Link>
                    </>
                  )}
              </div>

              <ThemeClientApp />

              {login && <Login toggleLogin={toggleLogin} />}

              {/* App content */}
              <div className="app-container">
                <AppRoutes />
              </div>

              {!hideHeader && <Footer />}
            </div>
          )}

          {isTeacher && (
            <div className="teacher-layout">
              <div className="teacher-container">
                <TeacherRoutes />
              </div>
            </div>
          )}
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
