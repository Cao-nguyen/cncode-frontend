import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Client/Home/Home";
import Gioithieu from "../components/Client/Infor/gioithieu";
import Khoahoc from "../components/Client/Khoahoc/Khoahoc";
import Luyentap from "../components/Client/Luyentap/Luyentap";
import Diendan from "../components/Client/Diendan/Diendan";
import Blog from "../components/Client/Blog/Blog";
import Sukien from "../components/Client/Sukien/Sukien";
import Tintuc from "../components/Client/Tintuc/Tintuc";
import tintucShow from "../components/Client/Tintuc/Show";
import { useSelector } from "react-redux";
import Khuvuon from "../components/Client/Khuvuon/Khuvuon";
import Ssl from "../components/Client/Ssl/Ssl";

export const validRoutes = [];

// Component bảo vệ route
const ProtectedRoute = ({ children }) => {
  const tokenUser = useSelector((state) => state.user.account.tokenUser);

  if (!tokenUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = (props) => {
  return (
    <Routes>
      {/* App */}
      <Route path="/" Component={Home}></Route>
      <Route path="/gioithieu" Component={Gioithieu}></Route>
      <Route path="/khoahoc" Component={Khoahoc}></Route>
      <Route path="/luyentap" Component={Luyentap}></Route>
      <Route
        path="/diendan"
        Component={
          <ProtectedRoute>
            <Diendan />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/blog" Component={Blog}></Route>
      <Route path="/sukien" Component={Sukien}></Route>
      <Route path="/tintuc" Component={Tintuc}></Route>
      <Route path="/tintuc/:slug" Component={tintucShow}></Route>
      <Route
        path="/me/khuvuon"
        element={
          <ProtectedRoute>
            <Khuvuon />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/ssl" Component={Ssl}></Route>
    </Routes>
  );
};

export default AppRoutes;
