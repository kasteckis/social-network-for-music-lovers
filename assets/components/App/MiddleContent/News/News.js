import React, {Component} from 'react';
import Post from "../Feed/Post/Post";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingInfiniteScroll from "../../../Utils/LoadingInfiniteScroll/LoadingInfiniteScroll";

class News extends Component {
    state = {
        news: [],
        offset: 0,
        hasMoreNews: true
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

        axios.get('/api/news', headers)
            .then(response => {
                this.setState({
                    news: response.data,
                    offset: response.data.length
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    fetchMoreNews() {
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

        axios.get('/api/news', headers)
            .then(response => {
                this.setState({
                    news: this.state.news.concat(response.data),
                    offset: this.state.offset + response.data.length,
                    hasMoreNews: response.data.length !== 0
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
                    dataLength={this.state.news.length}
                    next={() => this.fetchMoreNews()}
                    hasMore={this.state.hasMoreNews}
                    loader={<LoadingInfiniteScroll />}
                >
                    {this.state.news.map((news, index) => (
                            <div className="mt-2" key={index}>
                                <Post redirectToText="naujienos" auth={this.props.auth} post={news}/>
                            </div>
                    ))}
                </InfiniteScroll>
            </React.Fragment>
        );
    }
}

export default News;
