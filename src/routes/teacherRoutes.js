import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../components/Client/Home/Home";

export const teacherRoutesValidate = ["/teacher/*"];

export const isTeacherRoute = (pathname) => {
  return teacherRoutesValidate.some((route) => {
    if (route.includes("*")) {
      return pathname.startsWith("/teacher");
    }
    return pathname === route;
  });
};

// Component bảo vệ route
const ProtectedRoute = ({ children }) => {
  const role = useSelector((state) => state.user.account.role);

  if (role !== "teacher") {
    return <Navigate to="/" replace />;
  }

  return children;
};

const TeacherRoutes = (props) => {
  return (
    <Routes>{/* <Route path="/teacher" element={<Home />}></Route> */}</Routes>
  );
};

export default TeacherRoutes;
