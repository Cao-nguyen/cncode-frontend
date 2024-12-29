import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import RegisterMiddleware from '../../../middlewares/RegisterMiddleware';
import './Register.scss';

function Register() {
    const {
        showPassword,
        countdown,
        fullName,
        email,
        username,
        password,
        confirmPassword,
        code,
        togglePasswordVisibility,
        setFullName,
        setEmail,
        setUsername,
        setPassword,
        setConfirmPassword,
        setCode,
        handleRegister,
        handleSendCode
    } = RegisterMiddleware()

    return (
        <div className="bg">
            <div className="infor">
                <h1>Chào mừng bạn đã đến với CNcode - nền tảng học lập trình miễn phí</h1>
                <div className="infor-item">
                    <p>+ Website học lập trình miễn phí đa ngôn ngữ</p>
                    <p>+ Có nhiều tính năng hiện đại, mới mẻ, giúp việc học lập trình của bạn trở nên dễ dàng</p>
                    <p>+ Hoàn toàn miễn phí và tiết kiệm thời gian bạn di chuyển đến trung tâm</p>
                    <p>+ Có diễn đàn hỗ trợ học tập ai cũng có thể tham gia khi đăng nhập trên nền tảng</p>
                </div>
            </div>
            <div className="form">
                <h1>ĐĂNG KÝ</h1>
                <InputGroup className="form-input">
                    <InputGroup.Text>
                        <i className="fa-solid fa-user"></i>
                    </InputGroup.Text>
                    <Form.Control placeholder="Họ và tên*" aria-label="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { handleRegister() } }}
                    />
                </InputGroup>
                <InputGroup className="form-input">
                    <InputGroup.Text>
                        <i className="fa-solid fa-envelope"></i>
                    </InputGroup.Text>
                    <Form.Control placeholder="Email*" aria-label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { handleRegister() } }}
                    />
                </InputGroup>
                <InputGroup className="form-input">
                    <InputGroup.Text>
                        <i className="fa-solid fa-address-book"></i>
                    </InputGroup.Text>
                    <Form.Control placeholder="Username*" aria-label="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { handleRegister() } }}
                    />
                </InputGroup>
                <InputGroup className="form-input">
                    <InputGroup.Text>
                        <i className="fa-solid fa-lock"></i>
                    </InputGroup.Text>
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Mật khẩu*" aria-label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { handleRegister() } }}
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility} className="toggle-password">
                        <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </InputGroup.Text>
                </InputGroup>
                <InputGroup className="form-input">
                    <InputGroup.Text>
                        <i className="fa-solid fa-lock"></i>
                    </InputGroup.Text>
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Xác nhận mật khẩu*" aria-label="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { handleRegister() } }}
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility} className="toggle-password">
                        <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </InputGroup.Text>
                </InputGroup>
                <InputGroup className="form-input verification-input">
                    <Form.Control type="text" placeholder="Nhập mã xác thực (6 số)*" maxLength={6} aria-label="verificationCode"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { handleRegister() } }}
                    />
                    <Button onClick={handleSendCode} disabled={countdown > 0} className="send-code-button">
                        {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi mã"}
                    </Button>
                </InputGroup>

                <Button className="form-button" type="submit" onClick={handleRegister}>
                    Đăng ký
                </Button>
            </div>
        </div>
    );
}

export default Register;