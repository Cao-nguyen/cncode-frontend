import React, { useEffect, useState } from "react";
import Editor from "../../Service/Editor";
import "./Course.scss";
import { toast } from "react-toastify";
import {
  CourseAdminCreate,
  CourseAdminRead,
} from "../../../services/CourseAdminServer";
import socket from "../../Service/socket";

function Course() {
  const [showAdd, setShowAdd] = useState("");
  const [image_url, setImage_url] = useState();
  const [title, setTitle] = useState();
  const [slug, setSlug] = useState();
  const [user_progress, setUser_progress] = useState();
  const [show, setShow] = useState("");
  const [price, setPrice] = useState();
  const [old_price, setOld_price] = useState();
  const [type, setType] = useState("");
  const [description, setDescription] = useState();

  const [course, setCourse] = useState();

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET);
    formData.append("folder", "uploads/course");

    toast.info("Đang tải ảnh lên...");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setImage_url(data.secure_url);
    toast.success("Thành công!");
  };

  useEffect(() => {
    if (!title) {
      setSlug("");
      return;
    }

    const slug = title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

    setSlug(slug);
  }, [title]);

  const getData = async () => {
    const data = await CourseAdminRead();

    if (data && data.EC === 0) {
      setCourse(data.DT);
    }
  };

  useEffect(() => {
    getData();

    socket.on("pushCourse", () => {
      getData();
    });

    return () => {
      socket.off("pushCourse");
    };
  }, []);

  const handlePushCourse = async () => {
    if (
      !image_url ||
      !title ||
      !slug ||
      !user_progress ||
      !show ||
      !price ||
      !old_price ||
      !type ||
      !description
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const data = await CourseAdminCreate(
      image_url,
      title,
      slug,
      user_progress,
      show,
      price,
      old_price,
      type,
      description
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setImage_url("");
      setTitle("");
      setSlug("");
      setUser_progress("");
      setShow("");
      setPrice("");
      setOld_price("");
      setType("");
      setDescription("");
      setShowAdd("");
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <div className="admin">
      <div className="action">
        <div className="btn btn-primary" onClick={() => setShowAdd("create")}>
          <i className="fa-solid fa-plus"></i> Thêm khoá học
        </div>
      </div>

      <div className="course">
        {course?.map((item) => (
          <div className="course-item" key={item?._id}>
            <img src={item?.image_url} alt=""></img>
            <p>{item?.title}</p>
            <div className="action">
              <i className="fa-solid fa-circle-plus"></i>
              <i className="fa-solid fa-edit"></i>
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>
        ))}
      </div>

      {showAdd === "create" && (
        <div className="form-choose">
          <p style={{ cursor: "pointer" }} onClick={() => setShowAdd("")}>
            Đóng
          </p>
          <h3>Tạo khoá học</h3>
          <div className="form-create-course">
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e.target.files[0])}
            ></input>
          </div>

          <div className="grid2 form-create-course">
            <input
              className="form-control"
              placeholder="Tên khoá học*"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              disabled
              className="form-control"
              placeholder=".../duong-dan"
              value={slug}
            />
          </div>

          <div className="grid2 form-create-course">
            <input
              className="form-control"
              placeholder="Phần trăm cần hoàn thành*"
              value={user_progress}
              onChange={(e) => setUser_progress(e.target.value)}
            />
            <select
              className="form-control"
              value={show}
              onChange={(e) => setShow(e.target.value)}
            >
              <option disabled value="">
                Trạng thái
              </option>
              <option value="true">Phát hành</option>
              <option value="false">Chưa phát hành</option>
            </select>
          </div>

          <div className="grid3 form-create-course">
            <input
              className="form-control"
              placeholder="Giá cũ"
              value={old_price}
              onChange={(e) => setOld_price(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Giá mới"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <select
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option disabled value="">
                Chọn loại khoá học
              </option>
              <option value="false">Khoá học free</option>
              <option value="true">Khoá học pro</option>
            </select>
          </div>

          <div className="form-create-course">
            <div className="form-control">
              <label>Mô tả khoá học*</label>
              <Editor value={description} onChange={setDescription} />
            </div>
          </div>

          <div className="form-create-course">
            <div className="btn btn-primary mt-3" onClick={handlePushCourse}>
              Tạo khoá học
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Course;
