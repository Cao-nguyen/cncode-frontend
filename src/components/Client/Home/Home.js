import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

function Home(props) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Phúc Lộc Thọ | Trang chủ</title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin onlineonline"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>

      <div className="container">
        <h1 className="text-center mt-5 text-primary">
          CNcode - Nền tảng học lập trình miễn phí
        </h1>
        <h3 className="text-center">Dự án được phát triển bởi Lý Cao Nguyên</h3>

        <h1 className="text-center mt-5 text-primary">
          CNcode - Nền tảng học lập trình miễn phí
        </h1>
        <h3 className="text-center">Dự án được phát triển bởi Lý Cao Nguyên</h3>

        <h1 className="text-center mt-5 text-primary">
          CNcode - Nền tảng học lập trình miễn phí
        </h1>
        <h3 className="text-center">Dự án được phát triển bởi Lý Cao Nguyên</h3>

        <h1 className="text-center mt-5 text-primary">
          CNcode - Nền tảng học lập trình miễn phí
        </h1>
        <h3 className="text-center">Dự án được phát triển bởi Lý Cao Nguyên</h3>

        <h1 className="text-center mt-5 text-primary">
          CNcode - Nền tảng học lập trình miễn phí
        </h1>
        <h3 className="text-center">Dự án được phát triển bởi Lý Cao Nguyên</h3>

        <h1 className="text-center mt-5 text-primary">
          CNcode - Nền tảng học lập trình miễn phí
        </h1>
        <h3 className="text-center">Dự án được phát triển bởi Lý Cao Nguyên</h3>
      </div>
    </>
  );
}

export default Home;
