import React, {Component} from 'react';
import Post from "../Feed/Post/Post";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingInfiniteScroll from "../../../Utils/LoadingInfiniteScroll/LoadingInfiniteScroll";

class Posts extends Component {
    state = {
        posts: [],
        offset: 0,
        hasMorePosts: true
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

        axios.get('/api/posts', headers)
            .then(response => {
                this.setState({
                    posts: response.data,
                    offset: response.data.length
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    fetchMorePosts() {
        let headers = {
            params: {
                offset: this.state.offset
            }
        };

        if (this.props.auth.token) {
            headers = {
                headers: {
                    Authorization: 'Bearer ' + this.props.auth.token
                },
                params: {
                    offset: this.state.offset
                }
            }
        }

        axios.get('/api/posts', headers)
            .then(response => {
                this.setState({
                    posts: this.state.posts.concat(response.data),
                    offset: this.state.offset + response.data.length,
                    hasMorePosts: response.data.length !== 0
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <React.Fragment>
                <InfiniteScroll
                    dataLength={this.state.posts.length}
                    next={() => this.fetchMorePosts()}
                    hasMore={this.state.hasMorePosts}
                    loader={<LoadingInfiniteScroll />}
                >
                    {this.state.posts.map((post, index) => (
                        <div className="mt-2" key={index}>
                            <Post redirectToText="irasai" auth={this.props.auth} post={post}/>
                        </div>
                    ))}
                </InfiniteScroll>
            </React.Fragment>
        );
    }
}

export default Posts;