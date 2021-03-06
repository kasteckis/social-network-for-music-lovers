import React from 'react';

import './App.css';

function App() {
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
                            <a className="nav-link" href="#">Muzika</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pramogos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Informacija</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Bendruomenė</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Kita</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="mobile-navbar">
                <a href="#home" className="active"><i className="fas fa-rss"/><br/>Srautas</a>
                <a href="#news"><i className="fas fa-search"/><br/>Paieška</a>
                <a href="#contact"><i className="fas fa-plus-circle"/><br/>Įkelti</a>
                <a href="#contact"><i className="fas fa-users"/><br/>Draugai</a>
                <a href="#contact"><i className="fas fa-user"/><br/>Profilis</a>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 col-md-9">

                        <div className="navbar-second">
                            <a href="#" className="ml-1">Pagrindinis</a> /
                            <a href="top40.html" className="ml-1">Music.lt TOP40</a> /
                            <a href="#" className="ml-1">Lietuvos TOP30</a> /
                            <a href="#" className="ml-1">Galerija</a>
                        </div>

                        <div className="card mt-2">
                            <img className="card-img-top"
                                 src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                                 alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">Straipsnio pavadinimas</h5>
                                    <p className="card-text">Straipsnio contentasStraipsnio contentasStraipsnio
                                        contentasStraipsnio contentasStraipsnio contentasStraipsnio contentasStraipsnio
                                        contentasStraipsnio contentasStraipsnio contentasStraipsnio contentasStraipsnio
                                        contentas</p>
                                    <a href="#">Skaityti daugiau</a>
                                    <iframe src="https://open.spotify.com/embed/playlist/3SWozV3F6KrBg69SBRyTod"
                                            width="100%" height="80" frameBorder="0" allowTransparency="true"
                                            allow="encrypted-media"/>
                                    <a href="#" className="btn btn-success"><i className="far fa-heart"/> 102</a>
                                    <a href="#" className="btn btn-primary"><i className="far fa-comments"/> 3</a>
                                </div>
                        </div>


                    </div>
                    <div className="col-12 col-md-3">

                        <div className="card mt-2">
                            <div className="card-body mx-auto">
                                <h5 className="card-title">Dienos daina</h5>
                                <p className="card-text"><b>Jaden - I'm ready</b></p>
                                <iframe src="https://open.spotify.com/embed/playlist/3SWozV3F6KrBg69SBRyTod"
                                        width="100%" height="80" frameBorder="0" allowTransparency="true"
                                        allow="encrypted-media"/>
                                <br/>
                                    <a href="#" className="btn btn-success"><i className="far fa-heart"/> 4</a>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-body mx-auto">
                                <h5 className="card-title">Kas vyksta?</h5>
                                <p className="card-text"><a href="#">Admin</a> patiko dienos daina.</p>
                                <p className="card-text"><a href="#">Admin</a> patiko Straipsnio pavadinimas</p>
                                <p className="card-text"><a href="#">Admin</a> patiko Kitas straipsnis.</p>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-body mx-auto">
                                <h5 className="card-title">Šaukykla</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><a href="#">Admin</a>: Sveiki</li>
                                    <li className="list-group-item"><a href="#">Admin</a>: Sveiki</li>
                                    <li className="list-group-item"><a href="#">Naudotojas</a>: Sveiki, kaip laikotes
                                        siandien?
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-body mx-auto">
                                <h5 className="card-title">Apklausa: Kaip sekasi?</h5>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                           id="flexRadioDefault1"/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Gerai
                                        </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                           id="flexRadioDefault2"/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Puikiai
                                        </label>
                                </div>

                                <button type="button" className="btn btn-primary mt-2">Balsuoti</button>
                            </div>
                        </div>

                        <div className="card mt-2">
                            <div className="card-body mx-auto">
                                <h5 className="card-title">Informacija</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Šiuo metu naršo: <b>2</b></li>
                                    <li className="list-group-item">Registruotų naudotojų: <b>100</b></li>
                                    <li className="list-group-item">Naujausias naryhs: <b>Valerijus</b></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mb-2"/>
                <br/>
                <div className="mb-5"/>
            </div>
        </div>
    );
}

export default App;
