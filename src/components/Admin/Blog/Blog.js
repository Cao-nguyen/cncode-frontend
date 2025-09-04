import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../News/News.scss";
import BootstrapPagination from "../../Service/Pagination";
import logo from "../../../assets/logo.png";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  BlogDelete,
  BlogDuyet,
  BlogRead,
  BlogTuchoi,
} from "../../../services/BlogAdminServer";

function News(props) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleCreate = () => {
    navigate("/admin/blog/create");
  };

  const [blog, setBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const blogData = async () => {
      const data = await BlogRead();
      if (data && data.EC === 0) {
        setBlog(data.DT);
        setTotalItems(data.DT.length);
      }
    };
    blogData();
  }, []);

  const handleRefresh = async () => {
    const data = await BlogRead();
    if (data && data.EC === 0) {
      setBlog(data.DT);
      setTotalItems(data.DT.length);
    }
  };

  const [showDropdown, setShowDropdown] = useState(null);

  const handleAction = (id) => {
    setShowDropdown((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  const handleShow = (id) => {
    navigate(`/admin/blog/show/${id}`);
  };

  const handleDelete = async (id) => {
    const isCheck = window.confirm("Bạn có chắc chắn muốn xoá blog này không?");
    if (isCheck) {
      const data = await BlogDelete(id);
      if (data && data.EC === 0) {
        handleRefresh();
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    } else {
      setShowDropdown(false);
    }
  };

  const [showModel, setShowModel] = useState(false);
  const [idDuyet, setIdDuyet] = useState();

  const handleShowModel = (id) => {
    setShowModel(!showModel);
    setShowDropdown(!showDropdown);
    setIdDuyet(id);
  };

  const handleDuyet = async () => {
    const data = await BlogDuyet(idDuyet);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleRefresh();
    } else {
      toast.error(data.EM);
    }
  };
  const handleTuchoi = async () => {
    const data = await BlogTuchoi(idDuyet);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleRefresh();
    } else {
      toast.error(data.EM);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlog = blog.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Tin tức</title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href={logo} />
          <link rel="icon" href="uploads/img/18-01-2025/g354ky1ob557wmdz6sca" />
        </Helmet>
      </HelmetProvider>

      {showModel && (
        <div className="model" onClick={handleShowModel}>
          <div className="model-item">
            <h3>Duyệt bài viết do người dùng đăng</h3>
            <p>
              Vui lòng xem kỹ lại bài viết có:
              <br />- Sai lỗi chính tả
              <br />- Quy phạm tiêu chuẩn của cộng đồng
              <br />- Bài viết không có giá trị hoặc không đúng chủ đề
            </p>
            <div className="row">
              <div className="btn btn-primary" onClick={handleDuyet}>
                Đồng ý
              </div>
              <div className="btn btn-danger" onClick={handleTuchoi}>
                Từ chối
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="admin">
        <div className="admin-news">
          <div className="btn btn-primary" onClick={handleBack}>
            <i className="fa-solid fa-arrow-left"></i>
            Trở về
          </div>
          <div className="btn btn-primary" onClick={handleRefresh}>
            <i className="fa-solid fa-arrows-rotate"></i>
            Tải lại
          </div>
          <div className="btn btn-primary" onClick={handleCreate}>
            <i className="fa-solid fa-plus"></i>
            Thêm mới
          </div>
        </div>

        <div className="admin-content">
          <div className="admin-content-item">
            <p className="id">Id</p>
            <p className="title">Tiêu đề</p>
            <p className="right">Tác giả</p>
            <p className="actives">Trạng thái</p>
            <p className="show">Hiển thị</p>
            <p className="action"></p>
          </div>
          {currentBlog && currentBlog.length > 0 ? (
            currentBlog.map((item) => (
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
                    onClick={() => handleAction(item._id)}
                  ></i>
                  {showDropdown === item._id && (
                    <div className="dropdown">
                      <div
                        className="dropdown-links"
                        onClick={() => handleShow(item._id)}
                      >
                        <i className="fa-solid fa-eye"></i>
                        <div className="text">Xem trước</div>
                      </div>
                      <div
                        className="dropdown-links"
                        onClick={() => handleEdit(item._id)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                        <div className="text">Chỉnh sửa</div>
                      </div>
                      <div
                        className="dropdown-links"
                        onClick={() => handleDelete(item._id)}
                      >
                        <i className="fa-solid fa-delete-left"></i>
                        <div className="text">Xoá</div>
                      </div>
                      {item.active === "" && (
                        <div
                          className="dropdown-links"
                          style={{ color: "var(--xanh-login)" }}
                          onClick={() => handleShowModel(item._id)}
                        >
                          <i
                            className="fa-solid fa-circle-check"
                            style={{ color: "var(--xanh-login)" }}
                          ></i>
                          <div className="text">Trạng thái</div>
                        </div>
                      )}
                    </div>
                  )}
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
    </>
  );
}

export default News;
