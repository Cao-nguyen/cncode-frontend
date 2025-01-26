import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-cshtml.min.js';
import 'prismjs/components/prism-css.min.js';
import { useQuery } from '@tanstack/react-query';
import { getInforApi } from '../../../services/adminServer';
import './gioithieu.scss';

function Gioithieu() {
    const { data: Infor, isLoading, error } = useQuery({
        queryKey: ['Infor'],
        queryFn: getInforApi,
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (Infor) {
            Prism.highlightAll();
            setIsVisible(true);
        }
    }, [Infor]);

    if (isLoading) {
        return (
            <div className="pt-5">
                <h2 className="pt-5 text-center text-primary">Đang tải dữ liệu...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <h2 className="pt-5 text-center text-danger">Lỗi khi tải dữ liệu</h2>
        );
    }

    return (
        <div className="container pt-lg-5">
            <div className="pt-5">
                <div
                    className={`preview fade-in ${isVisible ? 'visible' : ''}`}
                    dangerouslySetInnerHTML={{
                        __html: marked(Infor.DT.replace(/\n/g, '  \n')),
                    }}
                ></div>
            </div>
        </div>
    );
}

export default Gioithieu;
