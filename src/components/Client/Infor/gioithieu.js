import React, { useEffect, useState } from 'react'
import SettingsAdmin from '../../../middlewares/SettingsAdmin'
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";

function Gioithieu(props) {
    const { Infor, setInfor, getInfor } = SettingsAdmin();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const rawData = await getInfor()

            const parser = new DOMParser();
            const doc = parser.parseFromString(rawData, "text/html");

            doc.querySelectorAll("pre code").forEach((codeBlock) => {
                if (!codeBlock.className) {
                    codeBlock.className = "language-python";
                }
            });

            const updatedHTML = doc.body.innerHTML;
            setLoading(false);

            setInfor(updatedHTML);
        };

        fetchData();
    }, [getInfor]);

    return (
        <div className="container pt-5">
            {loading ? (
                <h2 className="pt-5 text-center text-primary">Đang tải dữ liệu...</h2>
            ) : (
                <div className="pt-5" dangerouslySetInnerHTML={{ __html: Infor }}></div>
            )}
        </div>
    );
}

export default Gioithieu;