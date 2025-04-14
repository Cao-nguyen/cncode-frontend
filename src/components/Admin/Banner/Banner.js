import React, { useRef, useState } from "react";
import "./Banner.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { SettingsAdminUpload } from "../../../services/SettingsAdminServer";

function Banner() {
  const [avatar, setAvatar] = useState();
  const [link, setLink] = useState();

  const inputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.REACT_APP_CLOUD_PRESET;

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "uploads/avatar");

    try {
      toast.success("Đang trong quá trình tải ảnh...");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      if (response.data.secure_url) {
        setAvatar(response.data.secure_url);
        toast.success("Tải ảnh lên thành công!");
      }
    } catch (error) {
      toast.error("Lỗi khi xử lý ảnh!");
      console.error("Lỗi upload ảnh:", error);
    }
  };

  const handlePush = async () => {
    if (!avatar || !link) {
      toast.error("Bạn chưa nhập đầy đủ thông tin");
      return;
    }

    const data = await SettingsAdminUpload(avatar, link);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setAvatar("");
      setLink("");
      if (inputRef.current) {
        inputRef.current.value = null;
      }
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <div className="admin">
      <h3>Quản lý banner</h3>

      <div className="form-group">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="form-control"
          placeholder="Nhập link của banner*"
          onChange={handleImageUpload}
        ></input>
        <input
          className="form-control"
          placeholder="Nhập link của banner*"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        ></input>
        <div className="form-control btn btn-primary" onClick={handlePush}>
          Đăng
        </div>
      </div>

      {avatar && (
        <div className="image-show">
          <img src={avatar} alt="" />
        </div>
      )}
    </div>
  );
}

export default Banner;
