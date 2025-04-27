import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

function Luyentap(props) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Luyện tập </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>
      <div className="container">
        <p className="text-center mt-5">Tính năng đang được phát triển...</p>
      </div>
    </>
  );
}

export default Luyentap;
