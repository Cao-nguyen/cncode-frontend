import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import logo from "../../../assets/logo.png";
import UseDropdown from "./Dropdown";
import "./Header.scss";

function Header({ toggleLogin, isDarkMode, toggleTheme, toggleTb, data }) {
  const tokenUser = useSelector((state) => state.user.account.tokenUser);

  return (
    <>
      <div className="laptop">
        <Nav className="nav" variant="pills">
          <div className="nav-logo">
            <Link
              style={{ cursor: "default" }}
              to={process.env.REACT_APP_FRONTEND}
            >
              <img className="logo" src={logo} alt="" />
            </Link>
          </div>
          <div className="d-flex nav-item">
            <Nav.Item className="nav-links">
              <Nav.Link className="nav-link" as={NavLink} to="/" eventKey="/">
                Trang chủ
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-links">
              <Nav.Link
                className="nav-link"
                as={NavLink}
                to="/gioithieu"
                eventKey="/gioithieu"
              >
                Giới thiệu
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-links">
              <Nav.Link
                className="nav-link"
                as={NavLink}
                to="/khoahoc"
                eventKey="/khoahoc"
              >
                Khoá học
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-links">
              <Nav.Link
                className="nav-link"
                as={NavLink}
                to="/luyentap"
                eventKey="/luyentap"
              >
                Luyện tập
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-links">
              <Nav.Link
                className="nav-link"
                as={NavLink}
                to="/diendan"
                eventKey="/diendan"
              >
                Diễn đàn
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-links">
              <Nav.Link
                className="nav-link"
                as={NavLink}
                to="/blog"
                eventKey="/blog"
              >
                Blog
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-links">
              <Nav.Link
                className="nav-link"
                as={NavLink}
                to="/sukien"
                eventKey="/sukien"
              >
                Sự kiện
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-links">
              <Nav.Link
                className="nav-link"
                as={NavLink}
                to="/tintuc"
                eventKey="/tintuc"
              >
                Tin tức
              </Nav.Link>
            </Nav.Item>
          </div>
          <div className="d-flex nav-mb">
            <Nav.Item className="nav-links">
              <Nav.Link>
                <i
                  className={`fa-solid ${isDarkMode ? "fa-sun" : "fa-moon"}`}
                  onClick={toggleTheme}
                ></i>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="nav-links">
              <Nav.Link>
                <i className="fa-solid fa-bell" onClick={toggleTb}>
                  <p className="bell">
                    {data?.filter((d) => d.isRead === false).length}
                  </p>
                </i>
              </Nav.Link>
            </Nav.Item>
            {tokenUser === "" ? (
              <Nav.Item className="nav-links nav-last">
                <Nav.Link
                  className="nav-link"
                  as={NavLink}
                  onClick={toggleLogin}
                >
                  Đăng nhập
                </Nav.Link>
              </Nav.Item>
            ) : (
              <UseDropdown />
            )}
          </div>
        </Nav>
      </div>

      <div className="mobile">
        <div className="d-flex nav-mb">
          <div className="nav-logo">
            <Link
              style={{ cursor: "default" }}
              to={process.env.REACT_APP_FRONTEND}
            >
              <img className="logo" src={logo} alt="" />
            </Link>
          </div>
          <div className="d-flex nav-item">
            <i
              className={`fa-solid ${isDarkMode ? "fa-sun" : "fa-moon"}`}
              onClick={toggleTheme}
            ></i>
            <i className="fa-solid fa-bell" onClick={toggleTb}>
              <p className="bell">
                {data?.filter((d) => d.isRead === false).length}
              </p>
            </i>

            {tokenUser === "" ? (
              <NavLink clasName="links" onClick={toggleLogin}>
                Đăng nhập
              </NavLink>
            ) : (
              <UseDropdown />
            )}
          </div>
        </div>

        <div className="nav-mb-bot">
          <NavLink className="bot-item" to="/">
            <i className="fa-solid fa-home"></i>
          </NavLink>
          <NavLink className="bot-item" to="/gioithieu">
            <i className="fa-solid fa-circle-info"></i>
          </NavLink>
          <NavLink className="bot-item" to="/khoahoc">
            <i className="fa-solid fa-book"></i>
          </NavLink>
          <NavLink className="bot-item" to="/luyentap">
            <i className="fa-solid fa-code"></i>
          </NavLink>
          <NavLink className="bot-item" to="/diendan">
            <i className="fa-solid fa-user-group"></i>
          </NavLink>
          <NavLink className="bot-item" to="/blog">
            <i className="fa-solid fa-blog"></i>
          </NavLink>
          <NavLink className="bot-item" to="/sukien">
            <i className="fa-solid fa-calendar-days"></i>
          </NavLink>
          <NavLink className="bot-item" to="/tintuc">
            <i className="fa-solid fa-newspaper"></i>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
