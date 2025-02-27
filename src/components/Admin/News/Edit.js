import React, { useEffect, useState } from "react";
import { ShowNew, EditNew } from "../../../services/NewsAdminServer";
import Editor from "../../Service/Editor";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./News.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";
import logo from "../../../assets/logo.png";

function Edit(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [news, setNews] = useState([]);
  const [currentNews, setCurrentNews] = useState({});
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const newsData = async () => {
      const data = await ShowNew();
      setNews(data.DT);
    };

    newsData();
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
    if (news.length > 0) {
      const selectedNews = news.find((item) => item._id === id);
      setCurrentNews(selectedNews || null);
    }
  }, [id, news]);

  const [isLoading, setIsLoading] = useState();

  const handleEdit = async () => {
    setIsLoading(true);
    const updatedNews = {
      id: currentNews._id,
      title: currentNews.title,
      description: currentNews.description,
      isChecked: currentNews.isChecked,
      show: currentNews.show,
      content: currentNews.content,
    };
    let data = await EditNew(
      updatedNews.id,
      updatedNews.title,
      updatedNews.description,
      updatedNews.isChecked,
      updatedNews.show,
      updatedNews.content
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/admin/news");
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
          <title>CNcode | {`${currentNews.title}`}</title>
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
          value={currentNews._id}
        ></input>
        <input
          className="form-control"
          placeholder="Tiêu đề bài viết*"
          value={currentNews.title || ""}
          onChange={(e) => {
            setCurrentNews({ ...currentNews, title: e.target.value });
            setIsEdited(true);
          }}
        ></input>
      </div>
      <div className="form-group grid">
        <input
          className="form-control"
          placeholder="Tác giả*"
          disabled
          value={currentNews.fullName}
        ></input>
        <input
          className="form-control"
          placeholder="Slug*"
          value={currentNews.slug || ""}
          onChange={(e) => {
            setCurrentNews({ ...currentNews, slug: e.target.value });
            setIsEdited(true);
          }}
        ></input>
      </div>
      <div className="form-group grid-two">
        <input
          className="form-control"
          placeholder="Mô tả ngắn*"
          value={currentNews.description}
          onChange={(e) => {
            setCurrentNews({ ...currentNews, description: e.target.value });
            setIsEdited(true);
          }}
        ></input>
        <div className="form-control">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={currentNews.isChecked}
              onChange={(e) => {
                setCurrentNews({ ...currentNews, isChecked: e.target.checked });
                setIsEdited(true);
              }}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              {currentNews.isChecked ? "Phát hành" : "Bản nháp"}
            </label>
          </div>
        </div>
        <select
          value={currentNews.show ?? ""}
          onChange={(e) => {
            setCurrentNews({ ...currentNews, show: e.target.value === "true" });
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
          value={currentNews.content}
          onChange={(newContent) => {
            setCurrentNews({ ...currentNews, content: newContent });
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
