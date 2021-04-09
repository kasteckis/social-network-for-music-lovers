import React from "react";
import Post from "./Post/Post";
import axios from "axios";
import Event from "../Events/Event/Event";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingInfiniteScroll from "../../../Utils/LoadingInfiniteScroll/LoadingInfiniteScroll";

class Feed extends React.Component {

    state = {
        feedArray: [],
        hasMoreFeed: true,
        offsetNews: 0,
        offsetPosts: 0,
        offsetEvents: 0
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
                this.setState({
                    feedArray: response.data.feedArray,
                    offsetNews: response.data.offsetNews,
                    offsetPosts: response.data.offsetPosts,
                    offsetEvents: response.data.offsetEvents
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    fetchMoreFeed() {
        let headers = {
            params: {
                offsetNews: this.state.offsetNews,
                offsetPosts: this.state.offsetPosts,
                offsetEvents: this.state.offsetEvents
            }
        };

        if (this.props.auth.token) {
            headers = {
                headers: {
                    Authorization: 'Bearer ' + this.props.auth.token
                },
                params: {
                    offsetNews: this.state.offsetNews,
                    offsetPosts: this.state.offsetPosts,
                    offsetEvents: this.state.offsetEvents
                }
            }
        }

        axios.get('/api/feed', headers)
            .then(response => {
                this.setState({
                    feedArray: this.state.feedArray.concat(response.data.feedArray),
                    offsetNews: this.state.offsetNews + response.data.offsetNews,
                    offsetPosts: this.state.offsetPosts + response.data.offsetPosts,
                    offsetEvents: this.state.offsetEvents + response.data.offsetEvents,
                    hasMoreFeed: response.data.feedArray.length !== 0
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <React.Fragment>
                {this.props.rightContentMobile}
                <InfiniteScroll
                    dataLength={this.state.feedArray.length}
                    next={() => this.fetchMoreFeed()}
                    hasMore={this.state.hasMoreFeed}
                    loader={<LoadingInfiniteScroll />}
                >
                {this.state.feedArray.map((feed, index) => (
                    <div className="mt-2" key={index}>
                        {feed.type === 'post' ?
                            <Post redirectToText="irasai" auth={this.props.auth} post={feed}/> : null}
                        {feed.type === 'new' ?
                            <Post redirectToText="naujienos" auth={this.props.auth} post={feed}/> : null}
                        {feed.type === 'event' ?
                            <Event event={feed} /> : null
                        }
                    </div>
                ))}
                </InfiniteScroll>
            </React.Fragment>
        );
    }
}

export default Feed;