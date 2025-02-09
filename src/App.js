import { Link, BrowserRouter as Router, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/Client/Header/Header";
import Footer from "./components/Client/Footer/Footer";
import AppRoutes, { validRoutes } from "./routes/appRoutes";
import Tab from "./components/Admin/Tab/Tab";
import HeaderAdmin from "./components/Admin/Header/HeaderAdmin";
import AdminRoutes, { isAdminRoute } from "./routes/adminRoutes";
import { ToastContainer } from "react-toastify";
import Login from "./components/Client/Login/Login";
import Register from "./components/Client/Register/Register";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.scss";
import { useQuery } from "@tanstack/react-query";
import { getInforApi } from "./services/adminServer";
import { ShowNewClient } from "./services/clientServer";

function App() {
  const location = useLocation();
  const isAdmin = isAdminRoute(location.pathname);
  const hideHeader = validRoutes.includes(location.pathname);

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

  const useApi = (queryKey, queryFn) => useQuery({ queryKey, queryFn });
  useApi(["Infor"], getInforApi);
  useApi(["news"], ShowNewClient);

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
