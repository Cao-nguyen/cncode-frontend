import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

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
      <div className="container"></div>
    </>
  );
}

export default Sukien;
