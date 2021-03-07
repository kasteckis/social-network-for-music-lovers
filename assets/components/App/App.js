import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Navbar from "./Navbar/Navbar";
import Posts from "./Posts/Posts";
import MarginBottom from "./MarginBottom/MarginBottom";
import NavbarSecond from "./NavbarSecond/NavbarSecond";
import RightContent from "../RightContent/RightContent";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Navbar />

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-12 col-md-9">
                            <NavbarSecond />
                            <Posts />
                        </div>
                        <div className="col-12 col-md-3">
                            <RightContent />
                        </div>
                    </div>
                    <MarginBottom />
                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;
