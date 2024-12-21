import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import underline from '../../assets/underline.png';
import useDangkyMiddleware from '../../middlewares/dangkyMiddleware';
import './Dangky.scss';

function Dangky() {
    const {
        selectedOption,
        fullName,
        email,
        username,
        password,
        showPassword,
        handleShow,
        handleSelectChange,
        handleSubmit,
        setFullname,
        setEmail,
        setUsername,
        setPassword,
    } = useDangkyMiddleware();

    return (
        <div className="bg-color">
            <div className="container">
                <Helmet>
                    <title>CNcode | Đăng ký</title>
                </Helmet>
                <div className="row dangnhap">
                    <div className="content col-5">
                        <h1>Chào mừng bạn đã đến với website học lập trình miễn phí của chúng tôi</h1>
                        <img className="underline" src={underline} alt="" />
                        <div className="reason">
                            <p>+ Đăng ký để được học nhiều khoá học bổ ích</p>
                            <p>+ Nhiều tính năng học tập hiện đại đang chờ đón bạn</p>
                            <p>+ Học qua video nhưng có độ tương tác cao</p>
                            <p>+ Diễn đàn học tập thú vị</p>
                            <p>+ Cùng giữ chuỗi học tập nào!</p>
                        </div>
                    </div>
                    <div className="col-2"></div>
                    <div className="form-group col-5">
                        <h2 className="margin">Đăng ký</h2>
                        <div className="form-field">
                            <input
                                type="text"
                                className="form-control mt-3"
                                placeholder="Họ và tên*"
                                value={fullName}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                            <input
                                type="email"
                                className="form-control mt-3"
                                placeholder="Email*"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control mt-3"
                                placeholder="Tên đăng nhập*"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control form-input mt-3"
                                id="password"
                                placeholder="Mật khẩu*"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
                                className={`fa-solid fa-eye${showPassword ? '-slash' : ''}`}
                                onClick={handleShow}
                            ></i>

                            <select
                                className="form-select"
                                value={selectedOption}
                                onChange={handleSelectChange}
                            >
                                <option value="">Bạn biết CNcode qua đâu</option>
                                <option value="Youtube">Youtube</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Friends">Từ bạn bè</option>
                                <option value="Teachers">Từ thầy cô</option>
                                <option value="Others">Khác</option>
                            </select>

                            <button className="btn btn-primary mb-4" onClick={handleSubmit}>
                                Đăng ký
                            </button>
                            <span>
                                Bạn đã có tài khoản ư?{' '}
                                <NavLink to="/dangnhap">đăng nhập ngay</NavLink>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dangky;
