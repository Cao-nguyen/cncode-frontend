import React from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";

function Blog(props) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Blog </title>
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

export default Blog;
