import React, {Component, createRef} from 'react';
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import axios from "axios";
import {withRouter} from "react-router-dom";

class NewNews extends Component {

    state = {
        titleError: '',
        spotifyIframeUrlError: '',
        textError: '',
        uploadedFileError: '',
        uploadedFileName: '',
    }


    constructor(props, context) {
        super(props, context);

        this.titleRef = createRef();
        this.spotifyIframeUrlRef = createRef();
        this.textRef = createRef();
    }

    createNewsHandler(event) {
        event.preventDefault();

        let foundErrors = false;
        this.setState({
            loading: false,
            titleError: '',
            spotifyIframeUrlError: '',
            textError: '',
            uploadedFileError: ''
        });

        if (this.titleRef.current.value.length === 0) {
            foundErrors = true;
            this.setState({
                titleError: 'Pavadinimas negali būti tusčias'
            });
        }

        // Gaunam pozicija kur baigiasi open.spotify.com/ kad veliau pridet +/embed/+
        const start = this.spotifyIframeUrlRef.current.value.lastIndexOf('.com/');
        // Norint pridet +/embed/+ cia turi buti false, t.y. jo turi kolkas nebuti, nes useris gali ir su juo idet
        const isAlreadyEmbed = this.spotifyIframeUrlRef.current.value.lastIndexOf('embed');

        if (start !== -1 && isAlreadyEmbed === -1) {
            this.spotifyIframeUrlRef.current.value  =
                this.spotifyIframeUrlRef.current.value.substring(0, start + 4) +
                '/embed' +
                this.spotifyIframeUrlRef.current.value.substring(start + 4)
            ;
        }


        if (this.spotifyIframeUrlRef.current.value.length < 15 && this.spotifyIframeUrlRef.current.value.length !== 0) {
            foundErrors = true;
            this.setState({
                spotifyIframeUrlError: 'Per trumpas spotify kodas, pavyzdys - https://open.spotify.com/track/7sWRlDoTDX8geTR8zzr2vt'
            });
        }

        if (this.textRef.current.value.length === 0) {
            foundErrors = true;
            this.setState({
                textError: 'Turinys negali būti tusčias'
            });
        }

        if (foundErrors) {
            return;
        }

        const spotifyUrl = this.spotifyIframeUrlRef.current.value ? this.spotifyIframeUrlRef.current.value : null;
        const newsData = {
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
        axios.post('/api/news', newsData, headers)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push("/naujienos/" + response.data.newsId);
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
        }).catch(error => {
            console.log(error);
        })
    }

    render() {

        return (
            <Card className="mt-2">
                {this.props.auth.roles && this.props.auth.roles.includes('ROLE_MOD') ?
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom align="center">
                            Naujos naujienos kūrimas
                        </Typography>
                        <Grid
                            container
                            justify="center"
                        >
                            <form style={{width: '100%'}} onSubmit={(event) => this.createNewsHandler(event)}>
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
                                        onClick={(event) => this.createNewsHandler(event)}
                                    >
                                        Sukurti
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>
                    </CardContent>
                    :
                    null
                }
            </Card>
        );
    }
}

export default withRouter(NewNews);
