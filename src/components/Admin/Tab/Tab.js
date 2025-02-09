import React from "react";
import { NavLink } from "react-router-dom";
import "./Tab.scss";

const Tab = () => {
  return (
    <div className="tab">
      <div className="tab-items">
        <div className="tab-links">CNcode</div>
      </div>

      <NavLink className="tab-item" to="/admin/dashboard">
        <div className="tab-icon">
          <i className="fa-solid fa-house"></i>
        </div>
        <div className="tab-link">Tổng quan</div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/course">
        <div className="tab-icon">
          <i className="fa-solid fa-book"></i>
        </div>
        <div className="tab-link">Khoá học</div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/try">
        <div className="tab-icon">
          <i className="fa-solid fa-pen-nib"></i>
        </div>
        <div className="tab-link">Luyện tập</div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/forum">
        <div className="tab-icon">
          <i className="fa-solid fa-layer-group"></i>
        </div>
        <div className="tab-link">Diễn đàn</div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/blog">
        <div className="tab-icon">
          <i className="fa-solid fa-blog"></i>
        </div>
        <div className="tab-link">Blog</div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/events">
        <div className="tab-icon">
          <i className="fa-solid fa-calendar-days"></i>
        </div>
        <div className="tab-link">Sự kiện</div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/news">
        <div className="tab-icon">
          <i className="fa-solid fa-newspaper"></i>
        </div>
        <div className="tab-link">Tin tức</div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/themes">
        <div className="tab-icon">
          <i className="fa-solid fa-palette"></i>
        </div>
        <div className="tab-link">Giao diện</div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/bins">
        <div className="tab-icon">
          <i class="fa-solid fa-trash"></i>
        </div>
        <div className="tab-link">Thùng rác</div>
      </NavLink>

      <NavLink className="tab-item" to="/admin/settings">
        <div className="tab-icon">
          <i className="fa-solid fa-gear"></i>
        </div>
        <div className="tab-link">Cài đặt chung</div>
      </NavLink>
    </div>
  );
};

export default Tab;
