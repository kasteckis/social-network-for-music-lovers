import React from "react";

import './NavbarSecond.css';
import {Link} from "react-router-dom";

function NavbarSecond() {
    return (
        <div className="navbar-second">
            <Link className="ml-1" to="/">Pagrindinis</Link> /
            <Link className="ml-1" to="/top40">Music.lt TOP40</Link> /
            <Link className="ml-1" to="/top30lt">Lietuvos TOP30</Link> /
            <Link className="ml-1" to="/galerija">Galerija</Link>
        </div>
    );
}

export default NavbarSecond;