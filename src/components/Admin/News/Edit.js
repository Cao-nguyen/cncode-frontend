import React, { useEffect, useState } from 'react'
import { ShowNew } from '../../../services/adminServer'
import Editor from '../../Service/Editor'
import { useNavigate, useParams } from 'react-router-dom'
import { EditNew } from '../../../services/adminServer'
import { toast } from 'react-toastify'
import './News.scss'

function Edit(props) {
    const navigate = useNavigate()

    const { id } = useParams()
    const [news, setNews] = useState([])
    const [currentNews, setCurrentNews] = useState({})

    useEffect(() => {
        const newsData = async () => {
            const data = await ShowNew()
            setNews(data.DT)
        }

        newsData()
    }, [])

    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (news.length > 0) {
            const selectedNews = news.find(item => item._id === id);
            setCurrentNews(selectedNews || null);
        }
    }, [id, news])

    const [isLoading, setIsLoading] = useState()

    const handleEdit = async () => {
        setIsLoading(true);
        const updatedNews = {
            id: currentNews._id,
            title: currentNews.title,
            description: currentNews.description,
            isChecked: currentNews.isChecked,
            show: currentNews.show,
            content: currentNews.content,
        };
        let data = await EditNew(
            updatedNews.id,
            updatedNews.title,
            updatedNews.description,
            updatedNews.isChecked,
            updatedNews.show,
            updatedNews.content
        );
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate("/admin/news");
        } else {
            toast.error(data.EM);
        }
        setIsLoading(false);
    };

    return (
        <div className="admin">
            <div className="header-create">
                <i className="fa-solid fa-arrow-left" onClick={handleBack}></i>
            </div>
            <div className="form-group grid">
                <input className="form-control" placeholder="Id bài viết*" disabled value={currentNews._id}></input>
                <input className="form-control" placeholder="Tiêu đề bài viết*" value={currentNews.title || ''} onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}></input>
            </div>
            <div className="form-group grid">
                <input className="form-control" placeholder="tác giả*" disabled value={currentNews.fullName}></input>
                <input className="form-control" placeholder="slug*" value={currentNews.slug || ''} onChange={(e) => setCurrentNews({ ...currentNews, slug: e.target.value })}></input>
            </div>
            <div className="form-group grid-two">
                <input className="form-control" placeholder="Mô tả ngắn*" value={currentNews.description} onChange={(e) => setCurrentNews({ ...currentNews, description: e.target.value })}></input>
                <div className="form-control">
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            checked={currentNews.isChecked}
                            onChange={(e) => setCurrentNews({ ...currentNews, isChecked: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{currentNews.isChecked ? "Phát hành" : "Bản nháp"}</label>
                    </div>
                </div>
                <select
                    value={currentNews.show ?? ''}
                    onChange={(e) => setCurrentNews({ ...currentNews, show: e.target.value === 'true' })}
                    className="form-control form-select"
                >
                    <option value="" disabled>Chọn hiển thị</option>
                    <option value="true">Công khai</option>
                    <option value="false">Riêng tư</option>
                </select>
            </div>
            <div className="form-content" >
                <Editor value={currentNews.content} onChange={(e) => setCurrentNews({ ...currentNews, content: e.target.value })} />
            </div>
            <div className="btn-control btn btn-primary" onClick={handleEdit}>
                {isLoading ? (
                    <span>
                        <i className="fa-solid fa-spinner fa-spin"></i> Đang xử lý...
                    </span>
                ) : (
                    "Đăng bài"
                )}
            </div>
        </div >
    )
}

export default Edit