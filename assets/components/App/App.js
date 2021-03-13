import React, {Component} from 'react';

import './App.css';
import Navbar from "./Navbar/Navbar";
import MarginBottom from "./MarginBottom/MarginBottom";
import RightContent from "../RightContent/RightContent";
import MiddleContent from "./MiddleContent/MiddleContent";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import { connect } from 'react-redux';

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
            <div>
                <Navbar
                    selectedNavbarItem={this.state.selectedNavbarItem}
                    selectNavbarItemHandler={(name) => this.selectNavbarItemHandler(name)}
                    auth={this.props.auth}
                />
                <MobileNavbar
                    auth={this.props.auth}
                />

                <div className="container-xl mt-5">
                    <div className="row">
                        <div className="col-12 col-md-9">
                            <MiddleContent
                                auth={this.props.auth}
                            />
                        </div>
                        <div className="col-12 col-md-3">
                            <RightContent/>
                        </div>
                    </div>
                    <MarginBottom/>
                </div>

            </div>
    );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(App);
