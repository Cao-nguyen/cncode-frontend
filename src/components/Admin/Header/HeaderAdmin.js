import React from 'react';
import { useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink } from 'react-router-dom';
import HandleLogout from '../../../middlewares/LogoutMiddleware';
import './HeaderAdmin.scss';

function HeaderAdmin({ isDarkMode, toggleTheme, toggleOpen }) {
    const fullName = useSelector(state => state.user.account.fullName);

    const { Logout } = HandleLogout();

    return (
        <div>
            <Nav className="d-flex headerAdmin" variant="pills">
                <i className="fa-solid fa-bars" onClick={toggleOpen}></i>
                <div className="d-flex nav-item">
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

                    <Dropdown>
                        <Dropdown.Toggle as="div" className="custom-dropdown-toggle">
                            <div className="greeting">
                                Admin
                            </div>
                            <div className="user-name">
                                {fullName}
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <NavLink className="dropdown-link" to="/">Trang chủ</NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <NavLink className="dropdown-link-logout" onClick={Logout}>Đăng xuất</NavLink>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Nav>
        </div>
    );
}

export default HeaderAdmin;