import React, { useEffect, useState } from "react";
import Editor from "../../Service/Editor";
import "./Course.scss";
import { toast } from "react-toastify";
import {
  CourseAdminCreate,
  CourseAdminRead,
  DmAdminCreate,
  LsAdminCreate,
  VideoAdminCreate,
} from "../../../services/CourseAdminServer";
import socket from "../../Service/socket";

function Course() {
  const [showAdd, setShowAdd] = useState("");
  const [review, setReview] = useState();
  const [showMain, setShowMain] = useState("");

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

  const [dinhdanh, setDinhdanh] = useState();
  const [categoryMain, setCategoryMain] = useState();
  const [nameDm, setNameDm] = useState();

  const [typeLs, setTypeLs] = useState("");

  const [video, setVideo] = useState();

  const [quizzes, setQuizzes] = useState([
    {
      time: "",
      question: "",
      options: ["", "", "", ""], // A, B, C, D
    },
  ]);

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
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");

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

    socket.on("pushDm", () => {
      getData();
    });

    socket.on("pushLs", () => {
      getData();
    });

    return () => {
      socket.off("pushCourse");
      socket.off("pushDm");
      socket.off("pushLs");
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

  const handlePushDm = async () => {
    if (!nameDm) {
      toast.success("Không được để trống!");
      return;
    }

    const data = await DmAdminCreate(dinhdanh, nameDm);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShowMain("");
      setNameDm("");
    } else {
      toast.error(data.EM);
    }
  };

  const handlePushLs = async () => {
    if (!nameDm) {
      toast.success("Không được để trống!");
      return;
    }

    const data = await LsAdminCreate(dinhdanh, categoryMain, nameDm);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShowMain("");
      setNameDm("");
    } else {
      toast.error(data.EM);
    }
  };

  const convertYoutubeLink = (url) => {
    if (!url) return "";
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return "";
  };

  const handleQuizChange = (index, field, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[index][field] = value;
    setQuizzes(updatedQuizzes);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[index].options[optionIndex] = value;
    setQuizzes(updatedQuizzes);
  };

  const addQuiz = () => {
    setQuizzes([
      ...quizzes,
      { time: "", question: "", options: ["", "", "", ""] },
    ]);
  };

  const newCourse = course?.filter((c) => c._id === dinhdanh)[0]?.categories;

  const handlePushLesson = async (idLs) => {
    if (!video) {
      toast.error("Bắt buộc phải có một link video bài học!");
      return;
    }

    const data = VideoAdminCreate(dinhdanh, categoryMain, idLs, video, quizzes);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setTypeLs("");
      setVideo("");
      setQuizzes([
        {
          time: "",
          question: "",
          options: ["", "", "", ""],
        },
      ]);
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
              <i
                className="fa-solid fa-circle-plus"
                onClick={() => {
                  setShowAdd("addLesson");
                  setDinhdanh(item?._id);
                }}
              ></i>
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

      {showAdd === "addLesson" && (
        <div className="addLesson">
          <i className="fa-solid fa-xmark" onClick={() => setShowAdd("")}></i>
          <div className="addLesson-left">
            <div className="category-main">
              <div className="category">
                <i className="fa-solid fa-book-open-reader"></i>
                <div className="p">Thư mục</div>
              </div>
              <i
                className="fa-solid fa-circle-plus"
                onClick={() => setShowMain("addCategory")}
              ></i>
            </div>

            {newCourse?.map((item) => (
              <>
                <div className="category-remain">
                  <div className="category">
                    <i className="fa-solid fa-book-open-reader"></i>
                    <div className="p">{item?.title}</div>
                  </div>
                  <i
                    className="fa-solid fa-circle-minus"
                    // onClick={() => setShowMain("addCategory")}
                  ></i>
                  <i
                    className="fa-solid fa-circle-plus"
                    onClick={() => {
                      setShowMain("addCourse");
                      setCategoryMain(item?._id);
                    }}
                  ></i>
                </div>

                {item?.lessons?.map((item) => (
                  <div
                    className="category-child"
                    onClick={() => setReview(item?._id)}
                  >
                    <div className="category">
                      <i className="fa-solid fa-book-open-reader"></i>
                      <div className="p">{item?.title}</div>
                    </div>
                    <i
                      className="fa-solid fa-circle-minus"
                      // onClick={() => setShowMain("addCategory")}
                    ></i>
                  </div>
                ))}
              </>
            ))}
          </div>
          <div className="addLesson-right">
            {newCourse?.map((item) => (
              <>
                {item?.lessons
                  ?.filter((i) => i?._id === review)
                  ?.map((i) => (
                    <div className="review">
                      <h3>{i.title}</h3>
                      <select
                        className="form-control"
                        value={typeLs}
                        onChange={(e) => setTypeLs(e.target.value)}
                      >
                        <option value="" disabled>
                          Chọn loại bài học
                        </option>
                        <option value="video">Dạng video</option>
                        <option value="text">Dạng text</option>
                        <option value="document">Dạng tài liệu</option>
                        <option value="quiz">Dạng bài tập</option>
                      </select>

                      {typeLs === "video" && (
                        <div className="update-video">
                          <input
                            value={video}
                            onChange={(e) => setVideo(e.target.value)}
                            className="form-control"
                            placeholder="Link video*"
                          />

                          {video && (
                            <>
                              <div style={{ marginTop: "16px" }}>
                                <iframe
                                  src={convertYoutubeLink(video)}
                                  title="YouTube video"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>

                              <div
                                className="btn btn-success"
                                onClick={() => addQuiz()}
                              >
                                <i className="fa-solid fa-plus"></i> Thêm câu
                                hỏi
                              </div>

                              {quizzes.map((quiz, index) => (
                                <div key={index} className="add-quiz mb-4">
                                  <input
                                    className="form-control mb-2"
                                    placeholder="Thời gian hiển thị"
                                    value={quiz.time}
                                    onChange={(e) =>
                                      handleQuizChange(
                                        index,
                                        "time",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <input
                                    className="form-control mb-3"
                                    placeholder="Câu hỏi"
                                    value={quiz.question}
                                    onChange={(e) =>
                                      handleQuizChange(
                                        index,
                                        "question",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <div className="d-flex justify-content-between mb-2">
                                    <input
                                      style={{ width: "49%" }}
                                      className="form-control"
                                      placeholder="A"
                                      value={quiz.options[0]}
                                      onChange={(e) =>
                                        handleOptionChange(
                                          index,
                                          0,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      style={{ width: "49%" }}
                                      className="form-control"
                                      placeholder="B"
                                      value={quiz.options[1]}
                                      onChange={(e) =>
                                        handleOptionChange(
                                          index,
                                          1,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <input
                                      style={{ width: "49%" }}
                                      className="form-control"
                                      placeholder="C"
                                      value={quiz.options[2]}
                                      onChange={(e) =>
                                        handleOptionChange(
                                          index,
                                          2,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <input
                                      style={{ width: "49%" }}
                                      className="form-control"
                                      placeholder="D"
                                      value={quiz.options[3]}
                                      onChange={(e) =>
                                        handleOptionChange(
                                          index,
                                          3,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              ))}

                              <div
                                className="btn btn-primary"
                                onClick={() => handlePushLesson(i?._id)}
                              >
                                Đăng bài học
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </>
            ))}
          </div>
        </div>
      )}

      {showMain === "addCategory" && (
        <div className="over-main">
          <i className="fa-solid fa-xmark" onClick={() => setShowMain("")}></i>
          <div className="over-form">
            <h3>Tạo danh mục</h3>
            <input
              value={nameDm}
              onChange={(e) => setNameDm(e.target.value)}
              className="form-control"
              placeholder="Tên danh mục*"
            ></input>
            <div className="btn btn-primary" onClick={handlePushDm}>
              Tạo danh mục
            </div>
          </div>
        </div>
      )}

      {showMain === "addCourse" && (
        <div className="over-main">
          <i className="fa-solid fa-xmark" onClick={() => setShowMain("")}></i>
          <div className="over-form">
            <h3>Tạo bài học</h3>
            <input
              value={nameDm}
              onChange={(e) => setNameDm(e.target.value)}
              className="form-control"
              placeholder="Tên bài học*"
            ></input>
            <div className="btn btn-primary" onClick={handlePushLs}>
              Tạo bài học
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Course;
