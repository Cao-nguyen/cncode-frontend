import React, { useEffect, useRef, useState } from "react";
import "./Contest.scss";
import moment from "moment/moment";
import {
  ContestAdminCreate,
  ContestAdminRead,
} from "../../../services/ContestAdminServer";
import { toast } from "react-toastify";
import Exam from "../../Service/Exam";

function Contest() {
  const [showForm, setShowForm] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    level: 1,
    openTime: "",
    closeTime: "",
    slug: "",
    password: "",
    show: "",
    time: "",
  });
  const [newForm, setNewForm] = useState();
  const [exam, setExam] = useState([]);

  const [content, setContent] = useState("");
  const [type, setType] = useState("");

  const [timer, setTimer] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "name") {
      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(() => {
        if (value) {
          const slug = value
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9 ]/g, "")
            .replace(/\s+/g, "-");

          const date = new Date();
          const newSlug = `${slug}-${moment(date).format("DDMMYYYYHHmmss")}`;
          setForm((prev) => ({ ...prev, slug: newSlug }));
        }
      }, 500);

      setTimer(newTimer);
    }
  };

  const handlePushContest = async () => {
    if (!form.name || !form.level || !form.description || !form.show) {
      toast.error("Vui lòng nhập đủ thông tin!");
      return;
    }

    const data = await ContestAdminCreate(form);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setForm({
        name: "",
        description: "",
        level: 1,
        openTime: "",
        closeTime: "",
        slug: "",
        password: "",
        show: "",
        time: "",
      });

      setShowForm("excirses");
    } else {
      toast.error(data.EM);
    }
  };

  const getData = async () => {
    const data = await ContestAdminRead();
    if (data && data.EC === 0) {
      setNewForm(data.DT);
    }
  };

  const handleAdd = () => {
    if (type === "tn") {
      const question = content.split("\n")[0];
      const answer = [];

      const options = content.split("\n").slice(1);
      const check = options.filter(
        (o) => o === "*A" || o === "*B" || o === "*C" || o === "*D"
      )[0];

      if (!check) {
        toast.error("Vui lòng nhập đáp án đúng cho câu hỏi!");
        return;
      }

      for (let i = 0; i < options.length; i++) {
        if (options[i].startsWith("*")) {
          answer.push({
            text: options[i].split("*")[1],
            correct: true,
          });
        } else {
          answer.push({
            text: options[i],
            correct: false,
          });
        }
      }

      exam.push({
        question: question,
        type: "TN",
        option: answer,
      });
    } else if (type === "ds") {
      const question = content.split("\n")[0];
      const answer = [];

      const options = content.split("\n").slice(1);
      const check = options.filter(
        (o) => o === "*A" || o === "*B" || o === "*C" || o === "*D"
      )[0];

      if (!check) {
        toast.error("Vui lòng nhập đáp án đúng cho câu hỏi!");
        return;
      }

      for (let i = 0; i < options.length; i++) {
        if (options[i].startsWith("*")) {
          answer.push({
            text: options[i].split("*")[1],
            correct: true,
          });
        } else {
          answer.push({
            text: options[i],
            correct: false,
          });
        }
      }

      exam.push({
        question: question,
        type: "DS",
        option: answer,
      });
    }
  };

  const [tn, setTn] = useState({
    question: "",
    option1: {
      answer: "",
      correct: false,
    },
    option2: {
      answer: "",
      correct: false,
    },
    option3: {
      answer: "",
      correct: false,
    },
    option4: {
      answer: "",
      correct: false,
    },
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="contest">
      <div className="contest-btn">
        <button className="btn btn-secondary">
          <i className="fa-solid fa-arrow-left"></i> Trở về
        </button>
        <button className="btn btn-primary" onClick={() => setShowForm("add")}>
          <i className="fa-solid fa-plus"></i> Thêm bài luyện tập
        </button>
      </div>

      <div className="contest-show">
        <div className="contest-show-item">
          <p className="id">#</p>
          <p className="name">Tên</p>
          <p className="level">Mức độ</p>
          <p className="timeOpen">Thời gian mở</p>
          <p className="timeClose">Thời gian đóng</p>
          <p className="time">Khoảng thời gian</p>
          <p className="status">Trạng thái</p>
          <p className="action"></p>
        </div>
        {newForm?.map((item, index) => (
          <div className="contest-show-item" key={item._id}>
            <p className="id">{index + 1}</p>
            <p className="name">{item?.name}</p>
            <p className="level">
              {(item?.level === 1 && "Dễ") ||
                (item?.level === 2 && "Trung bình") ||
                (item?.level === 3 && "Khó") ||
                (item?.level === 4 && "Rất khó")}
            </p>
            <p className="timeOpen">
              {item?.openTime
                ? moment(item?.openTime).format("DD/MM/YYYY HH:mm")
                : "Không có"}
            </p>
            <p className="timeClose">
              {item?.closeTime
                ? moment(item?.closeTime).format("DD/MM/YYYY HH:mm")
                : "Không có"}
            </p>
            <p className="time">
              {item?.time ? `${item?.time} phút` : "Không giới hạn"}
            </p>
            <p className="status">
              {item?.show === "true" ? "Công khai" : "Không công khai"}
            </p>
            <p className="action">
              <i
                title="Chỉnh sửa"
                className="fa-solid fa-eye fa-edit"
                onClick={() => setShowForm("show")}
              ></i>
              <i
                title="Thêm bài tập"
                className="fa-solid fa-plus-circle"
                onClick={() => setShowForm("excirses")}
              ></i>
              <i title="Chỉnh sửa" className="fa-solid fa-edit"></i>
              <i title="Xoá luyện tập" className="fa-solid fa-trash"></i>
            </p>
          </div>
        ))}
      </div>

      {showForm === "add" && (
        <div className="show-form">
          <i className="fa-solid fa-xmark" onClick={() => setShowForm("")}></i>
          <div className="contest-form">
            <h3>Tạo bài luyện tập</h3>
            <h5>Thông tin bài luyện tập</h5>
            <div className="grid2">
              <div className="form-group">
                <label>* Tên bài luyện tập</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tên bài luyện tập*"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label>* Đường dẫn</label>
                <input
                  disabled
                  autoComplete="off"
                  className="form-control"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder=".../duong-dan"
                />
              </div>
            </div>

            <div className="form-group">
              <label>* Mô tả</label>
              <textarea
                className="form-control"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Mô tả*"
                autoComplete="off"
              />
            </div>

            <div className="grid3">
              <div className="form-group">
                <label>* Mức độ</label>
                <input
                  className="form-control"
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  placeholder="1 dễ, 2 trung bình, 3 khó, 4 rất khó*"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label>* Thời gian mở</label>
                <input
                  type="datetime-local"
                  autoComplete="off"
                  className="form-control"
                  name="openTime"
                  value={form.openTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>* Thời gian đóng</label>
                <input
                  type="datetime-local"
                  autoComplete="off"
                  className="form-control"
                  name="closeTime"
                  value={form.closeTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid3">
              <div className="form-group">
                <label>* Hiển thị</label>
                <select
                  className="form-control"
                  name="show"
                  value={form.show}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Chế độ hiển thị
                  </option>
                  <option value="true">Công khai</option>
                  <option value="false">Không công khai</option>
                </select>
              </div>

              <div className="form-group">
                <label>* Thời gian làm bài</label>
                <div className="input-group">
                  <input
                    autoComplete="off"
                    className="form-control"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    placeholder="Nếu để trống có nghĩa là không giới hạn"
                  />
                  <span className="input-group-text mt-1">Phút</span>
                </div>
              </div>

              <div className="form-group">
                <label>* Mật khẩu</label>
                <input
                  autoComplete="off"
                  className="form-control"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Nếu để trống có nghĩa là không có mật khẩu"
                />
              </div>
            </div>

            <div className="btn btn-primary" onClick={handlePushContest}>
              <i className="fa-solid fa-save"></i> Tạo bài luyện tập
            </div>
          </div>
        </div>
      )}

      {showForm === "excirses" && (
        <div className="show-form-other">
          <i className="fa-solid fa-xmark" onClick={() => setShowForm("")}></i>
          <div className="contest-form">
            <h3>CHỌN LOẠI BÀI TẬP</h3>
            <div className="grid4">
              <div className="item" onClick={() => setShowForm("TN")}>
                <h4>Trắc nghiệm </h4>
                <i className="fa-solid fa-list-check"></i>
              </div>

              <div className="item" onClick={() => setShowForm("TNNDA")}>
                <h4>Trắc nghiệm lựa chọn</h4>
                <i className="fa-solid fa-list-check"></i>
              </div>

              <div className="item" onClick={() => setShowForm("TLN")}>
                <h4>Trả lời ngắn</h4>
                <i className="fa-solid fa-list-check"></i>
              </div>

              <div className="item" onClick={() => setShowForm("DS")}>
                <h4>Trắc nghiệm đúng sai</h4>
                <i className="fa-solid fa-list-check"></i>
              </div>

              <div className="item" onClick={() => setShowForm("CT")}>
                <h4>Code tính theo test</h4>
                <i className="fa-solid fa-list-check"></i>
              </div>

              <div className="item" onClick={() => setShowForm("CW")}>
                <h4>Code tính cấu trúc</h4>
                <i className="fa-solid fa-list-check"></i>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm === "TN" && (
        <div className="show-form">
          <i
            className="fa-solid fa-xmark"
            onClick={() => setShowForm("excirses")}
          ></i>
          <div className="contest-form">
            <h3>Tạo bài tập trắc nghiệm</h3>
            <h5>Thông tin bài tập</h5>
            <div className="form-group">
              <label>* Câu hỏi</label>
              <Exam />
            </div>

            <div className="grid2">
              <div className="form-group">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toggleWrong"
                  />
                  <label class="form-check-label" for="toggleWrong">
                    Câu sai
                  </label>
                </div>
                <Exam />
              </div>

              <div className="form-group">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toggleWrong"
                  />
                  <label class="form-check-label" for="toggleWrong">
                    Câu sai
                  </label>
                </div>
                <Exam />
              </div>

              <div className="form-group">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toggleWrong"
                  />
                  <label class="form-check-label" for="toggleWrong">
                    Câu sai
                  </label>
                </div>
                <Exam />
              </div>

              <div className="form-group">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="toggleWrong"
                  />
                  <label class="form-check-label" for="toggleWrong">
                    Câu sai
                  </label>
                </div>
                <Exam />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contest;
