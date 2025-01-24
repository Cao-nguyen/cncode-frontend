import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './News.scss'
import { NewsCreateValidate } from '../../../validates/NewsCreateValidate';
import { CreateNew } from '../../../services/adminServer';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Editor from '../../Service/Editor'

function Create(props) {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    const [title, setTitle] = useState()
    const [isChecked, setIsChecked] = useState(false)
    const [show, setShow] = useState()
    const [description, setDescription] = useState()
    const [content, setContent] = useState()
    const fullName = useSelector(state => state.user.account.fullName);
    const [isLoading, setIsLoading] = useState()

    const handleActives = () => {
        setIsChecked(!isChecked)
    }

    const handleSubmitNews = async () => {
        let check = NewsCreateValidate(title, content)

        if (check === true) {
            setIsLoading(true)
            let data = await CreateNew(title, isChecked, show, description, content, fullName)
            if (data && data.EC === 0) {
                toast.success(data.EM)
                navigate("/admin/news")
            } else {
                toast.error(data.EM)
            }
            setIsLoading(false)
        }
    }

    return (
        <div className="admin">
            <div className="header-create">
                <i className="fa-solid fa-arrow-left" onClick={handleBack}></i>
            </div>
            <div className="form-group grid">
                <input className="form-control" placeholder="Id bài viết*" disabled></input>
                <input className="form-control" placeholder="Tiêu đề bài viết*" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div className="form-group grid-two">
                <input className="form-control" placeholder="Mô tả ngắn*" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                <div className="form-control">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" value={isChecked} checked={isChecked} onChange={handleActives} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{isChecked ? "Phát hành" : "Bản nháp"}</label>
                    </div>
                </div>
                <select value={show} onChange={(e) => setShow(e.target.value)} class="form-control form-select" aria-label="Default select example">
                    <option value="" disabled>Chọn hiển thị</option>
                    <option value="true">Công khai</option>
                    <option value="false">Riêng tư</option>
                </select>
            </div>
            <div className="form-content" >
                <Editor value={content} onChange={setContent} />
            </div>
            <div className="btn-control btn btn-primary" onClick={handleSubmitNews}>
                {isLoading ? (
                    <span>
                        <i className="fa-solid fa-spinner fa-spin"></i> Đang xử lý...
                    </span>
                ) : (
                    "Đăng bài"
                )}
            </div>
        </div>
    );
}

export default Create;