import React, { useEffect, useState } from 'react'
import SettingsAdmin from '../../../middlewares/SettingsAdmin'

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