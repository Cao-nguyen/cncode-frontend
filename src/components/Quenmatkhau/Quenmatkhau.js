import React from 'react';
import useDangkyMiddleware from '../../middlewares/dangkyMiddleware';

function Quenmatkhau(props) {
    const {
        fullName,
        username,
        password,
        email,
        setFullname,
        setUsername,
        setEmail,
        setPassword,
        handleForgotPassword
    } = useDangkyMiddleware()

    return (
        <div className="container">
            <div className="row form-group">
                <div className="col-3"></div>
                <div className="col-6">
                    <h1 className="text-center text-primary">LẤY LẠI MẬT KHẨU</h1>
                    <input className="form-control mt-2" placeholder="Họ và tên*" value={fullName}
                        onChange={(e) => setFullname(e.target.value)}
                    ></input>
                    <input className="form-control mt-2" placeholder="Username*" value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <input className="form-control mt-2" placeholder="Email*" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <input className="form-control mt-2" placeholder="Mật khẩu mới*" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button className="btn btn-primary mt-2 w-100" onClick={handleForgotPassword}>Lấy lại mật khẩu</button>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    );
}

export default Quenmatkhau;