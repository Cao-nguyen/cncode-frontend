import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import Settings from "../components/Admin/Settings/Settings";
import Infor from "../components/Admin/Infor/Infor";
import Ssl from "../components/Admin/Ssl/Ssl";

export const adminRoutesValidate = [
    '/admin/dashboard', '/admin/course', '/admin/try', '/admin/forum', '/admin/blog', '/admin/events', '/admin/news', '/admin/themes', '/admin/settings', '/admin/settings/infor', '/admin/settings/ssl'
];

// Component bảo vệ route
const ProtectedRoute = ({ children }) => {
    const role = useSelector(state => state.user.account.role);

    if (role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

const AdminRoutes = (props) => {
    return (
        <Routes>
            <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
            <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>}></Route>
            <Route path="/admin/settings/infor" element={<ProtectedRoute><Infor /></ProtectedRoute>}></Route>
            <Route path="/admin/settings/ssl" element={<ProtectedRoute><Ssl /></ProtectedRoute>}></Route>
        </Routes>
    );
};

export default AdminRoutes;