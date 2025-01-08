import React, { useEffect } from 'react';
import QuillEditor from '../../Service/QuillEditor';
import SettingsAdmin from '../../../middlewares/SettingsAdmin';
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
                <QuillEditor value={Infor} onChange={setInfor} />
            </div>

            <div className="gioithieu">
                <h1 className="text-center">Chính sách bảo mật</h1>
                <div className="border mb-3"></div>
                <button className="btn btn-primary mb-2">
                    Lưu thông tin
                </button>
                <QuillEditor />
            </div>

            <div className="gioithieu">
                <h1 className="text-center">Điều khoản sử dụng</h1>
                <div className="border mb-3"></div>
                <button className="btn btn-primary mb-2">
                    Lưu thông tin
                </button>
                <QuillEditor />
            </div>

            <div className="gioithieu">
                <h1 className="text-center">Chính sách thành viên</h1>
                <div className="border mb-3"></div>
                <button className="btn btn-primary mb-2">
                    Lưu thông tin
                </button>
                <QuillEditor />
            </div>
        </div>
    );
}

export default Settings;