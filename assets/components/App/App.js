import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Navbar from "./Navbar/Navbar";
import MarginBottom from "./MarginBottom/MarginBottom";
import NavbarSecond from "./NavbarSecond/NavbarSecond";
import RightContent from "../RightContent/RightContent";
import MiddleContent from "./MiddleContent/MiddleContent";

class App extends Component {

    state = {
        selectedNavbarItem: 'muzika'
    }

    selectNavbarItemHandler(name) {
        this.setState({
            selectedNavbarItem: name
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar
                        selectedNavbarItem={this.state.selectedNavbarItem}
                        selectNavbarItemHandler={(name) => this.selectNavbarItemHandler(name)}
                    />

                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-12 col-md-9">
                                {/*<NavbarSecond*/}
                                {/*    selectedNavbarItem={this.state.selectedNavbarItem}*/}
                                {/*/>*/}
                                <MiddleContent/>
                            </div>
                            <div className="col-12 col-md-3">
                                <RightContent/>
                            </div>
                        </div>
                        <MarginBottom/>
                    </div>

                </div>
            </BrowserRouter>
        );
    }
}

export default App;
