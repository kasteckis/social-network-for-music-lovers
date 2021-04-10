import React, {Component} from "react";
import {Route, Switch} from "react-router";
import Page404 from "./Page404/Page404";
import Search from "./Search/Search";
import Profile from "./Profile/Profile";
import Top30Lt from "./Top30LT/Top30LT";
import Top40 from "./Top40/Top40";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import NewPost from "../FeedContent/CreateContent/NewPost/NewPost";
import Logout from "./Auth/Logout/Logout";
import {connect} from "react-redux";
import Feed from "./Feed/Feed";
import ViewPost from "../FeedContent/ViewContent/ViewPost/ViewPost";
import ChatBoxFull from "./ChatBoxFull/ChatBoxFull";
import ViewOtherProfile from "./ViewOtherProfile/ViewOtherProfile";
import UserList from "./UserList/UserList";
import Posts from "./Posts/Posts";
import Events from "./Events/Events";
import ViewEvent from "./Events/ViewEvent/ViewEvent";
import News from "./News/News";
import NewNews from "../FeedContent/CreateContent/NewNews/NewNews";
import ForgotPassword from "./Auth/Login/ForgotPassword/ForgotPassword";
import ForgotPasswordResetForm from "./Auth/Login/ForgotPasswordResetForm/ForgotPasswordResetForm";
import EditPost from "../FeedContent/CreateContent/EditPost/EditPost";
import Groups from "./Groups/Groups";
import ViewGroup from "./Groups/ViewGroup/ViewGroup";
import Albums from "./Albums/Albums";

class MiddleContent extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact render={(props) => (
                        <Feed {...props} auth={this.props.auth} rightContentMobile={this.props.rightContentMobile} />
                    )} />
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

                    <Route path="/pamirsau-slaptazodi" exact render={(props) => (
                        <ForgotPassword {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/pamirsau-slaptazodi/:hash" exact render={(props) => (
                        <ForgotPasswordResetForm {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/irasai" exact render={(props) => (
                        <Posts {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/naujienos" exact render={(props) => (
                        <News {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/renginiai" exact render={(props) => (
                        <Events {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/grupes" exact render={(props) => (
                        <Groups {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/albumai" exact render={(props) => (
                        <Albums {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/grupe/:name/:id" exact render={(props) => (
                        <ViewGroup {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/renginiai/:id" exact render={(props) => (
                        <ViewEvent {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/nariai" exact render={(props) => (
                        <UserList {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/profilis/:name" exact render={(props) => (
                        <ViewOtherProfile {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/irasai/naujas" exact render={(props) => (
                        <NewPost {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/naujienos/naujas" exact render={(props) => (
                        <NewNews {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/pokalbiai" exact render={(props) => (
                        <ChatBoxFull {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/irasai/:id" exact render={(props) => (
                        <ViewPost {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/redaguoti/:id" exact render={(props) => (
                        <EditPost {...props} auth={this.props.auth} />
                    )} />

                    <Route path="/naujienos/:id" exact render={(props) => (
                        <ViewPost {...props} auth={this.props.auth} />
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
