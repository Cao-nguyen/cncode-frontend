import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { MeblogClientRead } from "../../../services/BlogClientServer";
import "./Blog.scss";
import { Link } from "react-router-dom";

function MeBlog(props) {
  const fullName = useSelector((state) => state.user.account.fullName);
  const id = useSelector((state) => state.user.account.id);

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      const data = await MeblogClientRead(id);

      if (data && data.EC === 0) {
        setBlog(data.DT);
      }
    };

    getBlog();
  }, [id]);

  const handleEdit = () => {};
  const handleDelete = () => {};

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
      <div className="container">
        {blog.length > 0 ? (
          <div className="MeBlog-Container">
            {blog.map((item, index) => (
              <div className="MeBlog" key={index}>
                <div className="MeBlog-Left">
                  <Link to={`/blog/${item.slug}`}>
                    <img src={item.img} alt=""></img>
                  </Link>
                </div>
                <div className="MeBlog-Right">
                  <Link to={`/blog/${item.slug}`}>
                    <h3>{item.title}</h3>
                  </Link>
                  <p>{item.description}</p>
                  {item.active ? (
                    <p className="activeTrue">Đã duyệt</p>
                  ) : (
                    <p className="activeFalse">Chờ duyệt</p>
                  )}
                  <div className="action">
                    <Link className="edit" to={`/blog/${item.slug}`}>
                      Xem chi tiết
                    </Link>
                    <Link className="edit" onClick={() => handleEdit(item._id)}>
                      Chỉnh sửa
                    </Link>
                    <Link
                      className="edit"
                      onClick={() => handleDelete(item._id)}
                    >
                      Xoá bài viết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="container" style={{ marginBottom: "350px" }}>
            <p className="text-center">Bạn chưa xuất bản bài viết nào hết...</p>
          </div>
        )}
      </div>
    </>
  );
}

export default MeBlog;
