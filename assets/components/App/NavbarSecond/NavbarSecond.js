import React from "react";

import './NavbarSecond.css';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function NavbarSecond(props) {

    const renderSwitch = (selectedNavbarItem) => {

        switch (selectedNavbarItem) {
            case 'muzika':
                return (
                    <div className="navbar-second">
                        <Link className="ml-1" to="/">Pagrindinis</Link> /
                        <Link className="ml-1" to="/top40">Music.lt TOP40</Link> /
                        <Link className="ml-1" to="/top30lt">Lietuvos TOP30</Link> /
                        <Link className="ml-1" to="/galerija">Galerija</Link>
                    </div>
                );
            case 'pramogos':
                return (
                    <div className="navbar-second">
                        todo
                    </div>
                );
            case 'informacija':
                return (
                    <div className="navbar-second">
                        todo2
                    </div>
                );
            case 'bendruomene':
                return (
                    <div className="navbar-second">
                        todo3
                    </div>
                );
            case 'kita':
                return (
                    <div className="navbar-second">
                        todo4
                    </div>
                );
            default:
                return (<div className="navbar-second">
                </div>)
        }
    }

    return (
        renderSwitch(props.selectedNavbarItem)
    );
}


NavbarSecond.propTypes = {
    selectedNavbarItem: PropTypes.string
};
export default NavbarSecond;