import React from 'react';
import { Helmet } from 'react-helmet';

function Trangchu(props) {
    return (
        <div className="container">
            <Helmet>
                <title>CNcode | Trang chủ</title>
            </Helmet>
            <h1 className="mt-3 text-center text-primary">CNcode - Dạy học lập trình miễn phí</h1>
            <h2 className="mt-3 text-center">Dự án đang được phát triển bởi Lý Cao Nguyên</h2>
        </div>
    );
}

export default Trangchu;