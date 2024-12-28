import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home/Home";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import { useSelector } from "react-redux";

export const validRoutes = [
    '/', '/gioithieu', '/khoahoc', '/luyentap', '/diendan', '/blog', '/sukien', '/tintuc', '/timkiem',
];

// Component bảo vệ route
const ProtectedRoute = ({ children }) => {
    const tokenUser = useSelector(state => state.user.account.tokenUser);

    if (tokenUser) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path="/" Component={Home}></Route>
            <Route path="/dangky" element={<ProtectedRoute><Register /></ProtectedRoute>}></Route>
            <Route path="/dangnhap" element={<ProtectedRoute><Login /></ProtectedRoute>}></Route>
        </Routes>
    );
};

export default AppRoutes;