import React, { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

function MeBlog(props) {
  const fullName = useSelector((state) => state.user.account.fullName);
  const username = useSelector((state) => state.user.account.username);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Blog của {fullName} </title>
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

export default MeBlog;
