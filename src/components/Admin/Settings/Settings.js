import React, { useEffect } from 'react';
import SettingsAdmin from '../../../middlewares/SettingsAdmin';
import Editor from '../../Service/Editor';
import './Settings.scss';

function Settings(props) {
    const {
        Infor,
        setInfor,
        saveInfor,
        getInfor,
    } = SettingsAdmin();

    useEffect(() => {
        getInfor();
    }, [getInfor]);

    return (
        <div>
            <div className="gioithieu">
                <h1 className="text-center">Thông tin giới thiệu</h1>
                <div className="border mb-3"></div>
                <button className="btn btn-primary mb-2" onClick={saveInfor}>
                    Lưu thông tin
                </button>
                <Editor value={Infor} onChange={setInfor} />
            </div>
        </div>
    );
}

export default Settings;