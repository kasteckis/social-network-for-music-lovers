import React from "react";
import Post from "./Post/Post";
import axios from "axios";
import Event from "../Events/Event/Event";

class Feed extends React.Component {

    state = {
        feedArray: []
    }

    componentDidMount() {
        this.getFeedDataHandler();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.auth.token === null && this.props.auth.token) {
            this.getFeedDataHandler();
        }
    }

    getFeedDataHandler() {
        let headers = {};

        if (this.props.auth.token) {
            headers = {
                headers: {
                    Authorization: 'Bearer ' + this.props.auth.token
                }
            }
        }

        axios.get('/api/feed', headers)
            .then(response => {
                this.setState({feedArray: response.data})
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <React.Fragment>
                {this.props.rightContentMobile}
                {this.state.feedArray.map((feed, index) => (
                    <div className="mt-2" key={index}>
                        {feed.type === 'post' ?
                            <Post auth={this.props.auth} post={feed}/> : null}
                        {feed.type === 'event' ?
                            <Event event={feed} /> : null
                        }
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

export default Feed;