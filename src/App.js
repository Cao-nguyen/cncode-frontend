import { BrowserRouter as Router, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import Header from './components/Client/Header/Header';
import Footer from './components/Client/Footer/Footer';
import AppRoutes, { validRoutes } from "./routes/appRoutes";
import Tab from "./components/Admin/Tab/Tab";
import HeaderAdmin from "./components/Admin/Header/HeaderAdmin";
import AdminRoutes, { adminRoutesValidate } from "./routes/adminRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import lixi from './assets/lixi.png'
import hoamai from './assets/hoamai.png'
import maivang from './assets/maivang.png'
import nguoituyet from './assets/nguoituyet.png'
import banhtrungthu from './assets/banhtrungthu.png'
import thongoc from './assets/thongoc.png'
import trang from './assets/trang.png'
import './App.scss';

function App() {
  const location = useLocation();
  const hideHeader = !validRoutes.includes(location.pathname);
  const isAdmin = adminRoutesValidate.includes(location.pathname);

  const savedTheme = localStorage.getItem('darkMode');
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === 'true');

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  const [open, setOpen] = useState(true)

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      {isAdmin ? (
        <div className={open ? 'admin-layout-open' : 'admin-layout'}>
          <div className="sidebar">
            <Tab />
          </div>
          <div className="body">
            <div className="headerAdmin">
              <HeaderAdmin isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleOpen={toggleOpen} />
            </div>
            <div className="bodyAdmin">
              <AdminRoutes />
            </div>
          </div>
        </div>
      ) : (
        <div className="client-layout">
          {!hideHeader && <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}
          <div className="tet" style={{ display: "block" }}>
            <img className="tet1" src={lixi} alt=""></img>
            <img className="tet2" src={hoamai} alt=""></img>
            <img className="tet3" src={maivang} alt=""></img>
          </div>
          <div className="noel" style={{ display: "none" }}>
            <img className="noel1" src={nguoituyet} alt=""></img>
          </div>
          <div className="trungthu" style={{ display: "none" }}>
            <img className="trungthu1" src={banhtrungthu} alt=""></img>
            <img className="trungthu2" src={thongoc} alt=""></img>
            <img className="trungthu3" src={trang} alt=""></img>
          </div>
          <div className="app-container">
            <AppRoutes />
          </div>
          {!hideHeader && <Footer />}
        </div>
      )
      }
    </div >
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
