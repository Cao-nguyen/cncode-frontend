import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import GoogleAd from "../GoogleAds/GoogleAds";

function Home(props) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Trang chủ </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>

      <div className="container">
        <GoogleAd adClient="ca-pub-5575086789438757" adSlot="8838378159" />
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
