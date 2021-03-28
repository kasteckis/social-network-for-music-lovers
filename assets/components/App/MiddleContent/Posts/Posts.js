import React, {Component} from 'react';
import Post from "../Feed/Post/Post";
import axios from "axios";

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        this.getPostsHandler();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.auth.token === null && this.props.auth.token) {
            this.getPostsHandler();
        }
    }

    getPostsHandler() {
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
                this.setState({posts: response.data})
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.posts.map((feed) => (
                    <div className="mt-2" key={feed.id}>
                        {feed.type === 'post' ?
                            <Post auth={this.props.auth} post={feed}/> : null}
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

export default Posts;