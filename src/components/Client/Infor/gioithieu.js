import React, { Suspense, useEffect } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-cshtml.min.js';
import 'prismjs/components/prism-css.min.js';
import { useQuery } from '@tanstack/react-query'; // React Query
import { getInforApi } from '../../../services/adminServer';
import './gioithieu.scss';

// Component để render dữ liệu
function Gioithieu() {
    // Sử dụng Suspense để tối ưu việc hiển thị khi dữ liệu đang tải
    const { data: Infor } = useQuery({
        queryKey: ['Infor'],
        queryFn: getInforApi,
        suspense: true, // Bật Suspense cho query này
    });

    // Highlight code khi dữ liệu đã tải
    useEffect(() => {
        if (Infor) {
            Prism.highlightAll();
        }
    }, [Infor]);

    return (
        <div className="container pt-lg-5">
            <div className="pt-5">
                <div
                    className="preview"
                    dangerouslySetInnerHTML={{
                        __html: marked(Infor.DT.replace(/\n/g, '  \n')),
                    }}
                ></div>
            </div>
        </div>
    );
}

// Component chính với Suspense wrapper
function GioithieuWrapper() {
    return (
        <Suspense fallback={<h2 className="pt-5 text-center text-primary">Đang tải dữ liệu...</h2>}>
            <Gioithieu />
        </Suspense>
    );
}

export default GioithieuWrapper;
