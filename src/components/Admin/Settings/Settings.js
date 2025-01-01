import React from 'react';
import TinyMCE from '../../Service/TinyMCE';

function Settings(props) {
    return (
        <div>
            <div className="gioithieu">
                <h1>Thông tin giới thiệu</h1>
                <div className="border"></div>
                <TinyMCE />
            </div>
        </div>
    );
}

export default Settings;