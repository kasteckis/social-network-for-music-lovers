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

class NewPost extends Component {

    state = {
        titleError: '',
        spotifyIframeUrlError: '',
        textError: ''
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
            textError: ''
        });

        if (this.titleRef.current.value.length < 5) {
            foundErrors = true;
            this.setState({
                titleError: 'Per trumpas pavadinimas'
            });
        }

        if (this.spotifyIframeUrlRef.current.value.length < 8) {
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


        if (foundErrors) {
            return;
        }


        const postData = {
            title: this.titleRef.current.value,
            spotifyIframeUrl: 'https://open.spotify.com/embed/track/' + this.spotifyIframeUrlRef.current.value,
            text: this.textRef.current.value
        };
        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };
        this.setState({loading: true});
        axios.post('/api/post', postData, headers)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            })
    }

    render() {
        return (
            <Card className="mt-2">
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
                            >
                                Upload a photo cover
                                <input
                                    type="file"
                                    onChange={() => console.log("ikeltas")}
                                    hidden
                                />
                            </Button><br/>
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