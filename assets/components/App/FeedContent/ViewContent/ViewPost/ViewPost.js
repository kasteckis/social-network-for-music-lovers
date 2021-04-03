import React, {Component} from 'react';
import axios from "axios";
import {
    Avatar,
    Badge,
    Card,
    CardActionArea,
    CardActions,
    CardContent, CardHeader,
    CardMedia,
    IconButton,
    Typography
} from "@material-ui/core";
import {Chat, Edit, MoreVert, ThumbUp} from "@material-ui/icons";
import {withRouter} from "react-router-dom";
import MusicBadge from "../../../../Utils/MusicBadge/MusicBadge";

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
            type: 'post',
            createdBy: null,
            createdByProfilePicture: null,
            createdAt: null,
            liked: false,
            canEdit: false
        },
        error: false
    }

    likePostHandler = (id) => {
        if (this.props.auth.token === null) {
            this.props.history.push('/prisijungti');
            return;
        }

        let headers = {};

        if (this.props.auth.token) {
            headers = {
                headers: {
                    Authorization: 'Bearer ' + this.props.auth.token
                }
            };
        }

        axios.put('/api/post/' + id + '/like', {}, headers)
            .then(response => {
                this.setState({post: response.data});
            })
            .catch(error => {
                console.log(error);
            })
    }

    commentPostHandler = (id) => {
        if (this.props.auth.token === null) {
            this.props.history.push('/prisijungti');
            return;
        }

        // todo implementint commentavima
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.updatePost();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.auth.token === null && this.props.auth.token) {
            this.updatePost();
        }
    }

    updatePost() {
        let headers = {};

        if (this.props.auth.token) {
            headers = {
                headers: {
                    Authorization: 'Bearer ' + this.props.auth.token
                }
            };
        }

        axios.get('/api/post/' + this.props.match.params.id, headers)
            .then(response => {
                this.setState({post: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            })
    }

    redirectToUserPage(name) {
        this.props.history.push('/profilis/' + name);
    }

    render() {
        return (
            <Card>
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
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        <CardActionArea onClick={() => this.redirectToUserPage(this.state.post.createdBy)}>
                                            {this.state.post.createdByProfilePicture ?
                                                <img style={{maxWidth: '100%'}} src={"/images/profile/" + this.state.post.createdByProfilePicture} alt={this.state.post.createdBy + ' profilio nuotrauka'} />
                                                :
                                                <img style={{maxWidth: '100%'}} src="/images/default_profile_picture.png" alt={this.state.post.createdBy + ' profilio nuotrauka'} />
                                            }
                                        </CardActionArea>
                                    </Avatar>
                                }
                                // action={
                                //     <IconButton aria-label="settings">
                                //         <MoreVert />
                                //     </IconButton>
                                // }
                                title={
                                    <span onClick={() => this.redirectToUserPage(this.state.post.createdBy)}>
                                            {this.state.post.createdBy}
                                        </span>
                                }
                                subheader={this.state.post.createdAt}
                            />
                            <CardActionArea>
                                {this.state.post.image === null || this.state.post.image.length === 0 ?
                                        null
                                    :
                                        <CardMedia
                                            style={{height: 140}}
                                            image={window.location.origin + '/images/posts/' + this.state.post.image}
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
                                                width="100%" height={this.state.post.spotifyIframeUrl.indexOf('track') === -1 ? 380 : 80} frameBorder="0"
                                                allow="encrypted-media"
                                        />
                                    </div>
                                :
                                    null
                            }
                            <CardActions>
                                <IconButton style={{marginLeft: 'auto'}} onClick={() => this.likePostHandler(this.state.post.id)} >
                                    <MusicBadge
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        badgeContent={this.state.post.likes}
                                    >
                                        <ThumbUp style={this.state.post.liked ? {color: 'orange'} : null} />
                                    </MusicBadge>
                                </IconButton>
                                <IconButton onClick={() => this.commentPostHandler(this.state.post.id)} >
                                    <MusicBadge badgeContent={this.state.post.comments}>
                                        <Chat style={{color: 'orange'}} />
                                    </MusicBadge>
                                </IconButton>
                                {this.state.post.canEdit ?
                                    <IconButton onClick={() => this.props.history.push('/redaguoti/' + this.state.post.id)} >
                                        <Edit style={{color: 'orange'}} />
                                    </IconButton>
                                    :
                                    null
                                }
                            </CardActions>
                        </React.Fragment>
                }
            </Card>
        );
    }
}

export default withRouter(ViewPost);
