import { BrowserRouter as Router, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import Header from './components/Client/Header/Header';
import Footer from './components/Client/Footer/Footer';
import AppRoutes, { validRoutes } from "./routes/appRoutes";
import Tab from "./components/Admin/Tab/Tab";
import HeaderAdmin from "./components/Admin/Header/HeaderAdmin";
import AdminRoutes, { adminRoutesValidate } from "./routes/adminRoutes";
import { ToastContainer } from "react-toastify";
import Login from "./components/Client/Login/Login";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import lixi from './assets/Tet/lixi.png'
import hoamai from './assets/Tet/hoamai.png'
import maivang from './assets/Tet/maivang.png'
import nguoituyet from './assets/Noel/nguoituyet.png'
import banhtrungthu from './assets/Trungthu/banhtrungthu.png'
import thongoc from './assets/Trungthu/thongoc.png'
import trang from './assets/Trungthu/trang.png'
import './App.scss';

function App() {
  const location = useLocation();
  const hideHeader = !validRoutes.includes(location.pathname);
  const isAdmin = adminRoutesValidate.includes(location.pathname);

  const [register, setRegister] = useState(false)
  const toggleRegister = () => {
    setRegister(!register)
  }

  const savedTheme = localStorage.getItem('darkMode');
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === 'true');

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  const [open, setOpen] = useState(true);
  const toggleOpen = () => {
    setOpen(!open);
  };

  const tetImages = [
    { src: lixi, alt: "Lì xì", className: "tet1" },
    { src: hoamai, alt: "Hoa mai", className: "tet2" },
    { src: maivang, alt: "Mai vàng", className: "tet3" },
  ];

  const NoelImages = [
    { src: nguoituyet, alt: "", className: "noel1" },
  ]

  const TrungthuImages = [
    { src: banhtrungthu, alt: "", className: "trungthu1" },
    { src: thongoc, alt: "", className: "trungthu2" },
    { src: trang, alt: "", className: "trungthu3" },
  ]

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
          {!hideHeader && <Header toggleRegister={toggleRegister} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}

          <div className="tet" style={{ display: "none" }}>
            {tetImages.map((img, index) => (
              <img key={index} className={img.className} src={img.src} alt={img.alt} />
            ))}
          </div>

          <div className="noel" style={{ display: "none" }}>
            {NoelImages.map((img, index) => (
              <img key={index} className={img.className} src={img.src} alt={img.alt} />
            ))}
          </div>

          <div className="trungthu" style={{ display: "none" }}>
            {TrungthuImages.map((img, index) => (
              <img key={index} className={img.className} src={img.src} alt={img.alt} />
            ))}
          </div>

          {register &&
            <div className="bg-fixed">
              <div className="fixed">
                <i className="fa-solid fa-x" onClick={toggleRegister} />
                <Login toggleRegister={toggleRegister} />
              </div>
            </div>
          }

          {/* App content */}
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
