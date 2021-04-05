import React, {Component} from 'react';
import axios from "axios";
import {
    Avatar,
    Badge, Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent, CardHeader,
    CardMedia, Divider, Grid,
    IconButton, Paper, TextField,
    Typography
} from "@material-ui/core";
import {Chat, Delete, Edit, MoreVert, ThumbUp} from "@material-ui/icons";
import {withRouter} from "react-router-dom";
import MusicBadge from "../../../../Utils/MusicBadge/MusicBadge";
import DeletePostDialog from "./DeletePostDialog/DeletePostDialog";

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
            canEdit: false,
            commentsArray: []
        },
        error: false,
        newCommentErrorText: '',
        postDeleteDialog: false
    }

    constructor(props, context) {
        super(props, context);
        this.newCommentRef = React.createRef();
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
                console.log(error);
                this.setState({error: true});
            })
    }

    redirectToUserPage(name) {
        this.props.history.push('/profilis/' + name);
    }

    handleSubmitPostComment(event) {
        event.preventDefault();

        this.setState({newCommentErrorText: ''});
        if (this.newCommentRef.current.value.length === 0) {
            this.setState({newCommentErrorText: 'Komentaras negali būti tusčias'});
            return;
        }

        const postCommentData = {
            postId: this.state.post.id,
            comment: this.newCommentRef.current.value
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        axios.post('/api/post-comment', postCommentData, headers)
            .then(response => {
                this.setState({post: response.data});
                this.newCommentRef.current.value = '';
            })
            .catch(error => {
                console.log(error);
            })
    }

    openPostDeleteDialog() {
        this.setState({postDeleteDialog: true});
    }

    closePostDeleteDialog() {
        this.setState({postDeleteDialog: false});
    }

    deletePostHandler() {
        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        axios.delete('/api/post/' + this.state.post.id, headers)
            .then(response => {
                console.log(response.data);
                this.setState({postDeleteDialog: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const postDeleteDialog = (
            <DeletePostDialog
                postDeleteDialog={this.state.postDeleteDialog}
                closePostDeleteDialog={() => this.closePostDeleteDialog()}
                deletePostHandler={() => this.deletePostHandler()}
            />
        );

        return (
            <React.Fragment>
                <Card>
                    {postDeleteDialog}
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
                                    {this.state.post.canEdit ?
                                        <React.Fragment>
                                            <IconButton onClick={() => this.props.history.push('/redaguoti/' + this.state.post.id)} >
                                                <Edit style={{color: 'orange'}} />
                                            </IconButton>
                                            <IconButton onClick={() => this.openPostDeleteDialog()} >
                                                <Delete style={{color: 'orange'}} />
                                            </IconButton>
                                        </React.Fragment>
                                        :
                                        null
                                    }
                                </CardActions>
                            </React.Fragment>
                    }
                </Card>
                <div style={{ padding: 14 }} className="App">
                    <h1>Komentarai ({this.state.post.comments})</h1>
                    <Paper style={{ padding: "40px 20px" }}>
                        <form onSubmit={(event) => this.handleSubmitPostComment(event)}>
                            <TextField
                                error={this.state.newCommentErrorText.length !== 0}
                                helperText={this.state.newCommentErrorText}
                                autoFocus={this.props.location.state ? this.props.location.state.autofocusComments : false}
                                inputRef={this.newCommentRef}
                                margin="dense"
                                label="Jūsų komentaras"
                                fullWidth
                                multiline
                                rows={6}
                                rowsMax={Infinity}
                            />
                            <Button className="mb-2" onClick={(event) => this.handleSubmitPostComment(event)} color="primary">
                                Rašyti
                            </Button>
                        </form>
                        {this.state.post.commentsArray.map((comment) => (
                            <React.Fragment key={comment.id}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar>
                                            {comment.createdByProfilePicture ?
                                                <img style={{maxWidth: '100%'}} src={"/images/profile/" + comment.createdByProfilePicture} alt={comment.createdBy + ' profilio nuotrauka'} />
                                                :
                                                <img style={{maxWidth: '100%'}} src="/images/default_profile_picture.png" alt={this.state.post.createdBy + ' profilio nuotrauka'} />
                                            }
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <h4 style={{ margin: 0, textAlign: "left" }}>{comment.createdBy}</h4>
                                        <p style={{ textAlign: "left" }}>
                                            {comment.text}
                                        </p>
                                        <p style={{ textAlign: "left", color: "gray" }}>
                                            {comment.createdAt}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                            </React.Fragment>
                        ))}
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(ViewPost);
