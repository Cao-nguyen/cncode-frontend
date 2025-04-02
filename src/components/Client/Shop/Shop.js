import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import banner from "../../../assets/Khac/banner.png";
import xu from "../../../assets/Khac/xu.png";
import mi from "../../../assets/Vatpham/mitom.png";
import "./Shop.scss";

function Shop() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>CNcode | Bách hoá vật phẩm </title>
          <meta
            name="description"
            content="Nền tảng học công nghệ thông tin online"
          />
          <link rel="canonical" href="https://cncode.vercel.app" />
        </Helmet>
      </HelmetProvider>

      <div className="shop">
        <header>
          <div className="p">100</div>
          <img src={xu} alt=""></img>
        </header>

        <div className="shop-banner">
          <img src={banner} alt=""></img>
        </div>

        <h3 className="header-voucher">Voucher mua sắm</h3>
        <div className="voucher-all">
          <div className="voucher-item">
            <div className="voucher-left">
              <p>voucher</p>
              <h4>100X</h4>
            </div>
            <div className="voucher-right">
              <h3>Nhập mã: highlands28102009</h3>
              <p>Áp dụng cho tất cả các đơn hàng từ 100 xu trở lên</p>
              <div className="button">
                <p>Sao chép mã</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="product-text">SẢN PHẨM TRƯNG BÀY</h3>
        <div className="product">
          <div className="product-item">
            <img src={mi} alt="" />
            <h3>Mì tôm nhà Nguyên</h3>
            <div className="action">
              <div className="button">
                <div className="p">100</div>
                <img src={xu} alt="" />
              </div>
              <div className="button">Mua ngay</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
