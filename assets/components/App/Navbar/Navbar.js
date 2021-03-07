import React from 'react';
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
                        <li className="nav-item">
                            <a onClick={() => console.log("test")} className="nav-link">Muzika</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Pramogos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Informacija</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Bendruomenė</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Kita</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <MobileNavbar />
        </div>
    );
}

export default Navbar;