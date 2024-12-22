import { Routes, Route } from "react-router-dom";
import Trangchu from '../components/Home/Trangchu';
import Loi from '../components/404/404';
import Dangnhap from "../components/Dangnhap/Dangnhap";
import Dangky from "../components/Dangky/Dangky";
import Quenmatkhau from "../components/Quenmatkhau/Quenmatkhau";

export const validRoutes = [
    '/', '/gioithieu', '/khoahoc',
    '/luyentap', '/diendan', '/blog', '/sukien', '/tintuc',
    '/timkiem'
]

const AppRoutes = (props) => {

    return (
        <Routes>
            <Route path="/" element={<Trangchu />} />
            <Route path='/dangky' element={<Dangky />} />
            <Route path='/dangnhap' element={<Dangnhap />} />
            <Route path='/quenmatkhau' element={<Quenmatkhau />} />
            <Route path="/*" element={<Loi />} />
        </Routes>
    );
}

export default AppRoutes;