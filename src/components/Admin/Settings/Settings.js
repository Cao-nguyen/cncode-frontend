import React, { useEffect } from 'react';
import './Settings.scss'
import { NavLink } from 'react-router-dom';

function Settings(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="admin">
            <div className="tabs">
                <div className="tab">
                    <h3>Thông tin giới thiệu</h3>
                    <NavLink to="/admin/settings/infor">
                        <i className="fa-solid fa-list-check"></i>
                    </NavLink>
                </div>

                <div className="tab">
                    <h3>Chính sách bảo mật</h3>
                    <NavLink to="/admin/settings/ssl">
                        <i className="fa-solid fa-list-check"></i>
                    </NavLink>
                </div>

                <div className="tab">
                    <h3>Điều khoản sử dụng</h3>
                    <NavLink to="/admin/settings/use">
                        <i className="fa-solid fa-list-check"></i>
                    </NavLink>
                </div>

                <div className="tab">
                    <h3>Chính sách thành viên</h3>
                    <NavLink to="/admin/settings/members">
                        <i className="fa-solid fa-list-check"></i>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Settings;