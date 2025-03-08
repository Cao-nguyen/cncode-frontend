import { Routes, Route } from "react-router-dom";
import Home from "../components/Client/Home/Home";
import Gioithieu from "../components/Client/Infor/gioithieu";
import Khoahoc from "../components/Client/Khoahoc/Khoahoc";
import Luyentap from "../components/Client/Luyentap/Luyentap";
import Diendan from "../components/Client/Diendan/Diendan";
import Blog from "../components/Client/Blog/Blog";
import Sukien from "../components/Client/Sukien/Sukien";
import Tintuc from "../components/Client/Tintuc/Tintuc";
import Khuvuon from "../components/Client/Khuvuon/Khuvuon";
import Ssl from "../components/Client/Ssl/Ssl";
import Use from "../components/Client/Use/Use";
import Member from "../components/Client/Member/Member";
import tintucRead from "../components/Client/Tintuc/Show";
import Profile from "../components/Client/Profile/Profile";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const username = useSelector((state) => state.user.account.username);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gioithieu" element={<Gioithieu />} />
      <Route path="/khoahoc" element={<Khoahoc />} />
      <Route path="/luyentap" element={<Luyentap />} />
      <Route path="/diendan" element={<Diendan />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/sukien" element={<Sukien />} />
      <Route path="/tintuc" element={<Tintuc />} />
      <Route path="/tintuc/:slug" Component={tintucRead} />
      <Route path="/me/khuvuon" element={<Khuvuon />} />
      <Route path="/ssl" element={<Ssl />} />
      <Route path="/use" element={<Use />} />
      <Route path="/member" element={<Member />} />
      <Route path={`/@${username}`} element={<Profile />} />
    </Routes>
  );
};

export const getValidRoutes = (state) => {
  const username = state.user.account.username;
  return username ? [`/@${username}`] : [];
};

export default AppRoutes;
