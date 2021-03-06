import React from 'react';

import './App.css';
import Navbar from "./Navbar/Navbar";
import DaySong from "../RightContent/DaySong/DaySong";
import WhatsHappening from "../RightContent/WhatsHappening/WhatsHappening";
import Chatbox from "../RightContent/Chatbox/Chatbox";
import Survey from "../RightContent/Survey/Survey";
import InformationBox from "../RightContent/InformationBox/InformationBox";

function App() {
    return (
        <div>
            <Navbar />

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
                                            width="100%" height="80" frameBorder="0"
                                            allow="encrypted-media"/>
                                    <a href="#" className="btn btn-success"><i className="far fa-heart"/> 102</a>
                                    <a href="#" className="btn btn-primary"><i className="far fa-comments"/> 3</a>
                                </div>
                        </div>


                    </div>
                    <div className="col-12 col-md-3">

                        <DaySong />

                        <WhatsHappening />

                        <Chatbox />

                        <Survey />

                        <InformationBox />

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
