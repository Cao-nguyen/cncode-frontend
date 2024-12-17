import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Trangchu from './components/Home/Trangchu';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" Component={Trangchu}></Route>
      </Routes>
    </Router>
  );
}

export default App;
