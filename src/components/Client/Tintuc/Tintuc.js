import React, { useEffect, useState } from 'react';
import { ShowNewClient } from '../../../services/clientServer';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Tintuc.scss'

function Tintuc(props) {
    const [isVisible, setIsVisible] = useState(false);

    const [news, setNews] = useState([])

    useEffect(() => {
        const newsData = async () => {
            const data = await ShowNewClient()
            setNews(data.DT)
            setIsVisible(true);
        }

        newsData()
    }, [])

    return (
        <div className="container">
            <div className={`news fade-in ${isVisible ? 'visible' : ''}`}>
                {news.map(item => (
                    <div className="news-item" key={item._id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="news-text">
                            <p>{item.fullName}</p>
                            <p>{moment(item.createdAt).format('DD/MM/YYYY')}</p>
                        </div>
                        <div className="btn btn-primary">
                            <Link to={`/tintuc/${item.slug}`}>Xem thêm</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Tintuc;