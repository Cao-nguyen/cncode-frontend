import { Routes, Route } from "react-router-dom";
import Home from "../components/Client/Home/Home";
import Gioithieu from "../components/Client/Infor/gioithieu";
import Khoahoc from "../components/Client/Khoahoc/Khoahoc";
import Blog from "../components/Client/Blog/Blog";

export const validRoutes = [];

const AppRoutes = (props) => {
  return (
    <Routes>
      {/* App */}
      <Route path="/" Component={Home}></Route>
      <Route path="/gioithieu" Component={Gioithieu}></Route>
      <Route path="/sanpham" Component={Khoahoc}></Route>
      <Route path="/blog" Component={Blog}></Route>
    </Routes>
  );
};

export default AppRoutes;
