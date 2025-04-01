import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./Tab.scss";

const Tab = () => {
  return (
    <div className="tab">
      <div className="tab-items">
        <div className="tab-icon">
          <img src={logo} alt=""></img>
        </div>
        <div className="tab-links">CNcode</div>
      </div>

      <NavLink className="tab-item" to="/admin/dashboard">
        <div className="tab-icon">
          <i className="fa-solid fa-house"></i>
          <div className="tab-link">Trang tổng quan</div>
        </div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/course">
        <div className="tab-icon">
          <i className="fa-solid fa-book"></i>
          <div className="tab-link">Quản lí khoá học</div>
        </div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/try">
        <div className="tab-icon">
          <i className="fa-solid fa-pen-nib"></i>
          <div className="tab-link">Quản lí luyện tập</div>
        </div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/forum">
        <div className="tab-icon">
          <i className="fa-solid fa-layer-group"></i>
          <div className="tab-link">Diễn đàn học tập</div>
        </div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/blog">
        <div className="tab-icon">
          <i className="fa-solid fa-blog"></i>
          <div className="tab-link">Quản lí bài viết</div>
        </div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/events">
        <div className="tab-icon">
          <i className="fa-solid fa-calendar-days"></i>
          <div className="tab-link">Quản lí sự kiện</div>
        </div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/news">
        <div className="tab-icon">
          <i className="fa-solid fa-newspaper"></i>
          <div className="tab-link">Quản lí tin tức</div>
        </div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/themes">
        <div className="tab-icon">
          <i className="fa-solid fa-palette"></i>
          <div className="tab-link">Thay đổi giao diện</div>
        </div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/transaction">
        <div className="tab-icon">
          <i className="fa-solid fa-coins"></i>
          <div className="tab-link">Quản lí giao dịch</div>
        </div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/account">
        <div className="tab-icon">
          <i className="fa-solid fa-user"></i>
          <div className="tab-link">Quản lí tài khoản</div>
        </div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/bins">
        <div className="tab-icon">
          <i className="fa-solid fa-trash"></i>
          <div className="tab-link">Bài viết đã xoá</div>
        </div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/settings">
        <div className="tab-icon">
          <i className="fa-solid fa-gear"></i>
          <div className="tab-link">Cài đặt chung</div>
        </div>
      </NavLink>
    </div>
  );
};

export default Tab;
