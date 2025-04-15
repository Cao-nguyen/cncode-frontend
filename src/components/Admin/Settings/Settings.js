import React, { useEffect } from "react";
import "./Settings.scss";
import { NavLink } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import logo from "../../../assets/logo.png";

function Settings(props) {
  return (
    <div className="admin">
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Cài đặt chung</title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>

      <div className="tabs">
        <div className="tab">
          <h3>Thông tin giới thiệu</h3>
          <NavLink to="/admin/settings/infor">
            <i className="fa-solid fa-list-check"></i>
          </NavLink>
        </div>

        <div className="tab">
          <h3>Quản lý banner</h3>
          <NavLink to="/admin/settings/banner">
            <i className="fa-solid fa-list-check"></i>
          </NavLink>
        </div>

        <div className="tab">
          <h3>Phân quyền quản trị</h3>
          <NavLink to="/admin/settings/role">
            <i className="fa-solid fa-list-check"></i>
          </NavLink>
        </div>

        <div className="tab">
          <h3>Bách hoá vật phẩm</h3>
          <NavLink to="/admin/settings/shop">
            <i className="fa-solid fa-list-check"></i>
          </NavLink>
        </div>

        <div className="tab">
          <h3>Khu vườn trên mây</h3>
          <NavLink to="/admin/settings/opinion">
            <i className="fa-solid fa-list-check"></i>
          </NavLink>
        </div>

        <div className="tab">
          <h3>Góp ý của người dùng</h3>
          <NavLink to="/admin/settings/opinion">
            <i className="fa-solid fa-list-check"></i>
          </NavLink>
        </div>

        <div className="tab">
          <h3>Tặng quà người dùng</h3>
          <NavLink to="/admin/settings/gift">
            <i className="fa-solid fa-list-check"></i>
          </NavLink>
        </div>

        <div className="tab">
          <h3>Chính sách bảo mật</h3>
          <NavLink to="/admin/settings/ssl">
            <i className="fa-solid fa-list-check"></i>
          </NavLink>
        </div>

        <div className="tab">
          <h3>Điều khoản sử dụng</h3>
          <NavLink to="/admin/settings/use">
            <i className="fa-solid fa-list-check"></i>
          </NavLink>
        </div>

        <div className="tab">
          <h3>Chính sách thành viên</h3>
          <NavLink to="/admin/settings/members">
            <i className="fa-solid fa-list-check"></i>
          </NavLink>
        </div>

        <div className="tab">
          <h3>Cài đặt website</h3>
          <NavLink to="/admin/settings/website">
            <i className="fa-solid fa-list-check"></i>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Settings;
