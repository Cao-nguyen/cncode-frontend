import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BlogClientRead } from "../../../services/BlogClientServer";
import moment from "moment/moment";
import "./Blog.scss";

function Blog(props) {
  const [blog, setBlog] = useState();

  const BlogReadData = async () => {
    const data = await BlogClientRead();

    if (data) {
      setBlog(data.DT);
    }
  };

  useEffect(() => {
    BlogReadData();
  }, []);

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
      <div className="container">
        <div className="blog">
          {blog &&
            blog.map((item, index) => (
              <div className="blog-item" key={index}>
                <Link to={item.slug}>
                  <img src={item.img} alt={item.title} />
                  <div className="date">
                    <p className="date-one">
                      {moment(item.createdAt).format("DD - MM")}
                    </p>
                    <p className="date-year">
                      {moment(item.createdAt).format("YYYY")}
                    </p>
                  </div>
                </Link>
                <div className="blog-content">
                  <Link to={item.slug}>
                    <p className="blog-title">{item.title}</p>
                    <p className="blog-description">{item.description}</p>
                  </Link>
                </div>
                <div className="blog-user">
                  <div className="blogUser-avatar">
                    <img
                      src={item?.authorId?.avatar}
                      alt={item?.authorId?.fullName}
                    ></img>
                  </div>
                  <div className="blogUser-fullName">
                    <p>{item?.authorId?.fullName}</p>
                    {item?.authorId?.role === "admin" && (
                      <p className="blogUser-role">Quản trị viên</p>
                    )}
                    {item?.authorId?.role === "user" && (
                      <p className="blogUser-role">Người dùng</p>
                    )}
                    {item?.authorId?.role === "teacher" && (
                      <p className="blogUser-role">Giáo viên</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Blog;
