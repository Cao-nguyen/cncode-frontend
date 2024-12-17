import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <nav className="d-xl-flex">
            <div className="d-flex logo mx-3">
                <NavLink to="/" exact>
                    <img src={logo} alt="Logo" />
                </NavLink>
            </div>
            <div className="nav mt-2">
                <div className="nav-item">
                    <NavLink className="nav-link" to="/" exact activeClassName="active">Trang chủ</NavLink>
                </div>
                <div className="nav-item">
                    <NavLink className="nav-link" to="/gioithieu" activeClassName="active">Giới thiệu</NavLink>
                </div>
                <div className="nav-item">
                    <NavLink className="nav-link" to="/khoahoc" activeClassName="active">Khoá học</NavLink>
                </div>
                <div className="nav-item">
                    <NavLink className="nav-link" to="/luyentap" activeClassName="active">Luyện tập</NavLink>
                </div>
                <div className="nav-item">
                    <NavLink className="nav-link" to="/diendan" activeClassName="active">Diễn đàn</NavLink>
                </div>
                <div className="nav-item">
                    <NavLink className="nav-link" to="/blog" activeClassName="active">Blog</NavLink>
                </div>
                <div className="nav-item">
                    <NavLink className="nav-link" to="/sukien" activeClassName="active">Sự kiện</NavLink>
                </div>
                <div className="nav-item">
                    <NavLink className="nav-link" to="/tintuc" activeClassName="active">Tin tức</NavLink>
                </div>
                <div className="nav-item">
                    <NavLink className="nav-link" to="/dangnhap" activeClassName="active">Đăng nhập</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Header;
