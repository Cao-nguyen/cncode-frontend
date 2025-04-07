import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Shop.scss";
import { toast } from "react-toastify";
import {
  ShopAdminCreate,
  ShopAdminDelete,
  ShopAdminRead,
} from "../../../services/ShopAdminServer";
import socket from "../../Service/socket";
import xu from "../../../assets/Khac/xu.png";
import { HelmetProvider, Helmet } from "react-helmet-async";
import logo from "../../../assets/logo.png";

function AdminShop() {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [shop, setShop] = useState();

  const inputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUD_PRESET);
    formData.append("folder", "uploads/vatpham");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        formData
      );

      const uploadedImageUrl = response.data.secure_url;
      setImageUrl(uploadedImageUrl);
      toast.success("Đã tải ảnh lên thành công!");
    } catch (error) {
      toast.error("Lỗi khi tải ảnh lên:", error);
    }
  };

  const handlePush = async () => {
    if (!imageUrl || !name || !price) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const data = await ShopAdminCreate(imageUrl, name, price);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      setImageUrl("");
      setName("");
      setPrice("");

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } else {
      toast.success(data.EM);
    }
  };

  const getData = async () => {
    const data = await ShopAdminRead();

    if (data && data.EC === 0) {
      setShop(data.DT);
    }
  };

  useEffect(() => {
    getData();

    socket.on("pushShop", () => {
      getData();
    });

    socket.on("deleteShop", () => {
      getData();
    });

    return () => {
      socket.off("pushShop");
      socket.off("deleteShop");
    };
  }, []);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const getPublicIdFromUrl = (imageUrl) => {
    const urlParts = imageUrl.split("/");
    const urlImage = `${urlParts[7]}/${urlParts[8]}/${urlParts[9]}`;
    const idMain = urlImage.split(".");

    return idMain[0];
  };

  const handleDelete = async (id, img) => {
    const check = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này!");
    if (check) {
      const publicId = getPublicIdFromUrl(img);
      const data = await ShopAdminDelete(id, publicId);
      if (data && data.EC === 0) {
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    }
  };

  return (
    <div className="admin">
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Bách hoá vật phẩm </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>

      <h4>Đăng sản phẩm mới</h4>
      <div className="form-group grid4">
        <input
          ref={inputRef}
          type="file"
          className="form-control"
          onChange={handleImageChange}
        />
        <input
          className="form-control"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="form-control"
          placeholder="Giá sản phẩm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="btn btn-primary" onClick={handlePush}>
          Đăng sản phẩm
        </div>
      </div>

      {imageUrl && (
        <div className="show-img">
          <div className="show-img-item">
            <p>Vật phẩm đã tải lên</p>
            <img src={imageUrl} alt="" />
          </div>
        </div>
      )}

      <h4>Sản phẩm</h4>
      <div className="products">
        {shop?.map((item) => (
          <div className="product-item">
            <i
              className="fa-solid fa-xmark"
              onClick={() => handleDelete(item._id, item.img)}
            ></i>
            <img src={item.img} alt=""></img>
            <h5>{item.name}</h5>
            <p>
              <span>{formatNumber(item.price)}</span>
              <span>
                <img src={xu} alt=""></img>
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminShop;
