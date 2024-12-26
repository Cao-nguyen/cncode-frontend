import { Routes, Route } from "react-router-dom"
import Home from "../components/Home/Home"
// import Register from "../components/Register/Register"
import Login from "../components/Login/Login"
// import ForgotPassword from "../components/ForgotPassword/ForgotPassword"
// import Error from "../components/Error/Error"

export const validRoutes = [
    '/', '/gioithieu', '/khoahoc',
    '/luyentap', '/diendan', '/blog', '/sukien', '/tintuc',
    '/timkiem',
]

const AppRoutes = (props) => {

    return (
        <Routes>
            <Route path="/" Component={Home}></Route>
            <Route path="/dangnhap" Component={Login}></Route>
        </Routes>
    );
}

export default AppRoutes;