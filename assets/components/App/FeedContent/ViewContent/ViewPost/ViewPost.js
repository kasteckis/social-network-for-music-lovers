import React, {Component} from 'react';
import axios from "axios";
import {
    Badge, Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography
} from "@material-ui/core";
import {Favorite} from "@material-ui/icons";
import {Redirect} from "react-router-dom";

class ViewPost extends Component {

    state = {
        post: {
            id: null,
            image: '',
            title: null,
            text: null,
            spotifyIframeUrl: null,
            likes: 0,
            comments: 0,
            type: 'post'
        },
        error: false,
        redirectToLoginPage: false
    }

    likePostHandler = (id) => {
        if (this.props.auth.token === null) {
            this.setState({redirectToLoginPage: true});
            return;
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        axios.put('/api/post/' + id + '/like', {}, headers)
            .then(response => {
                let postClone = {...this.state.post};
                postClone.likes = response.data.likes;

                this.setState({post: postClone});
            })
            .catch(error => {
                console.log(error);
            })
    }

    commentPostHandler = (id) => {
        if (this.props.auth.token === null) {
            this.setState({redirectToLoginPage: true});
        }

        // todo implementint commentavima
    }

    componentDidMount() {
        axios.get('/api/post/' + this.props.match.params.id)
            .then(response => {
                this.setState({post: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            })
    }

    render() {
        return (
            <Card>
                {this.state.redirectToLoginPage ? <Redirect to="/prisijungti" /> : null}
                {this.state.error ?
                        <CardActionArea>
                            <CardContent>
                                <Typography align="center" gutterBottom variant="h5" component="h2">
                                    Įrašas nerastas
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    :
                        <React.Fragment>
                            <CardActionArea>
                                {this.state.post.image === null || this.state.post.image.length === 0 ?
                                        null
                                    :
                                        <CardMedia
                                            style={{height: 140}}
                                            image={window.location.origin + '/images/' + this.state.post.image}
                                            title={this.state.post.title}
                                        />
                                }
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {this.state.post.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.state.post.text}
                                </Typography>
                            </CardContent>
                            {this.state.post.spotifyIframeUrl ?
                                    <div className="m-2">
                                        <iframe src={this.state.post.spotifyIframeUrl}
                                                width="100%" height="80" frameBorder="0"
                                                allow="encrypted-media"
                                        />
                                    </div>
                                :
                                    null
                            }
                            <CardActions>
                                <IconButton onClick={() => this.likePostHandler(this.state.post.id)}>
                                    <Badge badgeContent={this.state.post.likes} color="error">
                                        <Favorite />
                                    </Badge>
                                </IconButton>
                                <Button size="small" color="primary" onClick={() => this.commentPostHandler(this.state.post.id)}>
                                    Komentuoti ({this.state.post.comments})
                                </Button>
                            </CardActions>
                        </React.Fragment>
                }
            </Card>
        );
    }
}

export default ViewPost;