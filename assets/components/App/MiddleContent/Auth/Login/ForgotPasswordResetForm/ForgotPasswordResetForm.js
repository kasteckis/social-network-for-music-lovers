import React, {Component, createRef} from 'react';
import {Button, Card, CardContent, CircularProgress, Grid, TextField, Typography} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import {withRouter} from "react-router-dom";

class ForgotPasswordResetForm extends Component {

    state = {
        loading: true,
        isCodeValid: false,
        errorText: '',
        successText: ''
    }

    constructor(props) {
        super(props);
        this.newPassword = createRef();
        this.newPasswordRepeat = createRef();
    }

    componentDidMount() {
        axios.get('/api/forgot-password/' + this.props.match.params.hash)
            .then(response => {
                this.setState({
                    loading: false,
                    isCodeValid: response.data.valid,
                    errorText: response.data.valid ? '' : 'Kodas nebegalioja arba neegzistuoja'
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            })
    }

    resetPasswordHandler(event) {
        event.preventDefault();
        this.setState({errorText: ''});
        if (this.newPassword.current.value !== this.newPasswordRepeat.current.value) {
            this.setState({errorText: 'Slaptažodžiai nesutampa'});
            return;
        }

        if (this.newPassword.current.value.length < 5) {
            this.setState({errorText: 'Naujas slaptažodis per trumpas'});
            return;
        }

        this.setState({successText: 'Slaptažodis pakeistas.'});
        setTimeout(() => {
            this.props.history.push('/prisijungti');
        }, 1000);
    }

    render() {
        return (
            <Card className="mt-2">
                <CardContent>
                    <Typography color="textPrimary" gutterBottom align="center">
                        Slaptažodžio atstatymas
                    </Typography>
                    <Grid
                        container
                        justify="center"
                    >
                        {this.state.loading ?
                            <Grid
                                container
                                justify="center"
                            >
                                <CircularProgress className="mb-2" />
                            </Grid>
                            :
                            <React.Fragment>
                                {
                                    this.state.errorText.length !== 0 ?
                                        <Alert style={{width: '100%'}} severity="error">{this.state.errorText}</Alert>
                                        :
                                        null
                                }
                                {
                                    this.state.successText.length !== 0 ?
                                        <Alert style={{width: '100%'}} severity="success">{this.state.successText}</Alert>
                                        :
                                        null
                                }
                                {this.state.isCodeValid ?
                                    <form onSubmit={(event) => this.resetPasswordHandler(event)}>
                                        <TextField
                                            error={this.state.errorText.length !== 0}
                                            fullWidth
                                            className="m-2"
                                            type="password"
                                            required
                                            inputRef={this.newPassword}
                                            label="Naujas slaptažodis"
                                            variant="outlined"
                                        /><br/>
                                        <TextField
                                            error={this.state.errorText.length !== 0}
                                            fullWidth
                                            className="m-2"
                                            type="password"
                                            required
                                            inputRef={this.newPasswordRepeat}
                                            label="Pakartokite naują slaptažodį"
                                            variant="outlined"
                                        /><br/>

                                        <Grid
                                            container
                                            justify="center"
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                style={{backgroundColor: 'orange'}}
                                                onClick={(event) => this.resetPasswordHandler(event)}
                                            >
                                                Atstatyti naują slaptažodį
                                            </Button>
                                        </Grid>
                                    </form>
                                    :
                                    null
                                }
                            </React.Fragment>
                        }
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withRouter(ForgotPasswordResetForm);
