import React from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-cshtml.min.js';
import 'prismjs/components/prism-css.min.js';
import { useQuery } from '@tanstack/react-query'; // Đảm bảo đã cài version v5
import { getInforApi } from '../../../services/adminServer';
import './gioithieu.scss';

function Gioithieu() {
    const { data: Infor, isLoading, error } = useQuery({
        queryKey: ['Infor'], // Thay thế 'queryKey' cho đúng với React Query v5
        queryFn: getInforApi, // Hàm gọi API
    });

    console.log(Infor)

    // Highlight code với Prism.js khi dữ liệu được tải thành công
    React.useEffect(() => {
        if (Infor) {
            Prism.highlightAll();
        }
    }, [Infor]);

    if (isLoading) {
        return (
            <h2 className="pt-5 text-center text-primary">Đang tải dữ liệu...</h2>
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
                    className="preview"
                    dangerouslySetInnerHTML={{
                        __html: marked(Infor.DT.replace(/\n/g, '  \n')),
                    }}
                ></div>
            </div>
        </div>
    );
}

export default Gioithieu;
