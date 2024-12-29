import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../rudex/Actions/userAction";

const HandleLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Logout = () => {
        try {
            dispatch(logoutUser());
            localStorage.removeItem("user");
            navigate("/");
        } catch (error) {
            console.error("Đăng xuất thất bại:", error);
        }
    };

    return {
        Logout,
    };
};

export default HandleLogout;