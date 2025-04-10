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
import ShowNews from "../components/Client/Tintuc/Show";
import ShowBlog from "../components/Client/Blog/Show";
import Profile from "../components/Client/Profile/Profile";
import PostBlog from "../components/Client/Blog/Post";
import LoveBlog from "../components/Client/Blog/LoveBlog";
import MeBlog from "../components/Client/Blog/MeBlog";
import Ask from "../components/Client/Ask/Ask";
import Settings from "../components/Client/Settings/Settings";
import Shop from "../components/Client/Shop/Shop";
import Chat from "../components/Client/Chat/Chat";
import Transaction from "../components/Client/Transaction/Transaction";

export const validateRoutes = [
  "/me/post",
  "/me/settings",
  "/p/:username",
  "/shop",
  "/chatwithnguyen",
  "/me/transaction",
];

export const clientRoutes = [
  "/gioithieu",
  "/khoahoc",
  "/luyentap",
  "/diendan",
  "/blog",
  "/blog/:slug",
  "/sukien",
  "/tintuc",
  "/tintuc/:slug",
  "/ssl",
  "/member",
  "/use",
  "/me/blog",
  "/hoidap",
  "/me/loveblog",
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
      <Route path="/blog/:slug" element={<ShowBlog />} />
      <Route path="/me/loveblog" element={<LoveBlog />} />

      {/* Sự kiện */}
      <Route path="/sukien" element={<Sukien />} />

      {/* Tin tức */}
      <Route path="/tintuc" element={<Tintuc />} />
      <Route path="/tintuc/:slug" element={<ShowNews />} />

      {/* Khác */}
      <Route path="/p/:username" element={<Profile />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/me/khuvuon" element={<Khuvuon />} />
      <Route path="/chatwithnguyen" element={<Chat />} />
      <Route path="/me/settings" element={<Settings />} />
      <Route path="/me/transaction" element={<Transaction />} />

      {/* Footer */}
      <Route path="/ssl" element={<Ssl />} />
      <Route path="/use" element={<Use />} />
      <Route path="/member" element={<Member />} />
    </Routes>
  );
};

export default AppRoutes;
