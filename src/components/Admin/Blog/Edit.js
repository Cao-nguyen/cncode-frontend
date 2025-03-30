import React, { useEffect, useState } from "react";
import { BlogRead, BlogEdit } from "../../../services/BlogAdminServer";
import Editor from "../../Service/Editor";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";
import logo from "../../../assets/logo.png";
import "../News/News.scss";

function Edit(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [currentBlog, setCurrentBlog] = useState({});
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const blogData = async () => {
      const data = await BlogRead();
      setBlog(data.DT);
    };

    blogData();
  }, []);

  const handleBack = () => {
    if (isEdited) {
      const confirmExit = window.confirm(
        "Bạn có thay đổi chưa lưu. Bạn muốn rời khỏi mà không lưu không?"
      );
      if (!confirmExit) {
        return;
      }
    }
    navigate(-1);
  };

  useEffect(() => {
    if (blog.length > 0) {
      const selectedNews = blog.find((item) => item._id === id);
      setCurrentBlog(selectedNews || null);
    }
  }, [id, blog]);

  const [isLoading, setIsLoading] = useState();

  const handleEdit = async () => {
    setIsLoading(true);
    const updatedNews = {
      id: currentBlog._id,
      title: currentBlog.title,
      description: currentBlog.description,
      isChecked: currentBlog.isChecked,
      show: currentBlog.show,
      content: currentBlog.content,
    };

    let data = await BlogEdit(
      updatedNews.id,
      updatedNews.title,
      updatedNews.description,
      updatedNews.isChecked,
      updatedNews.show,
      updatedNews.content
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/admin/blog");
    } else {
      toast.error(data.EM);
    }
    setIsLoading(false);
    setIsEdited(false);
  };

  return (
    <div className="admin">
      <HelmetProvider>
        <Helmet>
          <title>CNcode | {`${currentBlog.title}`}</title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href={logo} />
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      <div className="header-create">
        <i className="fa-solid fa-arrow-left" onClick={handleBack}></i>
      </div>
      <div className="form-group grid">
        <input
          className="form-control"
          placeholder="Id bài viết*"
          disabled
          value={currentBlog._id}
        ></input>
        <input
          className="form-control"
          placeholder="Tiêu đề bài viết*"
          value={currentBlog.title || ""}
          onChange={(e) => {
            setCurrentBlog({ ...currentBlog, title: e.target.value });
            setIsEdited(true);
          }}
        ></input>
      </div>
      <div className="form-group grid">
        <input
          className="form-control"
          placeholder="Tác giả*"
          disabled
          value={currentBlog?.authorId?.fullName}
        ></input>
        <input
          className="form-control"
          placeholder="Slug*"
          value={currentBlog.slug || ""}
          onChange={(e) => {
            setCurrentBlog({ ...currentBlog, slug: e.target.value });
            setIsEdited(true);
          }}
        ></input>
      </div>
      <div className="form-group grid-two">
        <input
          className="form-control"
          placeholder="Mô tả ngắn*"
          value={currentBlog.description}
          onChange={(e) => {
            setCurrentBlog({ ...currentBlog, description: e.target.value });
            setIsEdited(true);
          }}
        ></input>
        <div className="form-control">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={currentBlog.isChecked}
              onChange={(e) => {
                setCurrentBlog({ ...currentBlog, isChecked: e.target.checked });
                setIsEdited(true);
              }}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              {currentBlog.isChecked ? "Phát hành" : "Bản nháp"}
            </label>
          </div>
        </div>
        <select
          value={currentBlog.show ?? ""}
          onChange={(e) => {
            setCurrentBlog({ ...currentBlog, show: e.target.value === "true" });
            setIsEdited(true);
          }}
          className="form-control form-select"
        >
          <option value="" disabled>
            Chọn hiển thị
          </option>
          <option value="true">Công khai</option>
          <option value="false">Riêng tư</option>
        </select>
      </div>
      <div className="form-content">
        <Editor
          value={currentBlog.content}
          onChange={(newContent) => {
            setCurrentBlog({ ...currentBlog, content: newContent });
            setIsEdited(true);
          }}
        />
      </div>
      <div className="btn-control btn btn-primary" onClick={handleEdit}>
        {isLoading ? (
          <span>
            <i className="fa-solid fa-spinner fa-spin"></i> Đang xử lý...
          </span>
        ) : (
          "Đăng bài"
        )}
      </div>
    </div>
  );
}

export default Edit;
