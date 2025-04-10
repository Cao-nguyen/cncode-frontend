import React from "react";
import "./Transaction.scss";
import { useNavigate } from "react-router-dom";

function Transaction() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="transaction">
      <h3 className="back" onClick={handleBack}>
        Trở về
      </h3>

      <h3 className="title">Quản lí mã ưu đãi</h3>
      <div className="voucher">
        <div className="voucher-table">
          <p className="id">#</p>
          <p className="code">Mã ưu đãi</p>
          <p className="money">Khuyến mãi</p>
          <p className="apply">Áp dụng</p>
          <p className="createBy">Tạo bởi</p>
          <p className="userBy">Sử dụng bởi</p>
          <p className="active">Trạng thái</p>
          <p className="createTime">Ngày tạo</p>
          <p className="endTime">Hết hạn</p>
          <p className="note">Ghi chú</p>
          <p className="button"></p>
        </div>
        <div className="voucher-table">
          <p className="id">1</p>
          <p className="code">fc8o_c2una_t8</p>
          <p className="money">100.000 đ</p>
          <p className="apply">Cho đơn hàng trên 100.000 đ</p>
          <p className="createBy">@caonguyen2009</p>
          <p className="userBy">@caonguyen2009</p>
          <p className="active">Đã sử dụng</p>
          <p className="createTime">
            <span>10:00</span>
            <span>10/04/2025</span>
          </p>
          <p className="endTime">
            <span>10:00</span>
            <span>10/04/2025</span>
          </p>
          <p className="note">Tặng voucher chào mừng thành viên mới</p>
          <p className="button">
            <i className="fa-solid fa-trash"></i>
          </p>
        </div>
      </div>

      <h3 className="title mt-4">Quản lí giao dịch</h3>
      <div className="voucher">
        <div className="voucher-table">
          <p className="id">#</p>
          <p className="code">Giao dịch</p>
          <p className="money">Thanh Toán</p>
          <p className="apply">Giảm giá</p>
          <p className="createBy">Khách hàng</p>
          <p className="userBy">Quản trị viên</p>
          <p className="active">Trạng thái</p>
          <p className="createTime">Ngày đặt hàng</p>
          <p className="endTime">Ngày thanh toán</p>
          <p className="note">Ghi chú</p>
          <p className="button"></p>
        </div>
        <div className="voucher-table">
          <p className="id">1</p>
          <p className="code">Mua khoá học</p>
          <p className="money">300.000 đ</p>
          <p className="apply">Không giảm giá</p>
          <p className="createBy">Lý Cao Nguyên</p>
          <p className="userBy">Lý Cao Nguyên</p>
          <p className="active">Đã thanh toán</p>
          <p className="createTime">
            <span>10:00</span>
            <span>10/04/2025</span>
          </p>
          <p className="endTime">
            <span>10:00</span>
            <span>10/04/2025</span>
          </p>
          <p className="note"></p>
          <p className="button">
            <i className="fa-solid fa-trash"></i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
