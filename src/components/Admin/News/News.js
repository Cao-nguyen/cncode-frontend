import React from 'react';
import { useNavigate } from 'react-router-dom';
import './News.scss'

function News(props) {
    // Cấu hình
    const nagivate = useNavigate()

    const handleBack = () => {
        nagivate(-1)
    }

    return (
        <div className="admin">
            <div className="admin-news">
                <div className="btn btn-primary" onClick={handleBack}>
                    <i className="fa-solid fa-arrow-left"></i>
                    Trở về
                </div>
                <div className="btn btn-primary">
                    <i className="fa-solid fa-arrows-rotate"></i>
                    Tải lại
                </div>
                <div className="btn btn-primary">
                    <i className="fa-solid fa-plus"></i>
                    Thêm mới
                </div>
            </div>

            <div className="admin-content">
                <div className="news-show-item">
                    <h3>Đề Tin học gây hoang mang đối với nhiều thí sinh</h3>
                    <p>Lý Cao Nguyên sinh ngày 28/10/2009, hiện đang học lớp 10A10 (năm học 2024 - 2025) tại trường THPT Tân Quới, huyện Bình Tân, tỉnh Vĩnh Long. Với niềm đam mê Tin học và Ngữ văn, Lý Cao Nguyên đã lên ý tưởng, thiết kế và sáng tạo ra website CNcode®.</p>
                    <div className="news-button">
                        <div className="btn btn-primary">
                            <i className="fa-solid fa-eye"></i>
                        </div>
                        <div className="btn btn-primary">
                            <i className="fa-solid fa-pen"></i>
                        </div>
                        <div className="btn btn-danger">
                            <i className="fa-solid fa-x"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;