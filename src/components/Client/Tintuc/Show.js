import React, { useEffect, useState } from 'react';
import { ShowNewClient } from '../../../services/clientServer';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import moment from 'moment';
import './Tintuc.scss'

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

    return (
        <div>
            <div className="container">
                {currentNews &&
                    <div className="show_tintuc">
                        <div className="show_tintuc_item">
                            <h3>{currentNews.title}</h3>
                            <p className="description">{currentNews.description}</p>
                            <div className="tintuc_grid">
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