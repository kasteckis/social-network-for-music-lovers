import React, {Component, createRef} from 'react';
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    TextareaAutosize,
    TextField,
    Typography
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import {Redirect} from "react-router-dom";

class NewPost extends Component {

    state = {
        titleError: '',
        spotifyIframeUrlError: '',
        textError: '',
        uploadedFileError: '',
        uploadedFileName: '',
        redirectToCreatedPost: false,
        redirectToCreatedPostId: null
    }


    constructor(props, context) {
        super(props, context);

        this.titleRef = createRef();
        this.spotifyIframeUrlRef = createRef();
        this.textRef = createRef();
    }

    createPostHandler(event) {
        event.preventDefault();

        let foundErrors = false;
        this.setState({
            loading: false,
            titleError: '',
            spotifyIframeUrlError: '',
            textError: '',
            uploadedFileError: ''
        });

        if (this.titleRef.current.value.length < 5) {
            foundErrors = true;
            this.setState({
                titleError: 'Per trumpas pavadinimas'
            });
        }

        if (this.spotifyIframeUrlRef.current.value.length < 8 && this.spotifyIframeUrlRef.current.value.length !== 0) {
            foundErrors = true;
            this.setState({
                spotifyIframeUrlError: 'Per trumpas spotify kodas, pavyzdys - 7sWRlDoTDX8geTR8zzr2vt'
            });
        }

        if (this.textRef.current.value.length < 30) {
            foundErrors = true;
            this.setState({
                textError: 'Turinys privalo turėti bentjau 30 simbolių'
            });
        }

        // if (this.state.uploadedFileName.length === 0) {
        //     foundErrors = true;
        //     this.setState({
        //         uploadedFileError: 'Nuotrauką įkelti privaloma'
        //     });
        // }

        if (foundErrors) {
            return;
        }


        const spotifyUrl = this.spotifyIframeUrlRef.current.value ? 'https://open.spotify.com/embed/track/' + this.spotifyIframeUrlRef.current.value : null;
        const postData = {
            title: this.titleRef.current.value,
            spotifyIframeUrl: spotifyUrl,
            text: this.textRef.current.value,
            image: this.state.uploadedFileName
        };
        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };
        this.setState({loading: true});
        axios.post('/api/post', postData, headers)
            .then(response => {
                this.setState({loading: false, redirectToCreatedPost: true, redirectToCreatedPostId: response.data.postId});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            })
    }

    imageUploadHandler(event) {
        const file = event.target.files[0];

        axios.post('/api/post/image', file, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + this.props.auth.token
            }
        }).then(response => {
            this.setState({uploadedFileName: response.data.fileName})
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {

        let redirectToCreatedPost = null;
        if (this.state.redirectToCreatedPost) {
            const redirectPath = "/irasai/" + this.state.redirectToCreatedPostId;
            redirectToCreatedPost = (
                <Redirect to={redirectPath} />
            );
        }

        return (
            <Card className="mt-2">
                {redirectToCreatedPost}
                <CardContent>
                    <Typography color="textPrimary" gutterBottom align="center">
                        Naujo įrašo kūrimas
                    </Typography>
                    <Grid
                        container
                        justify="center"
                    >
                        <form style={{width: '100%'}} onSubmit={(event) => this.createPostHandler(event)}>
                            <TextField
                                error={this.state.titleError.length > 0}
                                helperText={this.state.titleError}
                                fullWidth
                                className="mt-2"
                                required
                                inputRef={this.titleRef}
                                label="Pavadinimas"
                                variant="outlined"
                            /><br/>
                            <Button
                                variant="contained"
                                component="label"
                                className="mt-2"
                                disabled={this.state.uploadedFileName.length > 0}
                            >
                                {this.state.uploadedFileName.length > 0 ?
                                        <React.Fragment>
                                            Nuotrauka įkelta ir išsaugota
                                        </React.Fragment>
                                    :
                                        <React.Fragment>
                                            Įkelti nuotrauką
                                        </React.Fragment>
                                }
                                <input
                                    type="file"
                                    onChange={(event) => this.imageUploadHandler(event)}
                                    hidden
                                />
                            </Button><br/>
                            <span style={{color: 'red'}}>{this.state.uploadedFileError}</span>
                            <TextField
                                error={this.state.spotifyIframeUrlError.length > 0}
                                helperText={this.state.spotifyIframeUrlError}
                                fullWidth
                                className="mt-2"
                                inputRef={this.spotifyIframeUrlRef}
                                label="Spotify dainos nuoroda"
                                variant="outlined"
                            /><br/>
                            <TextField
                                placeholder="Turinys*"
                                error={this.state.textError.length > 0}
                                helperText={this.state.textError}
                                className="mt-2"
                                fullWidth
                                multiline
                                inputRef={this.textRef}
                                rows={10}
                                variant="outlined"
                                rowsMax={Infinity}
                            /><br/>
                            <Grid
                                hidden={!this.state.loading}
                                container
                                justify="center"
                            >
                                <CircularProgress className="mb-2" />
                            </Grid>

                            <Grid
                                container
                                justify="center"
                                className="mt-2"
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={(event) => this.createPostHandler(event)}
                                >
                                    Sukurti
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default NewPost;