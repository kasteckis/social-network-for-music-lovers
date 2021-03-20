import React, {Component} from 'react';

import './App.css';
import Navbar from "./Navbar/Navbar";
import MarginBottom from "./MarginBottom/MarginBottom";
import RightContent from "../RightContent/RightContent";
import MiddleContent from "./MiddleContent/MiddleContent";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {
    BrowserView,
    MobileView
} from "react-device-detect";

class App extends Component {

    componentDidMount() {
        this.props.authCheckState();
    }

    render() {
        const rightContent = (
            <RightContent
                auth={this.props.auth}
            />
        );

        const rightContentOnMobileFeed = (
            <MobileView>
                {rightContent}
            </MobileView>
        );

        return (
            <div>
                <Navbar
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
                                rightContentMobile={rightContentOnMobileFeed}
                            />
                        </div>
                        <div className="col-12 col-md-3">
                            <BrowserView>
                                {rightContent}
                            </BrowserView>
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

const mapDispatchToProps = dispatch => {
    return {
        authCheckState: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
