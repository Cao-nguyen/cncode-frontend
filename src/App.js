import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/appRoutes';
import { validRoutes } from './routes/appRoutes';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const hideHeader = !validRoutes.includes(location.pathname);

  return (
    <div>
      {!hideHeader && (
        <div className="header">
          <Header />
        </div>
      )}
      <div className="app-container">
        <AppRoutes />
      </div>
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
      {!hideHeader && (
        <div className="footer">
          <Footer />
        </div>
      )}
    </div>
  )
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;