import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/logo.png';

const Header = () => {
    const [isBar, setIsBar] = useState(false);

    const handleBar = () => {
        setIsBar(prevState => !prevState);
    };

    return (
        <nav className="d-xl-flex">
            <div className="d-flex logo">
                <NavLink to="/" exact>
                    <img src={logo} alt="Logo" />
                </NavLink>
                <div className="search-phone d-flex">
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div className="bagach" onClick={() => handleBar()}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>
            <div className={`nav ${isBar ? 'open' : ''} mt-2`}>
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
                <div className="search-app">
                    <div className="icon-search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className="search">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
                <div className="nav-item login-desktop">
                    <NavLink className="nav-link" to="/dangnhap" activeClassName="active">Đăng nhập</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Header;
