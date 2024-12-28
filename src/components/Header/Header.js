import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../../assets/logo.png'
import './Header.scss'

function Header({ isDarkMode, toggleTheme }) {
    const tokenUser = useSelector(state => state.user.account.tokenUser);
    const fullName = useSelector(state => state.user.account.fullName);

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
                    <Nav.Item className="nav-links">
                        <Nav.Link>
                            <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`} onClick={toggleTheme}></i>
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="nav-links">
                        <Nav.Link>
                            <i className="fa-solid fa-bell"></i>
                        </Nav.Link>
                    </Nav.Item>
                    {tokenUser ?
                        <Nav.Item className="nav-links nav-last">
                            <Nav.Link className="nav-link" as={NavLink} to="/dangnhap" eventKey="/dangnhap">Đăng nhập</Nav.Link>
                        </Nav.Item>
                        :
                        <Dropdown>
                            <Dropdown.Toggle as="div" className="custom-dropdown-toggle">
                                <div className="greeting">
                                    Xin chào
                                </div>
                                <div className="user-name">
                                    {fullName}
                                </div>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <NavLink className="dropdown-link" to="/profile">Trang cá nhân</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    <NavLink className="dropdown-link" to="/me/khoahoc">Khoá học của tôi</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink className="dropdown-link" to="/me/khuvuon">Khu vườn trên mây</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    <NavLink className="dropdown-link" to="/me/post">Viết Blog</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink className="dropdown-link" to="/me/blog">Blog của tôi</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink className="dropdown-link" to="/me/loveblog">Blog yêu thích</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    <NavLink className="dropdown-link" to="/me/settings">Cài đặt</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink className="dropdown-link-logout" to="/me/logout">Đăng xuất</NavLink>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </div>
            </Nav>
        </div>
    );
}

export default Header;