import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewsCreateValidate } from "../../../validates/NewsCreateValidate";
import { CreateBlog } from "../../../services/BlogAdminServer";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Editor from "../../Service/Editor";
import { Helmet, HelmetProvider } from "react-helmet-async";
import logo from "../../../assets/logo.png";
import "../News/News.scss";
import { BlogCreateValidate } from "../../../validates/BlogValidate";

function Create(props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [show, setShow] = useState("");
  const [description, setDescription] = useState();
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isModified, setIsModified] = useState(false);
  const [img, setImg] = useState();
  const authorId = useSelector((state) => state.user.account.id);

  const handleBack = () => {
    if (isModified) {
      const confirmExit = window.confirm(
        "Bạn có thay đổi chưa được lưu. Bạn có chắc chắn muốn thoát không?"
      );
      if (confirmExit) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const findFirstImage = (content) => {
      if (!content) return null;

      const regex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/;
      const match = content.match(regex);

      return match ? match[1] : null;
    };

    if (content) {
      const imageUrl = findFirstImage(content);
      setImg(imageUrl);
    }
  }, [content]);

  const handleActives = () => {
    setIsChecked(!isChecked);
    setIsModified(true);
  };

  const handleSubmitNews = async () => {
    const check = BlogCreateValidate(
      title,
      content,
      description,
      img,
      authorId
    );

    if (check === true) {
      setIsLoading(true);
      let data = await CreateBlog(
        title,
        isChecked,
        show,
        description,
        content,
        img,
        authorId
      );
      if (data && data.EC === 0) {
        toast.success(data.EM);
        setIsModified(false);
        navigate("/admin/blog");
      } else {
        toast.error(data.EM);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Tạo tin tức</title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>

      <div className="admin">
        <div className="header-create">
          <i className="fa-solid fa-arrow-left" onClick={handleBack}></i>
        </div>
        <div className="form-group grid">
          <input
            className="form-control"
            placeholder="Id bài viết*"
            disabled
          ></input>
          <input
            className="form-control"
            placeholder="Tiêu đề bài viết*"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsModified(true);
            }}
          ></input>
        </div>
        <div className="form-group grid-two">
          <input
            className="form-control"
            placeholder="Mô tả ngắn*"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setIsModified(true);
            }}
          ></input>
          <div className="form-control">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                value={isChecked}
                checked={isChecked}
                onChange={handleActives}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                {isChecked ? "Phát hành" : "Bản nháp"}
              </label>
            </div>
          </div>
          <select
            disabled={!isChecked}
            value={show}
            onChange={(e) => {
              setShow(e.target.value);
              setIsModified(true);
            }}
            className="form-control form-select"
            aria-label="Default select example"
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
            value={content}
            onChange={(value) => {
              setContent(value);
              setIsModified(true);
            }}
          />
        </div>
        <div className="btn-control btn btn-primary" onClick={handleSubmitNews}>
          {isLoading ? (
            <span>
              <i className="fa-solid fa-spinner fa-spin"></i> Đang xử lý...
            </span>
          ) : (
            "Đăng bài"
          )}
        </div>
      </div>
    </>
  );
}

export default Create;
