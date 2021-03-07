import React, {Component} from "react";
import Posts from "../Posts/Posts";
import {Route, Switch} from "react-router";
import Page404 from "../Page404/Page404";

class MiddleContent extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/paieska" exact component={Posts} />
                    <Route path="/profilis" exact component={Posts} />
                    <Route path="/top30lt" exact component={Posts} />
                    <Route path="/top40" exact component={Posts} />

                    <Route component={Page404} />
                </Switch>
            </div>
        );
    }
}

export default MiddleContent;