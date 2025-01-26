import React, { useEffect, useState } from 'react';
import { ShowNewClient, NewsLike } from '../../../services/clientServer';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { useQuery } from '@tanstack/react-query'
import moment from 'moment';
import { useSelector } from 'react-redux';
import './Tintuc.scss';

function Show(props) {
    const { slug } = useParams();
    const [currentNews, setCurrentNews] = useState();
    const [isVisible, setIsVisible] = useState(false);

    const { data: news, refetch } = useQuery({
        queryKey: ['news'],
        queryFn: ShowNewClient,
    });

    useEffect(() => {
        if (news) {
            setIsVisible(true);
        }

        if (news.DT.length > 0) {
            const selectedNews = news.DT.find(item => item.slug === slug);
            setCurrentNews(selectedNews || null);
        }
    }, [slug, news]);

    const fullName = useSelector(state => state.user.account.fullName);

    const handleLove = async () => {
        if (fullName === "") {
            window.alert("Vui lòng đăng nhập để thả tim cho tin tức")
            return
        }

        const data = await NewsLike(fullName, slug);

        if (data && data.EC === 0) {
            refetch()
        }
    };

    return (
        <div>
            <div className="container">
                {currentNews &&
                    <div className={`show_tintuc fade-in ${isVisible ? 'visible' : ''}`}>
                        <div className="show_tintuc_item">
                            <h3>{currentNews.title}</h3>
                            <p className="description">{currentNews.description}</p>
                            <div className="tintuc_grid">
                                {currentNews.emotion.some(emotion => emotion.name === fullName)
                                    ? (
                                        <p>
                                            <i className="fa-solid fa-heart"></i>
                                            {currentNews.emotion.length}
                                        </p>
                                    ) : (
                                        <p onClick={handleLove}>
                                            <i className="fa-regular fa-heart"></i>
                                            {currentNews.emotion.length}
                                        </p>
                                    )
                                }
                                <p>
                                    <i className="fa-regular fa-comment"></i>
                                    0
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
