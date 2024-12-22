import React from 'react';
import './Dangnhap.scss';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import useDangkyMiddleware from '../../middlewares/dangkyMiddleware';

function Dangnhap(props) {
    const {
        showPassword,
        username,
        fullName,
        password,
        handleShow,
        setFullname,
        setUsername,
        setPassword,
        handleLogin
    } = useDangkyMiddleware()

    return (
        <div className="bg-color">
            <div className="container">
                <Helmet>
                    <title>CNcode | Đăng nhập</title>
                </Helmet>
                <div className="row dangnhap">
                    <div className="content col-5">
                        <h1>Nền tảng học lập trình miễn phí dành cho
                            <h1 className="special">mọi đối tượng</h1>
                        </h1>
                        <div className="reason">
                            <p>+ Tiết kiệm thời gian di chuyển đến trung tâm</p>
                            <p>+ Học mọi lúc, mọi nơi chỉ cần có internet</p>
                            <p>+ Học qua video nhưng có độ tương tác cao</p>
                            <p>+ Có diễn đàn để trao đổi học tập</p>
                            <p>+ Nhiều sự kiện hấp dẫn</p>
                        </div>
                    </div>
                    <div className="col-2"></div>
                    <div className="form-group col-5">
                        <h2 className="margin">Đăng nhập</h2>
                        <div className="form-field">
                            <p className="infor">Chào mừng bạn đến với nền tảng CNcode của chúng tôi!</p>
                            <input type="text" className="form-control mt-3" placeholder="Họ và tên*"
                                value={fullName} onChange={(e) => setFullname(e.target.value)}
                            ></input>
                            <input type="text" className="form-control mt-3" placeholder="Tên đăng nhập*"
                                value={username} onChange={(e) => setUsername(e.target.value)}
                            ></input>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control form-input mt-3 mb-2"
                                id="password"
                                placeholder="Mật khẩu*"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <i className={`fa-solid fa-eye${showPassword ? '-slash' : ''}`} onClick={handleShow}></i>
                            <NavLink className="forgot-password" to="/quenmatkhau">Quên mật khẩu</NavLink>
                            <button className="btn btn-primary mb-4" onClick={handleLogin}>Đăng nhập</button>
                            <span>Bạn chưa có tài khoản ư? <NavLink to="/dangky">đăng ký ngay</NavLink></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dangnhap;