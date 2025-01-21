import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Client/Home/Home";
import Register from "../components/Client/Register/Register";
import { useSelector } from "react-redux";
import Gioithieu from "../components/Client/Infor/gioithieu";
import Khuvuon from "../components/Client/Khuvuon/Khuvuon";

export const validRoutes = [
    '/', '/gioithieu', '/khoahoc', '/luyentap', '/diendan', '/blog', '/sukien', '/tintuc', '/timkiem',
];

// Component bảo vệ route
const ProtectedRoute = ({ children }) => {
    const tokenUser = useSelector(state => state.user.account.tokenUser);

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
            <Route path="/me/khuvuon" element={<ProtectedRoute><Khuvuon /></ProtectedRoute>}></Route>
        </Routes>
    );
};

export default AppRoutes;