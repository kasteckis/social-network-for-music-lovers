import React from 'react';

function MobileNavbar() {
    return (
        <div className="mobile-navbar">
            <a href="#home" className="active"><i className="fas fa-rss"/><br/>Srautas</a>
            <a href="#news"><i className="fas fa-search"/><br/>Paieška</a>
            <a href="#contact"><i className="fas fa-plus-circle"/><br/>Įkelti</a>
            <a href="#contact"><i className="fas fa-users"/><br/>Draugai</a>
            <a href="#contact"><i className="fas fa-user"/><br/>Profilis</a>
        </div>
    );
}

export default MobileNavbar;