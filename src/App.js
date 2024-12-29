import { BrowserRouter as Router, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import Header from './components/Client/Header/Header';
import Footer from './components/Client/Footer/Footer';
import { validRoutes } from './routes/appRoutes';
import { adminRoutesValidate } from "./routes/adminRoutes";
import AppRoutes from "./routes/appRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';

function App() {
  const location = useLocation();
  const hideHeader = !validRoutes.includes(location.pathname);
  const isAdmin = !adminRoutesValidate.includes(location.pathname);

  const savedTheme = localStorage.getItem('darkMode');
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === 'true');

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  return (
    <>
      {isAdmin ?
        <div className={isDarkMode ? 'app dark-mode' : 'app'}>
          {!hideHeader && (
            <div className="header">
              <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </div>
          )}
          <div className="app-container">
            <AppRoutes />
          </div>
          {!hideHeader && (
            <div className="footer">
              <Footer />
            </div>
          )}
        </div>
        :
        <div className={isDarkMode ? 'app dark-mode' : 'app'}>
          Hello
        </div>
      }
    </>
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