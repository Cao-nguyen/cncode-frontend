import React, { useState } from "react";
import Exam from "../../Service/Exam";
import "./Contest.scss";

function CreateContest() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    level: 0,
    authorId: "",
    openTime: "",
    closeTime: "",
    time: "",
    password: "",
    show: "",
  });

  const [show, setShow] = useState(false);

  const [content, setContent] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(show);

  return (
    <>
      <div className="create-contest">
        <div className="create-contest-left">
          <div className="form-group-contest">
            <h5>Thông tin chung</h5>
            <input
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tên bài luyện tập*"
            ></input>
            <textarea
              style={{ height: "100px" }}
              className="form-control mt-3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả bài luyện tập*"
            ></textarea>
            <select
              className="form-control mt-3"
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value={0} disabled>
                Chọn mức độ bài luyện tập
              </option>
              <option value={1}>Dễ</option>
              <option value={2}>Trung bình</option>
              <option value={3}>Khó</option>
              <option value={4}>Rất khó</option>
            </select>
            <label style={{ fontWeight: "bold" }} className="mt-3">
              Thời gian mở đề
            </label>
            <input
              className="form-control mt-1"
              type="datetime-local"
              name="openTime"
              value={formData.openTime}
              onChange={handleChange}
            ></input>
            <label style={{ fontWeight: "bold" }} className="mt-3">
              Thời gian đóng đề
            </label>
            <input
              className="form-control mt-1"
              type="datetime-local"
              name="closeTime"
              value={formData.closeTime}
              onChange={handleChange}
            ></input>
            <input
              className="form-control mt-3"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Thời gian làm bài (tính theo phút)*"
            ></input>
            <input
              className="form-control mt-3"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mật khẩu bài luyện tập*"
            ></input>
            <select
              className="form-control mt-3"
              name="show"
              value={formData.show}
              onChange={handleChange}
            >
              <option value={0} disabled>
                Chế độ hiển thị
              </option>
              <option value={true}>Công khai</option>
              <option value={false}>Không công khai</option>
            </select>
          </div>
          <div className="write-contest">
            <div
              className="btn btn-secondary mt-3"
              onClick={() => setShow(true)}
            >
              <i className="fa-solid fa-circle-question"></i> Hướng dẫn soạn đề
            </div>
            <Exam />
          </div>
        </div>
        <div className="create-contest-right"></div>
      </div>

      {show && (
        <div className="over-contest">
          <div className="over-contest-item">
            <i className="fa-solid fa-xmark" onClick={() => setShow(false)}></i>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateContest;
