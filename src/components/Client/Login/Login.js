import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import './Login.scss';
import HandleLogin from '../../../middlewares/LoginMiddleware';

function Login() {
    const {
        fullName,
        username,
        password,
        setFullName,
        setUsername,
        setPassword,
        showPassword,
        togglePasswordVisibility,
        LoginMiddleware,
        isLoading
    } = HandleLogin()

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
                    <Form.Control placeholder="Họ và tên*" aria-label="fullName" value={fullName}
                        onChange={(e) => setFullName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { LoginMiddleware() } }} />
                </InputGroup>
                <InputGroup className="form-input">
                    <InputGroup.Text>
                        <i className="fa-solid fa-address-book"></i>
                    </InputGroup.Text>
                    <Form.Control placeholder="Username*" aria-label="username" value={username}
                        onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { LoginMiddleware() } }} />
                </InputGroup>
                <InputGroup className="form-input">
                    <InputGroup.Text>
                        <i className="fa-solid fa-lock"></i>
                    </InputGroup.Text>
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Mật khẩu*"
                        aria-label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { LoginMiddleware() } }}
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                        {showPassword ? (
                            <i className="fa-solid fa-eye-slash"></i>
                        ) : (
                            <i className="fa-solid fa-eye"></i>
                        )}
                    </InputGroup.Text>
                </InputGroup>
                <div className="form-links">
                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                    <Link to="/dangky">Bạn chưa có tài khoản? Đăng ký</Link>
                </div>
                <Button className="form-button" type="submit" onClick={LoginMiddleware} disabled={isLoading}>
                    {isLoading ? (
                        <span>
                            <i className="fa-solid fa-spinner fa-spin"></i> Đang xử lý...
                        </span>
                    ) : (
                        "Đăng nhập"
                    )}
                </Button>
            </div>
        </div>
    );
}

export default Login;
