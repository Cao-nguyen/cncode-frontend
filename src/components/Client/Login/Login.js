import React from "react";
import { Link } from "react-router-dom";
import HandleLogin from "../../../middlewares/LoginMiddleware";
import "./Login.scss";

function Login({ toggleLogin }) {
  const {
    fullName,
    email,
    whereNow,
    username,
    password,
    code,
    countdown,
    tinh,
    setTinh,
    setFullName,
    setEmail,
    setWhereNow,
    setCode,
    setUsername,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    LoginMiddleware,
    handleRegister,
    handleSendCode,
    isLoading,
    show,
    setShow,
    check,
    setCheck,
    handleForgot,
  } = HandleLogin(toggleLogin);

  return (
    <div className="login">
      <div className="login-back" onClick={toggleLogin}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="login-main">
        <header>
          <p
            className={show === "login" ? "active" : ""}
            onClick={() => setShow("login")}
          >
            Đăng nhập
          </p>
          <p
            className={show === "register" ? "active" : ""}
            onClick={() => setShow("register")}
          >
            Đăng ký
          </p>
          <p
            className={show === "forgot" ? "active" : ""}
            onClick={() => setShow("forgot")}
          >
            Quên mật khẩu
          </p>
        </header>

        {show === "login" && (
          <div className="dangnhap">
            <h5>Đăng nhập bằng tài khoản</h5>
            <div className="form-login">
              <input
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tên đăng nhập"
                autoComplete="username"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    LoginMiddleware();
                  }
                }}
              ></input>
              <div className="form-input-password">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Mật khẩu"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      LoginMiddleware();
                    }
                  }}
                ></input>
                <div className="form-button">
                  <i
                    onClick={togglePasswordVisibility}
                    className={`fa-solid ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </div>
              </div>
              <div className="form-input-check">
                <input type="checkbox"></input>
                <span>Ghi nhớ tôi cho lần đăng nhập kế tiếp</span>
              </div>
              <div className="form-button-submit" onClick={LoginMiddleware}>
                {isLoading ? (
                  <span>
                    <i className="fa-solid fa-spinner fa-spin"></i> Đang xử
                    lí...
                  </span>
                ) : (
                  "Đăng nhập"
                )}
              </div>
            </div>
          </div>
        )}

        {show === "register" && (
          <div className="dangnhap">
            <h5>Đăng ký tài khoản mới</h5>
            <div className="form-login">
              <select
                className="form-input-select"
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
              </select>
              <input
                className="form-input"
                placeholder="Họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRegister();
                  }
                }}
              ></input>
              <input
                className="form-input"
                placeholder="Email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRegister();
                  }
                }}
              ></input>
              <input
                className="form-input"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRegister();
                  }
                }}
              ></input>
              <div className="form-input-password">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Mật khẩu"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRegister();
                    }
                  }}
                ></input>
                <div className="form-button">
                  <i
                    onClick={togglePasswordVisibility}
                    className={`fa-solid ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </div>
              </div>
              <div className="form-input-code">
                <input
                  className="form-input"
                  placeholder="Mã xác thực"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                ></input>
                <div
                  className="form-button"
                  style={{ fontSize: "15px" }}
                  onClick={handleSendCode}
                >
                  {countdown !== 0 ? `${countdown} giây...` : "Gửi mã"}
                </div>
              </div>
              <input
                className="form-input"
                placeholder="Bạn đang ở tỉnh nào"
                value={tinh}
                onChange={(e) => setTinh(e.target.value)}
              ></input>
              <div className="form-input-check">
                <input
                  checked={check}
                  onChange={(e) => setCheck(e.target.checked)}
                  type="checkbox"
                ></input>
                <span>
                  Tôi đồng ý với tất cả{" "}
                  <Link to="/use" onClick={toggleLogin}>
                    điều khoản
                  </Link>{" "}
                  của CNcode
                </span>
              </div>
              <div className="form-button-submit" onClick={handleRegister}>
                {isLoading ? (
                  <span>
                    <i className="fa-solid fa-spinner fa-spin"></i> Đang xử
                    lí...
                  </span>
                ) : (
                  "Đăng ký"
                )}
              </div>
            </div>
          </div>
        )}

        {show === "forgot" && (
          <div className="dangnhap">
            <h5>Quên mật khẩu?</h5>
            <div className="form-login">
              <input
                className="form-input"
                placeholder="Email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRegister();
                  }
                }}
              ></input>
              <input
                className="form-input"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRegister();
                  }
                }}
              ></input>
              <div className="form-input-password">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Mật khẩu mới"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRegister();
                    }
                  }}
                ></input>
                <div className="form-button">
                  <i
                    onClick={togglePasswordVisibility}
                    className={`fa-solid ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </div>
              </div>
              <div className="form-input-code">
                <input
                  className="form-input"
                  placeholder="Mã xác thực"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                ></input>
                <div
                  className="form-button"
                  style={{ fontSize: "15px" }}
                  onClick={handleSendCode}
                >
                  {countdown !== 0 ? `${countdown} giây...` : "Gửi mã"}
                </div>
              </div>
              <div className="form-button-submit" onClick={handleForgot}>
                {isLoading ? (
                  <span>
                    <i className="fa-solid fa-spinner fa-spin"></i> Đang xử
                    lí...
                  </span>
                ) : (
                  "Lấy lại mật khẩu"
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
