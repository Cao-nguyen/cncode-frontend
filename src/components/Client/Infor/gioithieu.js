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
                <div className="pt-5">Đang tải...</div>
            ) : (
                <div className="pt-5" dangerouslySetInnerHTML={{ __html: Infor }}></div>
            )}
        </div>
    );
}

export default Gioithieu;