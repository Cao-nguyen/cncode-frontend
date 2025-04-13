import React, { useEffect, useState } from "react";
import "./Forum.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ForumAdminCreate,
  ForumAdminDelete,
  ForumAdminEdit,
  ForumAdminRead,
} from "../../../services/ForumAdminServer";
import socket from "../../Service/socket";

function Forum() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [law, setLaw] = useState();
  const [allowChat, setAllowChat] = useState("");
  const [allowVote, setAllowVote] = useState("");
  const [id, setId] = useState();
  const [forum, setForum] = useState();

  const handlePush = async () => {
    if (!name || !description || !law || !allowChat || !allowVote) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const data = await ForumAdminCreate(
      name,
      description,
      law,
      allowChat,
      allowVote
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShow(!show);
      setName("");
      setDescription("");
      setLaw("");
      setAllowChat("");
      setAllowVote("");
    } else {
      toast.error(data.EM);
    }
  };

  const getData = async () => {
    const data = await ForumAdminRead();

    if (data && data.EC === 0) {
      setForum(data.DT);
    }
  };

  const handleShow = (id) => {
    setShowEdit(!showEdit);

    const response = forum.filter((f) => f._id === id)[0];

    if (response) {
      setName(response.name);
      setDescription(response.description);
      setLaw(response.forum_law);
      setAllowChat(response.allow_chat);
      setAllowVote(response.allow_vote);
      setId(response._id);
    }
  };

  const handlePushEdit = async () => {
    if (!name || !description || !law) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const data = await ForumAdminEdit(
      id,
      name,
      description,
      law,
      allowChat,
      allowVote
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setShowEdit(!showEdit);
      setName("");
      setDescription("");
      setLaw("");
      setAllowChat("");
      setAllowVote("");
    } else {
      toast.error(data.EM);
    }
  };

  const handleDelete = async (id) => {
    const data = await ForumAdminDelete(id);

    if (data && data.EC == 0) {
      toast.success(data.EM);
      setId("");
    } else {
      toast.error(data.EM);
    }
  };

  useEffect(() => {
    getData();

    socket.on("pushForum", () => {
      getData();
    });

    return () => {
      socket.off("pushForum");
    };
  }, []);

  return (
    <div className="admin">
      <h3 className="text-center">Diễn đàn học tập</h3>
      <div className="btn btn-primary" onClick={handleBack}>
        <i className="fa-solid fa-arrow-left"></i>
        Trở về
      </div>
      <div className="btn btn-primary" onClick={() => setShow(!show)}>
        <i className="fa-solid fa-plus"></i>
        Thêm diễn đàn
      </div>

      <div className="admin_forum">
        {forum?.map((item) => (
          <div className="admin_forum_item" key={item?._id}>
            <div className="admin_forum_item_info">
              <img
                src={
                  !item.avatar
                    ? "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2022/05/kiem-tien-tu-group-facebook-e1653587419782.png"
                    : item?.avatar
                }
                alt=""
              ></img>
            </div>
            <div className="admin_forum_item_content">
              <h3>{item.name}</h3>
              <span>{item.description}</span>
            </div>
            <div className="admin_forum_item_action">
              <i
                className="fa-solid fa-edit"
                onClick={() => handleShow(item._id)}
              ></i>
              <i
                className="fa-solid fa-trash"
                onClick={() => handleDelete(item._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>

      {show && (
        <div className="admin_overplay">
          <i className="fa-solid fa-xmark" onClick={() => setShow(!show)}></i>
          <div className="admin_form">
            <h3>Tạo diễn đàn mới</h3>
            <div className="form-group">
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên diễn đàn"
              />
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả diễn đàn"
              />
              <textarea
                className="form-control"
                value={law}
                onChange={(e) => setLaw(e.target.value)}
                placeholder="Quy định của diễn đàn"
              />
              <select
                className="form-control form-select"
                value={allowChat}
                onChange={(e) => setAllowChat(e.target.value)}
              >
                <option value={""} disabled>
                  Cài đặt chế độ nhắn tin
                </option>
                <option value={"true"}>Cho phép mọi người gửi tin nhắn</option>
                <option value={"false"}>
                  Chỉ quản trị viên được gửi tin nhắn
                </option>
              </select>
              <select
                className="form-control form-select"
                value={allowVote}
                onChange={(e) => setAllowVote(e.target.value)}
              >
                <option value={""} disabled>
                  Cài đặt chế độ bình chọn
                </option>
                <option value={"true"}>Cho phép mọi người tạo bình chọn</option>
                <option value={"false"}>
                  Chỉ quản trị viên được tạo bình chọn
                </option>
              </select>
              <div
                className="form-control btn btn-primary"
                onClick={handlePush}
              >
                Tạo diễn đàn
              </div>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="admin_overplay">
          <i
            className="fa-solid fa-xmark"
            onClick={() => setShowEdit(!showEdit)}
          ></i>
          <div className="admin_form">
            <h3>Chỉnh sửa diễn đàn</h3>
            <div className="form-group">
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên diễn đàn"
              />
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả diễn đàn"
              />
              <textarea
                className="form-control"
                value={law}
                onChange={(e) => setLaw(e.target.value)}
                placeholder="Quy định của diễn đàn"
              />
              <select
                className="form-control form-select"
                value={allowChat}
                onChange={(e) => setAllowChat(e.target.value)}
              >
                <option value={""} disabled>
                  Cài đặt chế độ nhắn tin
                </option>
                <option value={"true"}>Cho phép mọi người gửi tin nhắn</option>
                <option value={"false"}>
                  Chỉ quản trị viên được gửi tin nhắn
                </option>
              </select>
              <select
                className="form-control form-select"
                value={allowVote}
                onChange={(e) => setAllowVote(e.target.value)}
              >
                <option value={""} disabled>
                  Cài đặt chế độ bình chọn
                </option>
                <option value={"true"}>Cho phép mọi người tạo bình chọn</option>
                <option value={"false"}>
                  Chỉ quản trị viên được tạo bình chọn
                </option>
              </select>
              <div
                className="form-control btn btn-primary"
                onClick={handlePushEdit}
              >
                Cập nhật diễn đàn
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Forum;
