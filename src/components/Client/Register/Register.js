import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import RegisterMiddleware from "../../../middlewares/RegisterMiddleware";
import "./Register.scss";
import { Link } from "react-router-dom";

function Register({ toggleRegister }) {
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
    handleSendCode,
    isLoading,
    whereNow,
    setWhereNow,
  } = RegisterMiddleware(toggleRegister);

  return (
    <div className="register-bg">
      <div className="register-form">
        <h1 className="text">ĐĂNG KÝ</h1>
        <p style={{ fontSize: "15px", textAlign: "center" }}>
          Khi nhấn đăng ký có nghĩa là bạn đã đồng ý với:{" "}
          <Link to="/use">điều khoản</Link>
        </p>
        <div className="form-content">
          <InputGroup className="form-input">
            <Form.Select
              value={whereNow}
              onChange={(e) => setWhereNow(e.target.value)}
            >
              <option value="" disabled style={{ color: "#999" }}>
                Bạn biết chúng tôi qua đâu?
              </option>
              <option value="Facebook">Facebook</option>
              <option value="Google">Google</option>
              <option value="Youtube">Youtube</option>
              <option value="Zalo">Zalo</option>
              <option value="info">Bạn bè giới thiệu</option>
            </Form.Select>
          </InputGroup>
          <InputGroup className="form-input mt-2">
            <Form.Control
              placeholder="Họ và tên*"
              aria-label="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
            />
          </InputGroup>
          <InputGroup className="form-input">
            <Form.Control
              placeholder="Email*"
              aria-label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
            />
          </InputGroup>
          <InputGroup className="form-input">
            <Form.Control
              placeholder="Username*"
              aria-label="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
            />
          </InputGroup>
          <InputGroup className="form-input">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu*"
              aria-label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
            />
            <InputGroup.Text
              onClick={togglePasswordVisibility}
              className="toggle-password"
            >
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </InputGroup.Text>
          </InputGroup>
          <InputGroup className="form-input">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Xác nhận mật khẩu*"
              aria-label="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
            />
            <InputGroup.Text
              onClick={togglePasswordVisibility}
              className="toggle-password"
            >
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </InputGroup.Text>
          </InputGroup>
          <InputGroup className="form-input verification-input">
            <Form.Control
              type="text"
              placeholder="Nhập mã xác thực (6 số)*"
              maxLength={6}
              aria-label="verificationCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
            />
            <Button
              onClick={handleSendCode}
              disabled={countdown > 0}
              className="send-code-button"
            >
              {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi mã"}
            </Button>
          </InputGroup>
          <Button
            className="form-button"
            type="submit"
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>
                <i className="fa-solid fa-spinner fa-spin"></i> Đang xử lý...
              </span>
            ) : (
              "Đăng ký"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Register;
