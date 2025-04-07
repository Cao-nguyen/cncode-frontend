import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Dashboard
import Dashboard from "../components/Admin/Dashboard/Dashboard";

// Cài đặt
import Settings from "../components/Admin/Settings/Settings";
import Infor from "../components/Admin/Infor/Infor";
import Ssl from "../components/Admin/Ssl/Ssl";
import Themes from "../components/Admin/Themes/Themes";
import Use from "../components/Admin/Use/Use";
import Member from "../components/Admin/Member/Member";
import Web from "../components/Admin/Web/Web";
import AdminShop from "../components/Admin/Shop/Shop";

// Tin tức
import News from "../components/Admin/News/News";
import CreateNews from "../components/Admin/News/Create";
import ShowNews from "../components/Admin/News/Show";
import EditNews from "../components/Admin/News/Edit";

// Blog
import Blog from "../components/Admin/Blog/Blog";
import ShowBlog from "../components/Admin/Blog/Show";
import CreateBlog from "../components/Admin/Blog/Create";
import EditBlog from "../components/Admin/Blog/Edit";

// Khác
import Bins from "../components/Admin/Bins/Bins";

export const adminRoutesValidate = ["/admin/*"];

export const isAdminRoute = (pathname) => {
  return adminRoutesValidate.some((route) => {
    if (route.includes("*")) {
      return pathname.startsWith("/admin");
    }
    return pathname === route;
  });
};

// Component bảo vệ route
const ProtectedRoute = ({ children }) => {
  const role = useSelector((state) => state.user.account.role);

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AdminRoutes = (props) => {
  return (
    <Routes>
      <Route
        path="/admin/blog"
        element={
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/blog/show/:id"
        element={
          <ProtectedRoute>
            <ShowBlog />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/blog/create"
        element={
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/blog/edit/:id"
        element={
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/news"
        element={
          <ProtectedRoute>
            <News />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/news/create"
        element={
          <ProtectedRoute>
            <CreateNews />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/news/edit/:id"
        element={
          <ProtectedRoute>
            <EditNews />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/news/show/:id"
        element={
          <ProtectedRoute>
            <ShowNews />
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/settings/infor"
        element={
          <ProtectedRoute>
            <Infor />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/settings/ssl"
        element={
          <ProtectedRoute>
            <Ssl />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/settings/use"
        element={
          <ProtectedRoute>
            <Use />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/settings/members"
        element={
          <ProtectedRoute>
            <Member />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/settings/website"
        element={
          <ProtectedRoute>
            <Web />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/settings/shop"
        element={
          <ProtectedRoute>
            <AdminShop />
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/themes"
        element={
          <ProtectedRoute>
            <Themes />
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/bins"
        element={
          <ProtectedRoute>
            <Bins />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default AdminRoutes;
