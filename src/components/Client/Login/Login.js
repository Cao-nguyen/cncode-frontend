import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import HandleLogin from '../../../middlewares/LoginMiddleware';
import './Login.scss';

function Login({ toggleLogin, toggleRegister }) {
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
    } = HandleLogin(toggleLogin)

    return (
        <div className="form">
            <h1 className="text">ĐĂNG NHẬP</h1>
            <div className="form-content">
                <InputGroup className="form-input">
                    <Form.Control placeholder="Họ và tên*" aria-label="fullName" value={fullName}
                        onChange={(e) => setFullName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { LoginMiddleware() } }} />
                </InputGroup>
                <InputGroup className="form-input">
                    <Form.Control placeholder="Username*" aria-label="username" value={username}
                        onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { LoginMiddleware() } }} />
                </InputGroup>
                <InputGroup className="form-input">
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
                    <Link onClick={toggleRegister}>Đăng ký</Link>
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
            </div >
        </div>
    );
}

export default Login;
