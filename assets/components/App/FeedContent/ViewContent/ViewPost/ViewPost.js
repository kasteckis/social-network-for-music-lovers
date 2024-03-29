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
    IconButton, Paper, TextField, Tooltip,
    Typography
} from "@material-ui/core";
import {Chat, Delete, Edit, MoreVert, ThumbUp} from "@material-ui/icons";
import {withRouter} from "react-router-dom";
import MusicBadge from "../../../../Utils/MusicBadge/MusicBadge";
import DeletePostDialog from "./DeletePostDialog/DeletePostDialog";
import DeletePostCommentDialog from "./DeletePostCommentDialog/DeletePostCommentDialog";
import Linkify from "react-linkify";

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
        postDeleteDialog: false,
        postCommentDeleteDialog: false,
        selectedPostCommentToDelete: -1,
        currentlyEditingPostCommentId: -1,
        editPostCommentErrorText: ''
    }

    constructor(props, context) {
        super(props, context);
        this.newCommentRef = React.createRef();
        this.editPostCommentRef = React.createRef();
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
                this.setState({postDeleteDialog: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    openPostCommentDeleteDialog(postCommentId) {
        this.setState({
            postCommentDeleteDialog: true,
            selectedPostCommentToDelete: postCommentId
        });
    }

    closePostCommentDeleteDialog() {
        this.setState({postCommentDeleteDialog: false});
    }

    deletePostCommentHandler() {
        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        axios.delete('/api/post-comment/' + this.state.selectedPostCommentToDelete, headers)
            .then(response => {
                this.setState({
                    post: response.data,
                    postCommentDeleteDialog: false
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    togglePostCommentEditHandler(postCommentId) {
        this.setState({
            currentlyEditingPostCommentId: postCommentId
        });

        const text = this.state.post.commentsArray.find(comment => comment.id === postCommentId).text;

        setTimeout(() => {
            this.editPostCommentRef.current.value = text;
        }, 100);
    }

    handleEditPostComment(event, comment) {
        event.preventDefault();

        if (comment.text === this.editPostCommentRef.current.value) {
            this.setState({
                currentlyEditingPostCommentId: -1
            });
            return;
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        const data = {
            text: this.editPostCommentRef.current.value
        }

        axios.put('/api/post-comment/' + this.state.currentlyEditingPostCommentId, data, headers)
            .then(response => {
                this.setState({
                    currentlyEditingPostCommentId: -1,
                    post: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const postDeleteDialog = (
            <DeletePostDialog
                postDeleteDialog={this.state.postDeleteDialog}
                closePostDeleteDialog={() => this.closePostDeleteDialog()}
                deletePostHandler={() => this.deletePostHandler()}
            />
        );

        const postCommentDeleteDialog = (
            <DeletePostCommentDialog
                postCommentDeleteDialog={this.state.postCommentDeleteDialog}
                closePostCommentDeleteDialog={() => this.closePostCommentDeleteDialog()}
                deletePostCommentHandler={() => this.deletePostCommentHandler()}
            />
        );

        return (
            <React.Fragment>
                <Card>
                    {postDeleteDialog}
                    {postCommentDeleteDialog}
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
                                        <Linkify>{this.state.post.text}</Linkify>
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
                        {this.props.auth.token === null ?
                            null
                            :
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
                        }
                        {this.state.post.commentsArray.map((comment) => (
                            <React.Fragment key={comment.id}>
                                {this.state.currentlyEditingPostCommentId === comment.id ?
                                    <form onSubmit={(event) => this.handleEditPostComment(event, comment)}>
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={this.state.editPostCommentErrorText.length !== 0}
                                            helperText={this.state.editPostCommentErrorText}
                                            autoFocus
                                            inputRef={this.editPostCommentRef}
                                            margin="dense"
                                            label="Komentaras"
                                            fullWidth
                                            multiline
                                            rows={6}
                                            rowsMax={Infinity}
                                        />
                                        <Button onClick={(event) => this.handleEditPostComment(event, comment)} color="primary">
                                            Išsaugoti
                                        </Button>
                                    </form>
                                :
                                    <React.Fragment>
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
                                                    <Linkify>{comment.text}</Linkify>
                                                </p>
                                                <p style={{ textAlign: "left", color: "gray" }}>
                                                    {comment.createdAt + ' '}
                                                    {comment.modifiedAt ?
                                                        <IconButton size="small">
                                                            <Edit style={{width: '18px'}} />
                                                        </IconButton>
                                                        :
                                                        null
                                                    }
                                                </p>
                                            </Grid>
                                        </Grid>

                                        {comment.canEdit ?
                                            <Grid container wrap="nowrap" spacing={2}>
                                                <IconButton style={{marginLeft: 'auto'}} onClick={() => this.togglePostCommentEditHandler(comment.id)} >
                                                    <Edit style={{color: 'orange'}} />
                                                </IconButton>
                                                <IconButton onClick={() => this.openPostCommentDeleteDialog(comment.id)} >
                                                    <Delete style={{color: 'orange'}} />
                                                </IconButton>
                                            </Grid>
                                            :
                                            null
                                        }
                                    </React.Fragment>
                                }

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
