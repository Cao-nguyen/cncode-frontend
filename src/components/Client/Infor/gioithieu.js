import React, { useEffect } from 'react';
import SettingsAdmin from '../../../middlewares/SettingsAdmin'

function Gioithieu(props) {
    const {
        Infor,
        getInfor
    } = SettingsAdmin()

    useEffect(() => {
        getInfor();
    }, [getInfor]);

    return (
        <div className="container pt-5">
            <div className="pt-5" dangerouslySetInnerHTML={{ __html: Infor }}></div>
        </div>
    );
}

export default Gioithieu;