import React, { useEffect } from 'react';
import './Themes.scss'

function Themes(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="admin">
            <h1>Cao Nguyên</h1>
        </div>
    );
}

export default Themes;