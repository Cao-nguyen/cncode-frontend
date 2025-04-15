import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import PostEditor from "../../Service/postEditor";
import "./Blog.scss";
import { useNavigate } from "react-router-dom";
import UseDropdown from "../Header/Dropdown";
import { useSelector } from "react-redux";
import { BlogCreateValidate } from "../../../validates/BlogValidate";
import { BlogClientCreate } from "../../../services/BlogClientServer";
import { toast } from "react-toastify";

function PostBlog() {
  const navigate = useNavigate();

  const id = useSelector((state) => state.user.account.id);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [description, setDescription] = useState();
  const [show, setShow] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [img, setImg] = useState();

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

  const handleBack = () => {
    if (isModified) {
      const data = window.confirm(
        "Nội dung chưa được lưu, bạn có chắc chắn muốn thoát"
      );

      if (data) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const postCreate = async () => {
    const check = BlogCreateValidate(title, content, description, img, id);

    if (check === true) {
      const data = await BlogClientCreate(
        title,
        content,
        description,
        show,
        isChecked,
        img,
        id
      );

      if (data && data.EC === 0) {
        const data = window.confirm(
          "Bạn cần phải đợi Quản trị viên duyệt bài viết!"
        );
        if (data) {
          toast.success(data.EM);
          navigate("/me/blog");
        } else {
          navigate("/me/blog");
        }
      } else {
        toast.error(data.EM);
      }
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{!title ? "CNcode | Viết Blog" : `CNcode | ${title}`} </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>
      <div className="postBlog">
        <div className="headerPostBlog">
          <div className="back" onClick={handleBack}>
            <i className="fa-solid fa-arrow-left"></i>
            Trở về
          </div>
          <div className="headerRight">
            <div className="btn btn-primary" onClick={postCreate}>
              Xuất bản
            </div>
            <UseDropdown />
          </div>
        </div>
        <div className="bodyPostBlog">
          <input
            className="input-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setIsModified(true);
            }}
            placeholder="Tiêu đề*"
          ></input>
          <div className="grid-3">
            <input
              className="form-control mt-1 mb-3"
              placeholder="Mô tả*"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setIsModified(true);
              }}
            ></input>

            <div className="form-control mt-1 mb-3">
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
              className="form-control form-select mt-1 mb-3"
              aria-label="Default select example"
            >
              <option value="" disabled>
                Chọn hiển thị
              </option>
              <option value="true">Công khai</option>
              <option value="false">Riêng tư</option>
            </select>
          </div>
          <PostEditor value={content} onChange={setContent} />
        </div>
      </div>
    </>
  );
}

export default PostBlog;
