import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/logo.png'
import './Header.scss'

function Header(props) {
    return (
        <div>
            <Nav className="nav" variant="pills">
                <div className="nav-logo">
                    <img className="logo" src={logo} alt="" />
                </div>
                <div className="d-flex nav-item">
                    <Nav.Item className="nav-links">
                        <Nav.Link className="nav-link" as={NavLink} to="/" eventKey="/">Trang chủ</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-links">
                        <Nav.Link className="nav-link" as={NavLink} to="/gioithieu" eventKey="/gioithieu">Giới thiệu</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-links">
                        <Nav.Link className="nav-link" as={NavLink} to="/khoahoc" eventKey="/khoahoc">Khoá học</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-links">
                        <Nav.Link className="nav-link" as={NavLink} to="/luyentap" eventKey="/luyentap">Luyện tập</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-links">
                        <Nav.Link className="nav-link" as={NavLink} to="/diendan" eventKey="/diendan">Diễn đàn</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-links">
                        <Nav.Link className="nav-link" as={NavLink} to="/blog" eventKey="/blog">Blog</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-links">
                        <Nav.Link className="nav-link" as={NavLink} to="/sukien" eventKey="/sukien">Sự kiện</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-links">
                        <Nav.Link className="nav-link" as={NavLink} to="/tintuc" eventKey="/tintuc">Tin tức</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-links nav-last">
                        <Nav.Link className="nav-link" as={NavLink} to="/dangnhap" eventKey="/dangnhap">Đăng nhập</Nav.Link>
                    </Nav.Item>
                </div>
            </Nav>
        </div>
    );
}

export default Header;