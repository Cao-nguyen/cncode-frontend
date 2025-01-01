import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
    const fullName = useSelector(state => state.user.account.fullName)

    return (
        <div className="text-center mt-2">
            <h1>Trang quản trị</h1>
            <p>Chào mừng {fullName} đã quay trở lại với trang quản trị.</p>
        </div>
    );
}

export default Dashboard;
