import React, {Component} from "react";
import Posts from "./Posts/Posts";
import {Route, Switch} from "react-router";
import Page404 from "./Page404/Page404";
import Search from "./Search/Search";
import Profile from "./Profile/Profile";
import Top30Lt from "./Top30LT/Top30LT";
import Top40 from "./Top40/Top40";

class MiddleContent extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/paieska" exact component={Search} />
                    <Route path="/profilis" exact component={Profile} />
                    <Route path="/top30lt" exact component={Top30Lt} />
                    <Route path="/top40" exact component={Top40} />

                    <Route component={Page404} />
                </Switch>
            </div>
        );
    }
}

export default MiddleContent;