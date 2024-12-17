import React from 'react';
import './Footer.scss'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom';

function Footer(props) {
    return (
        <footer className="mt-5">
            <div className="line"></div>
            <div className="row mx-5">
                <div className="col-xl-5 col-12 mt-3 mb-3">
                    <h4>Về CNcode</h4>
                    <div className="border"></div>
                    <div className="d-xl-flex">
                        <img src={logo} alt=""></img>
                        <p>CNcode là một website chuyên cung cấp các bài giảng về lập trình với đa ngôn ngữ. Với những bài tập và sự kiện hấp dẫn trên website sẽ giúp học sinh có thể rèn luyện khả năng lập trình của bản thân. Học qua video nhưng có độ tương tác cao.</p>
                    </div>
                </div>
                <div className="col-xl-2 col-12 mt-3 mb-3">
                    <h4>Sản phẩm</h4>
                    <div className="border"></div>
                    <div className="nav">
                        <div className="nav-item">
                            <a className="nav-link" href="https://chinhphucnguvanedu.vercel.app" target='_blank' rel="noopener noreferrer">Chinh phục ngữ văn</a>
                        </div>
                    </div>
                </div>
                <div className="col-xl-2 col-12 mt-3 mb-3">
                    <h4>Liên kết</h4>
                    <div className="border"></div>
                    <div className="nav">
                        <div className="nav-item">
                            <NavLink className="nav-link" to="/gioithieu">Giới thiệu</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink className="nav-link" to="/dieukhoan">Điều khoản</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink className="nav-link" to="/baomat">Bảo mật</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink className="nav-link" to="/thanhvien">Thành viên</NavLink>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-12 mt-3 mb-3">
                    <h4>Mạng xã hội</h4>
                    <div className="border"></div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;