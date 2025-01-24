import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowNew } from '../../../services/adminServer';
import './News.scss';

function News(props) {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleCreate = () => {
        navigate('/admin/news/create');
    };

    const [news, setNews] = useState([]);

    useEffect(() => {
        const newsData = async () => {
            const data = await ShowNew();
            setNews(data.DT);
        };

        newsData();
    }, []);

    const handleRefresh = async () => {
        const data = await ShowNew();
        setNews(data.DT);
    };

    const [showDropdown, setShowDropdown] = useState(null);

    const handleAction = (id) => {
        setShowDropdown((prev) => (prev === id ? null : id));
    };

    const handleEdit = (id) => {
        navigate(`/admin/news/edit/${id}`)
    }

    return (
        <>
            <div className="admin">
                <div className="admin-news">
                    <div className="btn btn-primary" onClick={handleBack}>
                        <i className="fa-solid fa-arrow-left"></i>
                        Trở về
                    </div>
                    <div className="btn btn-primary" onClick={handleRefresh}>
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
                    {news && news.length > 0 ? (
                        news.map((item) => (
                            <div className="admin-content-item" key={item._id}>
                                <p className="id">{item._id}</p>
                                <p className="title">{item.title}</p>
                                <p className="right">{item.fullName}</p>
                                <p className="actives">
                                    {item.isChecked ? 'Phát hành' : 'Bản nháp'}
                                </p>
                                <p className="show">
                                    {item.show ? 'Công khai' : 'Không công khai'}
                                </p>
                                <p className="action">
                                    <i
                                        className="btn btn-primary fa-solid fa-ellipsis-vertical"
                                        onClick={() => handleAction(item._id)}
                                    ></i>
                                    {showDropdown === item._id && (
                                        <div className="dropdown">
                                            <div className="dropdown-links">
                                                <i className="fa-solid fa-eye"></i>
                                                <div className="text">Xem trước</div>
                                            </div>
                                            <div className="dropdown-links">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                                <div className="text" onClick={() => handleEdit(item._id)}>Chỉnh sửa</div>
                                            </div>
                                            <div className="dropdown-links">
                                                <i className="fa-solid fa-delete-left"></i>
                                                <div className="text">Xoá</div>
                                            </div>
                                        </div>
                                    )}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </>
    );
}

export default News;