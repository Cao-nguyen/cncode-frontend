import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const adminRoutesValidate = [
    '/admin/dashboard'
];

// Component bảo vệ route
const ProtectedRoute = ({ children }) => {
    const role = useSelector(state => state.user.account.role);

    if (role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const AdminRoutes = (props) => {
    return (
        <Routes>
            <Route path="/dangnhap" element={<ProtectedRoute></ProtectedRoute>}></Route>
        </Routes>
    );
};

export default AdminRoutes;