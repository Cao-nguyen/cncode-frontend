import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import Settings from "../components/Admin/Settings/Settings";
import Infor from "../components/Admin/Infor/Infor";
import Ssl from "../components/Admin/Ssl/Ssl";
import Themes from "../components/Admin/Themes/Themes"
import News from "../components/Admin/News/News"
import CreateNews from "../components/Admin/News/Create";
import EditNews from "../components/Admin/News/Edit";
import ShowNews from '../components/Admin/News/Show'

export const adminRoutesValidate = [
    '/admin/*',
];

export const isAdminRoute = (pathname) => {
    return adminRoutesValidate.some(route => {
        if (route.includes('*')) {
            return pathname.startsWith('/admin');
        }
        return pathname === route;
    });
};

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

            <Route path="/admin/news" element={<ProtectedRoute><News /></ProtectedRoute>}></Route>
            <Route path="/admin/news/create" element={<ProtectedRoute><CreateNews /></ProtectedRoute>}></Route>
            <Route path="/admin/news/edit/:id" element={<ProtectedRoute><EditNews /></ProtectedRoute>}></Route>
            <Route path="/admin/news/show/:id" element={<ProtectedRoute><ShowNews /></ProtectedRoute>}></Route>

            <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>}></Route>
            <Route path="/admin/settings/infor" element={<ProtectedRoute><Infor /></ProtectedRoute>}></Route>
            <Route path="/admin/settings/ssl" element={<ProtectedRoute><Ssl /></ProtectedRoute>}></Route>

            <Route path="/admin/themes" element={<ProtectedRoute><Themes /></ProtectedRoute>}></Route>
        </Routes>
    );
};

export default AdminRoutes;