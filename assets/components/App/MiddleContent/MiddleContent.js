import React, {Component} from "react";
import Posts from "./Posts/Posts";
import {Route, Switch} from "react-router";
import Page404 from "./Page404/Page404";
import Search from "./Search/Search";
import Profile from "./Profile/Profile";
import Top30Lt from "./Top30LT/Top30LT";
import Top40 from "./Top40/Top40";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import CreateContent from "./CreateContent/CreateContent";
import NewPost from "./CreateContent/NewPost/NewPost";
import Logout from "./Auth/Logout/Logout";
import {connect} from "react-redux";

class MiddleContent extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/paieska" exact component={Search} />
                    <Route path="/top30lt" exact component={Top30Lt} />
                    <Route path="/top40" exact component={Top40} />
                    <Route path="/prisijungti" exact component={Login} />
                    <Route path="/registruotis" exact component={Register} />
                    {/*<Route path="/ikelti" exact component={CreateContent} />*/}
                    <Route path="/atsijungti" exact component={Logout} />

                    <Route path="/profilis" exact render={(props) => (
                        <Profile {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/irasai/naujas" exact render={(props) => (
                        <NewPost {...props} auth={this.props.auth} />
                    )} />

                    <Route component={Page404} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps)(MiddleContent);
