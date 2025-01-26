import React, { useEffect, useState } from 'react';
import { ShowNewClient, NewsLike } from '../../../services/clientServer';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import moment from 'moment';
import './Tintuc.scss'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Show(props) {
    const { slug } = useParams()

    const [news, setNews] = useState([])

    useEffect(() => {
        const newsData = async () => {
            const data = await ShowNewClient()
            setNews(data.DT)
        }

        newsData()
    }, [])

    const [currentNews, setCurrentNews] = useState()

    useEffect(() => {
        if (news.length > 0) {
            const selectedNews = news.find(item => item.slug === slug);
            setCurrentNews(selectedNews || null);
        }
    }, [slug, news])

    const fullName = useSelector(state => state.user.account.fullName);

    const handleLove = async () => {
        const data = await NewsLike(fullName, slug);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            setCurrentNews({
                ...currentNews,
                like: currentNews.like + 1
            });
        } else {
            toast.error(data.EM || "Đã xảy ra lỗi!");
        }
    };

    console.log(currentNews)

    return (
        <div>
            <div className="container">
                {currentNews &&
                    <div className="show_tintuc">
                        <div className="show_tintuc_item">
                            <h3>{currentNews.title}</h3>
                            <p className="description">{currentNews.description}</p>
                            <div className="tintuc_grid">
                                {currentNews.emotion.some(emotion => emotion.name === fullName)
                                    ? (
                                        <p>
                                            <i className="fa-solid fa-heart"></i>
                                            {currentNews.like}
                                        </p>
                                    ) : (
                                        <p onClick={handleLove}>
                                            <i className="fa-regular fa-heart"></i>
                                            {currentNews.like}
                                        </p>
                                    )
                                }
                                <p>
                                    <i className="fa-regular fa-comment"></i>
                                    {currentNews.like}
                                </p>
                                <p>Người đăng: {currentNews.fullName}</p>
                                <p>
                                    <i className="fa-solid fa-calendar-days"></i>
                                    Ngày đăng: {moment(currentNews.createdAt).format("DD/MM/YYYY - HH:mm:ss")}
                                </p>
                            </div>
                        </div>
                        <div className="show_content">
                            <div className="preview show_content_item mt-2" dangerouslySetInnerHTML={{
                                __html: marked((currentNews.content || "").replace(/\n/g, '  \n'))
                            }}></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Show;