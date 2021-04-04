import React, {Component} from 'react';
import {
    Avatar, Button,
    Card,
    CardActionArea, CardActions,
    CardContent, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider, Grid, IconButton, List,
    ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField,
    Typography
} from "@material-ui/core";
import {Face, Favorite, Save} from "@material-ui/icons";
import axios from "axios";
import {shallowEqual} from "recompose";
import ChangeBioDialog from "./ChangeBioDialog/ChangeBioDialog";
import {withRouter} from "react-router-dom";
import PasswordChangeDialog from "./PasswordChangeDialog/PasswordChangeDialog";

class Profile extends Component {
    state = {
        auth: null,
        user: {
            id: null,
            username: null,
            email: null,
            roles: [],
            bio: '',
            role: null,
            registered: null,
            profilePicture: null,
            emailConfirmed: true
        },
        dataLoaded: false,
        dialogErrorText: '',
        bioDialog: false,
        passwordChangeDialog: false,
        editEmail: false,
        editEmailErrorText: '',
        editUsername: false,
        editUsernameErrorText: '',
        emailConfirmationEmailSent: false
    }

    constructor(props, context) {
        super(props, context);
        this.bioRef = React.createRef();
        this.usernameRef = React.createRef();
        this.emailRef = React.createRef();
    }

    componentDidMount() {
        this.setState({auth: this.props.auth});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!shallowEqual(prevProps.auth, this.props.auth)) {
            this.setState({auth: this.props.auth});
        }

        if (this.state.auth.token && this.state.user.id === null) {
            const headers = {
                headers: {
                    Authorization: 'Bearer ' + this.state.auth.token
                }
            };

            axios.get('/api/user', headers)
                .then(response => {
                    this.setState({user: response.data, dataLoaded: true})
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    uploadProfilePictureHandler(event) {
        const file = event.target.files[0];

        axios.post('/api/user/profile-picture', file, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + this.props.auth.token
            }
        }).then(response => {
            this.setState({user: response.data})
        })
        .catch(error => {
            console.log(error);
        })
    }

    openBioDialogHandler(event) {
        event.preventDefault();

        this.setState({bioDialog: true, dialogErrorText: ''});
        setTimeout(() => {
            this.bioRef.current.value = this.state.user.bio;
        }, 100);
    }

    closeBioDialogHandler = () => {
        this.setState({bioDialog: false});
    };

    closePasswordChangeDialogHandler = () => {
        this.setState({passwordChangeDialog: false});
    };

    resendEmailConfirmationHandler(event) {
        event.preventDefault();

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        axios.post('/api/user/resend-email-confirmation', {}, headers)
            .then(response => {
                if (response.data.success) {
                    this.setState({emailConfirmationEmailSent: true});
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleSubmitBioHandler(event) {
        event.preventDefault();

        const data = {
            bio: this.bioRef.current.value
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        axios.post('/api/profile/bio', data, headers)
            .then(response => {
                this.setState({user: response.data});
                this.closeBioDialogHandler();
            })
            .catch(error => {
                console.log(error);
            })
    }

    saveEmailHandler() {
        if (this.state.user.email === this.emailRef.current.value) {
            this.setState({
                editEmail: false
            });
            return;
        }

        const data = {
            email: this.emailRef.current.value
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        axios.post('/api/user/email', data, headers)
            .then(response => {
                if (response.data.error) {
                    this.setState({editEmailErrorText: response.data.error});
                } else {
                    this.setState({
                        editEmail: false,
                        user: response.data
                    });
                    this.props.history.push('/atsijungti');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    saveUsernameHandler() {
        if (this.state.user.username === this.usernameRef.current.value) {
            this.setState({
                editUsername: false
            });
            return;
        }

        const data = {
            username: this.usernameRef.current.value
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        axios.post('/api/user/username', data, headers)
            .then(response => {
                if (response.data.error) {
                    this.setState({editUsernameErrorText: response.data.error});
                } else {
                    this.setState({
                        editUsername: false,
                        user: response.data
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const bioDialog = (
            <ChangeBioDialog
                bioDialog={this.state.bioDialog}
                closeBioDialogHandler={this.closeBioDialogHandler}
                handleSubmitBioHandler={(event) => this.handleSubmitBioHandler(event)}
                dialogErrorText={this.state.dialogErrorText}
                bioRef={this.bioRef}
            />
        );

        const passwordChangeDialog = (
            <PasswordChangeDialog
                passwordChangeDialog={this.state.passwordChangeDialog}
                closePasswordChangeDialogHandler={this.closePasswordChangeDialogHandler}
                auth={this.props.auth}
            />
        );

        return (
            <Card>
                <List>
                    <CardContent>
                        {bioDialog}
                        {passwordChangeDialog}
                        <input
                            ref={input => this.fileInputElement = input}
                            type="file"
                            onChange={(event) => this.uploadProfilePictureHandler(event)}
                            hidden
                        />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <CardActionArea onClick={() => this.fileInputElement.click()}>
                                        {this.state.dataLoaded ?
                                            <React.Fragment>
                                                {this.state.user.profilePicture ?
                                                        <img style={{maxWidth: '100%'}} src={"/images/profile/" + this.state.user.profilePicture} alt={this.state.user.username + ' profilio nuotrauka'} />
                                                        :
                                                        <img style={{maxWidth: '100%'}} src="/images/default_profile_picture.png" alt={this.state.user.username + ' profilio nuotrauka'} />
                                                }
                                            </React.Fragment>
                                            :
                                            null
                                        }
                                    </CardActionArea>
                                </Avatar>
                            </ListItemAvatar>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.user.username} - Profilis
                            </Typography>
                        </ListItem>
                    </CardContent>

                    <CardActionArea onClick={(event) => this.openBioDialogHandler(event)}>
                        <CardContent>
                            <ListItem>
                                <Typography align="center" variant="body2" color="textSecondary" component="p">
                                    {this.state.user.bio}
                                </Typography>
                            </ListItem>
                        </CardContent>
                    </CardActionArea>

                    <CardActionArea>
                        <CardContent>
                            <ListItem>
                                <ListItemText primary="Užsiregistruota" secondary={this.state.user.registered} />
                            </ListItem>
                        </CardContent>
                    </CardActionArea>
                    <CardActionArea>
                        <CardContent>
                            <ListItem>
                                <ListItemText primary="Rolė" secondary={this.state.user.role} />
                            </ListItem>
                        </CardContent>
                    </CardActionArea>
                    <Divider/>
                    {this.state.editEmail ?
                        <CardContent>
                            <span style={{width: '100%', color: 'red'}}>Pasikeitus el. paštą, reikės prisijungti iš naujo</span>
                            <ListItem>
                                <TextField
                                    error={this.state.editEmailErrorText.length > 0}
                                    helperText={this.state.editEmailErrorText}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputRef={this.emailRef}
                                    margin="dense"
                                    label="Jūsų el. paštas"
                                    fullWidth
                                />
                                <IconButton onClick={() => this.saveEmailHandler()} >
                                    <Save />
                                </IconButton>
                            </ListItem>
                        </CardContent>
                        :
                        <React.Fragment>
                            {this.state.user.emailConfirmed ?
                                null
                                :
                                <div style={{textAlign: 'center'}}>
                                    <Grid
                                        container
                                        justify="center"
                                    >
                                        <span style={{width: '100%', color: 'red'}}>El. paštas yra nepatvirtintas. Patvirtinkite jį savo el. pašte.</span>
                                        {this.state.emailConfirmationEmailSent ?
                                            <Button variant="contained" color="secondary" disabled={true}>
                                                Laiškas išsiųstas
                                            </Button>
                                            :
                                            <Button variant="contained" color="secondary" onClick={(event) => this.resendEmailConfirmationHandler(event)}>
                                                Persiųsti laišką
                                            </Button>
                                        }
                                    </Grid>
                                </div>
                            }
                            <CardActionArea onClick={() => {
                                this.setState({editEmail: true});
                                setTimeout(() => {
                                    this.emailRef.current.value = this.state.user.email;
                                }, 100);
                            }}>
                                <CardContent>
                                    <ListItem>
                                        <ListItemText primary="El. paštas" secondary={this.state.user.email} />
                                    </ListItem>
                                </CardContent>
                            </CardActionArea>
                        </React.Fragment>
                    }
                    {this.state.editUsername ?
                        <CardContent>
                            <ListItem>
                                <TextField
                                    error={this.state.editUsernameErrorText.length > 0}
                                    helperText={this.state.editUsernameErrorText}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputRef={this.usernameRef}
                                    margin="dense"
                                    label="Slapyvardis"
                                    fullWidth
                                />
                                <IconButton onClick={() => this.saveUsernameHandler()} >
                                    <Save />
                                </IconButton>
                            </ListItem>
                        </CardContent>
                        :
                        <CardActionArea onClick={() => {
                            this.setState({editUsername: true});
                            setTimeout(() => {
                                this.usernameRef.current.value = this.state.user.username;
                            }, 100);
                        }}>
                            <CardContent>
                                <ListItem>
                                    <ListItemText primary="Slapyvardis" secondary={this.state.user.username} />
                                </ListItem>
                            </CardContent>
                        </CardActionArea>
                    }
                    <CardActionArea onClick={() => this.setState({passwordChangeDialog: true})}>
                        <CardContent>
                            <ListItem>
                                <ListItemText primary="Slaptažodis" secondary="*********" />
                            </ListItem>
                        </CardContent>
                    </CardActionArea>
                </List>
            </Card>
        );
    }
}

export default withRouter(Profile);
