import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { MeblogClientRead } from "../../../services/BlogClientServer";
import BootstrapPagination from "../../Service/Pagination";
import "./Blog.scss";
import { useNavigate } from "react-router-dom";

function MeBlog(props) {
  const navigate = useNavigate();
  const fullName = useSelector((state) => state.user.account.fullName);
  const id = useSelector((state) => state.user.account.id);

  const [blog, setBlog] = useState([]);
  const [itemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleShow = (slug) => {
    navigate(`/blog/${slug}`);
  };

  useEffect(() => {
    if (id) {
      const getBlog = async () => {
        const data = await MeblogClientRead(id);

        if (data && data.EC === 0) {
          setBlog(data.DT);
          setTotalItems(data.DT.length);
        }
      };

      getBlog();
    } else {
      setBlog([]);
    }
  }, [id]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlog = blog.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

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
            <div className="admin-content">
              <div className="admin-content-item">
                <p className="id">Id</p>
                <p className="title">Tiêu đề</p>
                <p className="right">Tác giả</p>
                <p className="actives">Trạng thái</p>
                <p className="show">Hiển thị</p>
                <p className="action"></p>
              </div>
              {currentBlog && currentBlog?.length > 0 ? (
                currentBlog?.map((item) => (
                  <div className="admin-content-item" key={item._id}>
                    <p className="id">{item._id}</p>
                    <p className="title">{item.title}</p>
                    <p className="right">{item?.authorId?.fullName}</p>
                    <p className="actives">
                      {item.active === "" && "Chờ duyệt"}
                      {item.active === "chapnhan" && "Đã duyệt"}
                      {item.active === "tuchoi" && "Bị từ chối"}
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
                <div>Không có bài viết nào!</div>
              )}
            </div>
            <div className="paginate mt-3">
              <BootstrapPagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
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
