import React from 'react';

import './MobileNavbar.css';
import {Link} from "react-router-dom";

function MobileNavbar() {
    return (
        <div className="mobile-navbar">
            <Link to="/"><i className="fas fa-rss"/><br/>Srautas</Link>
            <Link to="/paieska"><i className="fas fa-search"/><br/>Paieška</Link>
            <Link to="/ikelti"><i className="fas fa-plus-circle"/><br/>Įkelti</Link>
            <Link to="/draugai"><i className="fas fa-users"/><br/>Draugai</Link>
            <Link to="/profilis"><i className="fas fa-user"/><br/>Profilis</Link>
        </div>
    );
}

export default MobileNavbar;