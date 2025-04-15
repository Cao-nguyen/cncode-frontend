import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSelector } from "react-redux";
import logo from "../../../assets/logo.png";

function Dashboard() {
  const fullName = useSelector((state) => state.user.account.fullName);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Tổng quan </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <div className="admin text-center">
        <h1>Trang quản trị</h1>
        <p>Chào mừng {fullName} đã quay trở lại với trang quản trị.</p>
      </div>
    </>
  );
}

export default Dashboard;
