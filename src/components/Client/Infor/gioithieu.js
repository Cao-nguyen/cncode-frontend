import React, { useEffect, useState } from 'react'
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-cshtml.min.js';
import 'prismjs/components/prism-css.min.js';
import SettingsAdmin from '../../../middlewares/SettingsAdmin'
import './gioithieu.scss'

function Gioithieu(props) {
    const { Infor, getInfor } = SettingsAdmin();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getInfor();
            setLoading(false);
        };
        fetchData();
    }, [getInfor]);

    useEffect(() => {
        Prism.highlightAll();
    }, [Infor]);

    return (
        <div className="container pt-5">
            {loading ? (
                <h2 className="pt-5 text-center text-primary">Đang tải dữ liệu...</h2>
            ) : (
                <div className="pt-5">
                    <div className="preview" dangerouslySetInnerHTML={{ __html: marked(Infor.replace(/\n/g, '  \n')) }}></div>
                </div>
            )}
        </div>
    );
}

export default Gioithieu;