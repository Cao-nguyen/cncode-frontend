import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss'
import logo from '../../assets/logo.png'

const Header = () => {
    return (
        <>
            <nav className="d-flex">
                <div className="logo mx-3">
                    <NavLink to="/" exact>
                        <img src={logo} alt="" />
                    </NavLink>
                </div>
                <div className="nav mt-2">
                    <div className="nav-item">
                        <NavLink className="nav-link" to="/" exact activeName="active">Trang chủ</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink className="nav-link" to="/gioithieu" activeName="active">Giới thiệu</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink className="nav-link" to="/khoahoc" activeName="active">Khoá học</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink className="nav-link" to="/luyentap" activeName="active">Luyện tập</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink className="nav-link" to="/diendan" activeName="active">Diễn đàn</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink className="nav-link" to="/blog" activeName="active">Blog</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink className="nav-link" to="/sukien" activeName="active">Sự kiện</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink className="nav-link" to="/tintuc" activeName="active">Tin tức</NavLink>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;