import React from 'react';
import PropTypes from 'prop-types';
import MobileNavbar from "../MobileNavbar/MobileNavbar";

function Navbar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <a className="navbar-brand" href="#">MUSIC.LT</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={props.selectedNavbarItem === 'muzika' ? 'nav-item active' : 'nav-item'}>
                            <a onClick={() => props.selectNavbarItemHandler('muzika')} className="nav-link">Muzika</a>
                        </li>
                        <li className={props.selectedNavbarItem === 'pramogos' ? 'nav-item active' : 'nav-item'}>
                            <a onClick={() => props.selectNavbarItemHandler('pramogos')}  className="nav-link">Pramogos</a>
                        </li>
                        <li className={props.selectedNavbarItem === 'informacija' ? 'nav-item active' : 'nav-item'}>
                            <a onClick={() => props.selectNavbarItemHandler('informacija')} className="nav-link">Informacija</a>
                        </li>
                        <li className={props.selectedNavbarItem === 'bendruomene' ? 'nav-item active' : 'nav-item'}>
                            <a onClick={() => props.selectNavbarItemHandler('bendruomene')} className="nav-link">Bendruomenė</a>
                        </li>
                        <li className={props.selectedNavbarItem === 'kita' ? 'nav-item active' : 'nav-item'}>
                            <a onClick={() => props.selectNavbarItemHandler('kita')} className="nav-link">Kita</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <MobileNavbar />
        </div>
    );
}

Navbar.propTypes = {
    selectedNavbarItem: PropTypes.string,
    selectNavbarItemHandler: PropTypes.func
};

export default Navbar;