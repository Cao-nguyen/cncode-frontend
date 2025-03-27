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
import PostBlog from "../components/Client/Blog/Post";
import MeBlog from "../components/Client/Blog/MeBlog";
import Ask from "../components/Client/Ask/Ask";
import Settings from "../components/Client/Settings/Settings";

export const validateRoutes = ["/me/post", "/me/settings", "/p/caonguyen2009"];

export const clientRoutes = [
  "/gioithieu",
  "/khoahoc",
  "/luyentap",
  "/diendan",
  "/blog",
  "/sukien",
  "/tintuc",
  "/tintuc/:slug",
  "/ssl",
  "/member",
  "/use",
  "/me/blog",
  "/hoidap",
];

const AppRoutes = () => {
  return (
    <Routes>
      {/* Trang chủ */}
      <Route path="/" element={<Home />} />

      {/* Hỏi đáp */}
      <Route path="/hoidap" element={<Ask />} />

      {/* Giới thiệu */}
      <Route path="/gioithieu" element={<Gioithieu />} />

      {/* Khoá học */}
      <Route path="/khoahoc" element={<Khoahoc />} />

      {/* Luyện tập */}
      <Route path="/luyentap" element={<Luyentap />} />

      {/* Diễn đàn */}
      <Route path="/diendan" element={<Diendan />} />

      {/* Blog */}
      <Route path="/blog" element={<Blog />} />
      <Route path="/me/post" element={<PostBlog />} />
      <Route path="/me/blog" element={<MeBlog />} />
      <Route path="/me/settings" element={<Settings />} />

      {/* Sự kiện */}
      <Route path="/sukien" element={<Sukien />} />

      {/* Tin tức */}
      <Route path="/tintuc" element={<Tintuc />} />
      <Route path="/tintuc/:slug" Component={tintucRead} />

      {/* Khác */}
      <Route path="/p/:username" element={<Profile />} />
      <Route path="/me/khuvuon" element={<Khuvuon />} />
      <Route path="/ssl" element={<Ssl />} />
      <Route path="/use" element={<Use />} />
      <Route path="/member" element={<Member />} />
    </Routes>
  );
};

export default AppRoutes;
