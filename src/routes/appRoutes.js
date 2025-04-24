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
import { AnimatePresence } from "framer-motion";
import PageTransitionWrapper from "../components/Service/Common";

export const validateRoutes = [
  "/me/post",
  "/me/settings",
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
  "/p/:username",
];

const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Trang chủ */}
        <Route
          path="/"
          element={
            <PageTransitionWrapper>
              <Home />
            </PageTransitionWrapper>
          }
        />

        {/* Hỏi đáp */}
        <Route
          path="/hoidap"
          element={
            <PageTransitionWrapper>
              <Ask />
            </PageTransitionWrapper>
          }
        />

        {/* Giới thiệu */}
        <Route
          path="/gioithieu"
          element={
            <PageTransitionWrapper>
              <Gioithieu />
            </PageTransitionWrapper>
          }
        />

        {/* Khoá học */}
        <Route
          path="/khoahoc"
          element={
            <PageTransitionWrapper>
              <Khoahoc />
            </PageTransitionWrapper>
          }
        />

        {/* Luyện tập */}
        <Route
          path="/luyentap"
          element={
            <PageTransitionWrapper>
              <Luyentap />
            </PageTransitionWrapper>
          }
        />

        {/* Diễn đàn */}
        <Route
          path="/diendan"
          element={
            <PageTransitionWrapper>
              <Diendan />
            </PageTransitionWrapper>
          }
        />

        {/* Blog */}
        <Route
          path="/blog"
          element={
            <PageTransitionWrapper>
              <Blog />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/me/post"
          element={
            <PageTransitionWrapper>
              <PostBlog />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/me/blog"
          element={
            <PageTransitionWrapper>
              <MeBlog />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <PageTransitionWrapper>
              <ShowBlog />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/me/loveblog"
          element={
            <PageTransitionWrapper>
              <LoveBlog />
            </PageTransitionWrapper>
          }
        />

        {/* Sự kiện */}
        <Route
          path="/sukien"
          element={
            <PageTransitionWrapper>
              <Sukien />
            </PageTransitionWrapper>
          }
        />

        {/* Tin tức */}
        <Route
          path="/tintuc"
          element={
            <PageTransitionWrapper>
              <Tintuc />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/tintuc/:slug"
          element={
            <PageTransitionWrapper>
              <ShowNews />
            </PageTransitionWrapper>
          }
        />

        {/* Khác */}
        <Route
          path="/p/:username"
          element={
            <PageTransitionWrapper>
              <Profile />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/shop"
          element={
            <PageTransitionWrapper>
              <Shop />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/me/khuvuon"
          element={
            <PageTransitionWrapper>
              <Khuvuon />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/chatwithnguyen"
          element={
            <PageTransitionWrapper>
              <Chat />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/me/settings"
          element={
            <PageTransitionWrapper>
              <Settings />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/me/transaction"
          element={
            <PageTransitionWrapper>
              <Transaction />
            </PageTransitionWrapper>
          }
        />

        {/* Footer */}
        <Route
          path="/ssl"
          element={
            <PageTransitionWrapper>
              <Ssl />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/use"
          element={
            <PageTransitionWrapper>
              <Use />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/member"
          element={
            <PageTransitionWrapper>
              <Member />
            </PageTransitionWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
