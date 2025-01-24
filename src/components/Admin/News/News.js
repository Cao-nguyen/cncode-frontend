import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './News.scss'

function News(props) {
    // Cấu hình
    const nagivate = useNavigate()

    const handleBack = () => {
        nagivate(-1)
    }

    const handleCreate = () => {
        nagivate('/admin/news/create')
    }

    const [show, setShow] = useState(false)
    const handleAction = () => {
        setShow(!show)
    }

    return (
        <>
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
                    <div className="btn btn-primary" onClick={handleCreate}>
                        <i className="fa-solid fa-plus"></i>
                        Thêm mới
                    </div>
                </div>

                <div className="admin-content">
                    <div className="admin-content-item">
                        <p className="id">Id</p>
                        <p className="title">Tiêu đề</p>
                        <p className="right">Tác giả</p>
                        <p className="actives">Trạng thái</p>
                        <p className="show">Hiển thị</p>
                        <p className="action"></p>
                    </div>
                    <div className="admin-content-item">
                        <p className="id">8000</p>
                        <p className="title">Tiêu đề</p>
                        <p className="right">Tác giả</p>
                        <p className="actives">Phát hành</p>
                        <p className="show">Công khai</p>
                        <p className="action">
                            <i className="btn btn-primary fa-solid fa-ellipsis-vertical" onClick={handleAction}></i>
                            {show &&
                                <>
                                    <div className="dropdown">
                                        <div className="dropdown-links">
                                            <i className="fa-solid fa-eye"></i>
                                            <div className="text">Xem trước</div>
                                        </div>
                                        <div className="dropdown-links">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                            <div className="text">Chỉnh sửa</div>
                                        </div>
                                        <div className="dropdown-links">
                                            <i className="fa-solid fa-delete-left"></i>
                                            <div className="text">Xoá</div>
                                        </div>
                                    </div>
                                </>
                            }
                        </p>
                    </div>
                </div>
            </div >
        </>
    );
}

export default News;