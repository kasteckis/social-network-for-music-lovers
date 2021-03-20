import React from "react";
import Post from "./Post/Post";
import axios from "axios";

class Feed extends React.Component {

    state = {
        feedArray: []
    }

    componentDidMount() {
        this.getFeedDataHandler();
    }

    getFeedDataHandler() {
        axios.get('/api/feed')
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
                {this.state.feedArray.map((feed) => (
                    <div className="mt-2" key={feed.id}>
                        {feed.type === 'post' ?
                            <Post post={feed}/> : null}
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

export default Feed;