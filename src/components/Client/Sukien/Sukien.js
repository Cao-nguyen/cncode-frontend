import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function Sukien(props) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Sự kiện </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>
      <div className="container">
        <p className="text-center mt-5">Do việc học tập nên admin chưa có thời gian phát triển tính năng này.</p>
        <p className="text-center mt-5">Khoá học khai giảng đầu tiên bắt đầu vào ngày 15/6/2025</p>
        <p className="text-center mt-5">Dự kiến tính năng luyện tập được hoàn thành trước ngày 15/6/2025</p>
        <p className="text-center mt-5">
          Bạn có thể liên hệ admin để biết thêm chi tiết{" "}
          <Link to="https://zalo.me/0394217863" target="_blank" rel="noopener noreferrer">
            Qua zalo
          </Link>
        </p>
      </div>
    </>
  );
}

export default Sukien;
