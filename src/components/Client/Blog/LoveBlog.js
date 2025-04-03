import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BlogClientRead } from "../../../services/BlogClientServer";
import { useNavigate } from "react-router-dom";

function LoveBlog() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.account.id);
  const [blog, setBlog] = useState([]);

  const BlogReadData = async () => {
    const data = await BlogClientRead();

    if (data) {
      setBlog(data.DT);
    }
  };

  useEffect(() => {
    BlogReadData();
  }, []);

  const lovedBlogs = blog.filter((item) =>
    item.favorites.some((favorite) => favorite.userFavorite === id)
  );

  const handleShow = (slug) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <div className="container">
      <div className="admin-content mt-5">
        <div className="admin-content-item">
          <p className="id">Id</p>
          <p className="title">Tiêu đề</p>
          <p className="right">Tác giả</p>
          <p className="actives">Trạng thái</p>
          <p className="show">Hiển thị</p>
          <p className="action"></p>
        </div>
        {lovedBlogs && lovedBlogs.length > 0 ? (
          lovedBlogs.map((item) => (
            <div className="admin-content-item" key={item._id}>
              <p className="id">{item._id}</p>
              <p className="title">{item.title}</p>
              <p className="right">{item?.authorId?.fullName}</p>
              <p className="actives">
                {item.isChecked ? "Phát hành" : "Bản nháp"}
              </p>
              <p className="show">
                {item.show ? "Công khai" : "Không công khai"}
              </p>
              <p className="action">
                <i
                  className="btn btn-primary fa-solid fa-ellipsis-vertical"
                  onClick={() => handleShow(item.slug)}
                ></i>
              </p>
            </div>
          ))
        ) : (
          <div>Không có bài viết nào bạn yêu thích!</div>
        )}
      </div>
    </div>
  );
}

export default LoveBlog;
