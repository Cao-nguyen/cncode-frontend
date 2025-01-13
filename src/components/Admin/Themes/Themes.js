import React, { useEffect } from 'react';
import './Themes.scss'

function Themes(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="admin-themes">
            <div className="tabs">
                <div className="tab">
                    <h3>Giao diện mặc định</h3>
                    <i className="fa-solid fa-list-check"></i>
                </div>

                <div className="tab">
                    <h3>Giao diện tết (1/1)</h3>
                    <i className="fa-solid fa-list-check"></i>
                </div>

                <div className="tab">
                    <h3>Quốc tế phụ nữ (8/3)</h3>
                    <i className="fa-solid fa-list-check"></i>
                </div>

                <div className="tab">
                    <h3>Sinh nhật CNcode (15/2)</h3>
                    <i className="fa-solid fa-list-check"></i>
                </div>

                <div className="tab">
                    <h3>Chiến thắng ĐBP (7/5)</h3>
                    <i className="fa-solid fa-list-check"></i>
                </div>

                <div className="tab">
                    <h3>Tết trung thu (15/8)</h3>
                    <i className="fa-solid fa-list-check"></i>
                </div>

                <div className="tab">
                    <h3>Ngày phụ nữ Việt Nam (20/10)</h3>
                    <i className="fa-solid fa-list-check"></i>
                </div>

                <div className="tab">
                    <h3>Sinh nhật tác giả (28/10)</h3>
                    <i className="fa-solid fa-list-check"></i>
                </div>

                <div className="tab">
                    <h3>Lễ hội hallowen (31/10)</h3>
                    <i className="fa-solid fa-list-check"></i>
                </div>

                <div className="tab">
                    <h3>Nhà giáo Việt Nam (20/11)</h3>
                    <i className="fa-solid fa-list-check"></i>
                </div>

                <div className="tab">
                    <h3>Giáng sinh (noel 25/12)</h3>
                    <i className="fa-solid fa-list-check"></i>
                </div>
            </div>
        </div>
    );
}

export default Themes;