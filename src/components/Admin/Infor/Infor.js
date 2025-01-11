import React, { useEffect } from 'react';
import SettingsAdmin from '../../../middlewares/SettingsAdmin';
import Editor from '../../Service/Editor';
import { useNavigate } from 'react-router-dom';
import './Infor.scss';

function Infor(props) {
    const nagivate = useNavigate()

    const {
        Infor,
        setInfor,
        saveInfor,
        getInfor,
    } = SettingsAdmin();

    const back = () => {
        nagivate(-1)
    }

    useEffect(() => {
        getInfor();
    }, [getInfor]);

    return (
        <div>
            <div className="gioithieu">
                <h1 className="text-center">Thông tin giới thiệu</h1>
                <div className="border mb-3"></div>
                <button className="btn btn-dark mb-2" onClick={back}>
                    Trở về
                </button>
                <button className="btn btn-primary mb-2" onClick={saveInfor}>
                    Lưu thông tin
                </button>
                <Editor value={Infor} onChange={setInfor} />
            </div>
        </div>
    );
}

export default Infor;