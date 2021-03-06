import React from 'react';

import './App.css';
import Navbar from "./Navbar/Navbar";
import DaySong from "../RightContent/DaySong/DaySong";
import WhatsHappening from "../RightContent/WhatsHappening/WhatsHappening";
import ChatBox from "../RightContent/ChatBox/ChatBox";
import Survey from "../RightContent/Survey/Survey";
import InformationBox from "../RightContent/InformationBox/InformationBox";
import Posts from "./Posts/Posts";
import MarginBottom from "./MarginBottom/MarginBottom";
import NavbarSecond from "./NavbarSecond/NavbarSecond";

function App() {
    return (
        <div>
            <Navbar />

            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 col-md-9">

                    <NavbarSecond />

                    <Posts />

                    </div>
                    <div className="col-12 col-md-3">

                        <DaySong />
                        <WhatsHappening />
                        <ChatBox />
                        <Survey />
                        <InformationBox />

                    </div>
                </div>

                <MarginBottom />

            </div>
        </div>
    );
}

export default App;
