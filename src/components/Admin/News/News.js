import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteNew, ShowNew } from "../../../services/NewsAdminServer";
import { toast } from "react-toastify";
import "./News.scss";
import BootstrapPagination from "../../Service/Pagination";
import logo from "../../../assets/logo.png";
import { Helmet, HelmetProvider } from "react-helmet-async";

function News(props) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCreate = () => {
    navigate("/admin/news/create");
  };

  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const newsData = async () => {
      const data = await ShowNew();
      if (data && data.EC === 0) {
        setNews(data.DT);
        setTotalItems(data.DT.length);
      }
    };
    newsData();
  }, []);

  const handleRefresh = async () => {
    const data = await ShowNew();
    if (data && data.EC === 0) {
      setNews(data.DT);
      setTotalItems(data.DT.length);
    }
  };

  const [showDropdown, setShowDropdown] = useState(null);

  const handleAction = (id) => {
    setShowDropdown((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id) => {
    navigate(`/admin/news/edit/${id}`);
  };

  const handleShow = (id) => {
    navigate(`/admin/news/show/${id}`);
  };

  const handleDelete = async (id) => {
    const isCheck = window.confirm(
      "Bạn có chắc chắn muốn xoá tin tức này không?"
    );
    if (isCheck) {
      const data = await DeleteNew(id);
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = news.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="admin">
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
        {currentNews && currentNews.length > 0 ? (
          currentNews.map((item) => (
            <div className="admin-content-item" key={item._id}>
              <p className="id">{item._id}</p>
              <p className="title">{item.title}</p>
              <p className="right">{item.authorId?.fullName}</p>
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
  );
}

export default News;
