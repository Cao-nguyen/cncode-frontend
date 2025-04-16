import React, { useEffect, useRef, useState } from "react";
import "./Banner.scss";
import axios from "axios";
import { toast } from "react-toastify";
import {
  SettingsAdminBannerDelete,
  SettingsAdminBannerRead,
  SettingsAdminBannerUpload,
} from "../../../services/SettingsAdminServer";
import socket from "../../Service/socket";

function Banner() {
  const [avatar, setAvatar] = useState();
  const [link, setLink] = useState();
  const [banner, setBanner] = useState();

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
      toast.info("Đang trong quá trình tải ảnh...");

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

    const data = await SettingsAdminBannerUpload(avatar, link);

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

  const getData = async () => {
    const data = await SettingsAdminBannerRead();
    if (data && data.EC === 0) {
      setBanner(data.DT);
    }
  };

  const handleDelete = async (idPost) => {
    const newAvatar = banner.filter((b) => b._id === idPost)[0].avatar;
    const urlParts = newAvatar.split("/");
    const urlImage = `${urlParts[7]}/${urlParts[8]}/${urlParts[9]}`;
    const idMain = urlImage.split(".");
    const publicId = idMain[0];

    const data = await SettingsAdminBannerDelete(publicId, idPost);

    if (data && data.EC === 0) {
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
  };

  useEffect(() => {
    getData();

    socket.on("pushBanner", () => {
      getData();
    });

    return () => {
      socket.off("pushBanner");
    };
  }, []);

  return (
    <div className="admin">
      <h3 className="banner-text">Quản lý banner</h3>

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

      <div className="show-banner">
        {banner?.map((item) => (
          <div className="show-banner-item">
            <img src={item?.avatar} alt=""></img>
            <span>{item?.link}</span>
            <div className="action">
              <i
                className="fa-solid fa-trash"
                onClick={() => handleDelete(item?._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
