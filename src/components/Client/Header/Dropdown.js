import React from "react";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import HandleLogout from "../../../middlewares/LogoutMiddleware";

function UseDropdown() {
  const fullName = useSelector((state) => state.user.account.fullName);
  const username = useSelector((state) => state.user.account.username);
  const role = useSelector((state) => state.user.account.role);

  const { Logout } = HandleLogout();

  return (
    <Dropdown>
      <Dropdown.Toggle as="div" className="custom-dropdown-toggle">
        <div className="greeting">Xin chào</div>
        <div className="user-name">{fullName}</div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>
          <NavLink className="dropdown-link" to={`/p/${username}`}>
            Trang cá nhân
          </NavLink>
        </Dropdown.Item>
        {role === "admin" && (
          <Dropdown.Item>
            <NavLink className="dropdown-link" to="/admin/dashboard">
              Trang quản trị
            </NavLink>
          </Dropdown.Item>
        )}
        {role === "teacher" && (
          <Dropdown.Item>
            <NavLink className="dropdown-link" to="/quanly">
              Trang quản lý
            </NavLink>
          </Dropdown.Item>
        )}
        <Dropdown.Divider />
        <Dropdown.Item>
          <NavLink className="dropdown-link" to="/me/khoahoc">
            Khoá học của tôi
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink className="dropdown-link" to="/me/khuvuon">
            Quản lí giao dịch
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink className="dropdown-link" to="/me/khuvuon">
            Khu vườn trên mây
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <NavLink className="dropdown-link" to="/me/post">
            Viết Blog
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink className="dropdown-link" to="/me/blog">
            Blog của tôi
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink className="dropdown-link" to="/me/loveblog">
            Blog yêu thích
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <NavLink className="dropdown-link" to="/me/settings">
            Cài đặt
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink className="dropdown-link-logout" onClick={Logout}>
            Đăng xuất
          </NavLink>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UseDropdown;
