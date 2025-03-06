import React, { useEffect, useState } from "react";
import "./Web.scss";
import { WebAdminCreate, WebAdminRead } from "../../../services/WebAdminServer";
import { toast } from "react-toastify";
import socket from "../../Service/socket";

const Web = () => {
  const [products, setProducts] = useState([{ name: "", link: "" }]);
  const [quickLinks, setQuickLinks] = useState([{ name: "", link: "" }]);
  const [info, setInfo] = useState({
    general: "",
    admin: "",
    email: "",
    facebook: "",
    zalo: "",
    youtube: "",
  });

  const handleAddProduct = () => {
    setProducts([...products, { name: "", link: "" }]);
  };

  const handleAddQuickLink = () => {
    setQuickLinks([...quickLinks, { name: "", link: "" }]);
  };

  const handleChangeProduct = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleChangeQuickLink = (index, field, value) => {
    const updatedQuickLinks = [...quickLinks];
    updatedQuickLinks[index][field] = value;
    setQuickLinks(updatedQuickLinks);
  };

  const handleChangeInfo = (field, value) => {
    setInfo({ ...info, [field]: value });
  };

  const handlePush = async () => {
    const data = await WebAdminCreate(products, quickLinks, info);

    if (data && data.EC === 0) {
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
  };

  useEffect(() => {
    const getDataWeb = async () => {
      const data = await WebAdminRead();

      if (data && data.EC === 0) {
        const loadedProducts = data.DT.products || [];
        setProducts([...loadedProducts, { name: "", link: "" }]);

        const loadedQuickLins = data.DT.quickLinks || [];
        setQuickLinks([...loadedQuickLins, { name: "", link: "" }]);

        setInfo(data.DT.info);
      }
    };

    getDataWeb();

    socket.on("changeWeb", () => {
      getDataWeb();
    });

    return () => {
      socket.off("changeWeb");
    };
  }, []);

  return (
    <>
      <div className="admin">
        <h1 className="text-center">Cài đặt website</h1>

        <div className="form-group mt-3">
          <h5>Thông tin chung về website</h5>
          <textarea
            className="form-control"
            value={info.general}
            onChange={(e) => handleChangeInfo("general", e.target.value)}
          ></textarea>
        </div>

        <div className="form-group mt-3">
          <h5>Sản phẩm</h5>
          {products.map((product, index) => (
            <div className="grid-2" key={index}>
              <input
                className="form-control"
                placeholder="Tên sản phẩm*"
                value={product.name}
                onChange={(e) =>
                  handleChangeProduct(index, "name", e.target.value)
                }
              />
              <input
                className="form-control"
                placeholder="Đường link*"
                value={product.link}
                onChange={(e) =>
                  handleChangeProduct(index, "link", e.target.value)
                }
              />
            </div>
          ))}
          <div className="btn btn-success mt-3" onClick={handleAddProduct}>
            + Thêm sản phẩm
          </div>
        </div>

        <div className="form-group mt-3">
          <h5>Liên kết nhanh</h5>
          {quickLinks.map((link, index) => (
            <div className="grid-2" key={index}>
              <input
                className="form-control"
                placeholder="Tên liên kết nhanh*"
                value={link.name}
                onChange={(e) =>
                  handleChangeQuickLink(index, "name", e.target.value)
                }
              />
              <input
                className="form-control"
                placeholder="Đường link*"
                value={link.link}
                onChange={(e) =>
                  handleChangeQuickLink(index, "link", e.target.value)
                }
              />
            </div>
          ))}
          <div className="btn btn-success mt-3" onClick={handleAddQuickLink}>
            + Thêm liên kết nhanh
          </div>
        </div>

        <div className="form-group mt-3">
          <h5>Mạng xã hội</h5>
          <input
            className="form-control"
            placeholder="Quản trị viên*"
            value={info.admin}
            onChange={(e) => handleChangeInfo("admin", e.target.value)}
          />
          <input
            className="form-control"
            placeholder="Email*"
            value={info.email}
            onChange={(e) => handleChangeInfo("email", e.target.value)}
          />
          <input
            className="form-control"
            placeholder="Facebook*"
            value={info.facebook}
            onChange={(e) => handleChangeInfo("facebook", e.target.value)}
          />
          <input
            className="form-control"
            placeholder="Zalo*"
            value={info.zalo}
            onChange={(e) => handleChangeInfo("zalo", e.target.value)}
          />
          <input
            className="form-control"
            placeholder="Youtube*"
            value={info.youtube}
            onChange={(e) => handleChangeInfo("youtube", e.target.value)}
          />
        </div>

        <div className="btn btn-primary mt-3" onClick={handlePush}>
          Cập nhật
        </div>
      </div>
    </>
  );
};

export default Web;
