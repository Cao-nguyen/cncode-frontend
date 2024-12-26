import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import './Login.scss';

function Login() {
    return (
        <div className="bg">
            <div className="infor">
                <h1>Chào mừng bạn đã trở lại với CNcode - nền tảng học lập trình miễn phí</h1>
                <div className="infor-item">
                    <p>+ Đăng nhập ngay để tham gia vào diễn đàn sôi động</p>
                    <p>+ Nhiều sự kiện hấp dẫn đang chờ đón bạn tham gia</p>
                    <p>+ Các khoá học đang nóng lòng có thêm bạn học mới</p>
                    <p>+ Hãy đăng nhập để viết blog đầu tiên trên hệ thống nhé</p>
                </div>
            </div>
            <div className="form">
                <h1>ĐĂNG NHẬP</h1>
                <InputGroup className="form-input">
                    <InputGroup.Text>
                        <i className="fa-solid fa-user"></i>
                    </InputGroup.Text>
                    <Form.Control placeholder="Họ và tên*" aria-label="fullName" />
                </InputGroup>
                <InputGroup className="form-input">
                    <InputGroup.Text>
                        <i className="fa-solid fa-address-book"></i>
                    </InputGroup.Text>
                    <Form.Control placeholder="Username*" aria-label="username" />
                </InputGroup>
                <InputGroup className="form-input">
                    <InputGroup.Text>
                        <i className="fa-solid fa-lock"></i>
                    </InputGroup.Text>
                    <Form.Control type="password" placeholder="Mật khẩu*" aria-label="password" />
                </InputGroup>
                <div className="form-links">
                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                    <Link to="/dangky">Bạn chưa có tài khoản? Đăng ký</Link>
                </div>
                <Button className="form-button" type="submit">
                    Đăng nhập
                </Button>
            </div>
        </div>
    );
}

export default Login;
