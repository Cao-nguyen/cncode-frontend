import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import './Tab.scss';
import { Nav } from 'react-bootstrap';

const Tab = () => {
    return (
        <div className="tab">
            <div className="tab-items">
                <div className="tab-icon">
                    <img src={logo} alt=""></img>
                </div>
                <div className="tab-links">CNcode</div>
            </div>

            <NavLink className="tab-item" to='/admin/dashboard'>
                <div className="tab-icon">
                    <i className="fa-solid fa-house"></i>
                </div>
                <div className="tab-link">Tổng quan</div>
            </NavLink>

            <NavLink className="tab-item" to='/admin/cao'>
                <div className="tab-icon">
                    <i className="fa-solid fa-palette"></i>
                </div>
                <div className="tab-link">Giao diện</div>
            </NavLink>

            <NavLink className="tab-item" to='/admin/cao'>
                <div className="tab-icon">
                    <i className="fa-solid fa-gear"></i>
                </div>
                <div className="tab-link">Cài đặt chung</div>
            </NavLink>
        </div>
    );
};

export default Tab;
