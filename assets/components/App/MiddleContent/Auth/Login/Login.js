import React, {Component, createRef} from 'react';
import { connect } from 'react-redux';
import {Button, Card, CardContent, CircularProgress, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import * as actions from '../../../../../actions/index';
import { Redirect } from "react-router-dom";

class Login extends Component {

    state = {
        emailError: false,
        passwordError: false
    }

    constructor(props) {
        super(props);
        this.emailRef = createRef();
        this.passwordRef = createRef();
    }

    loginHandler(event) {
        event.preventDefault();
        let foundErrors = false;
        this.setState({
            emailError: false,
            passwordError: false
        });

        if (this.emailRef.current.value === '' || !this.emailRef.current.value.match('.+@.+\\..+')) {
            foundErrors = true;
            this.setState({emailError: true});
        }

        if (this.passwordRef.current.value === '') {
            foundErrors = true;
            this.setState({passwordError: true});
        }

        if (foundErrors) {
            return;
        }

        this.props.onAuth(this.emailRef.current.value, this.passwordRef.current.value);
        console.log(this.emailRef.current.value);
        console.log(this.passwordRef.current.value);
    }

    render() {
        if (this.props.token !== null) {
            return (<Redirect to="/" />);
        }

        return (
            <Card className="mt-2">
                <CardContent>
                    <Typography color="textPrimary" gutterBottom align="center">
                        Prisijungimas
                    </Typography>
                    <Grid
                        container
                        justify="center"
                    >
                        <form onSubmit={(event) => this.loginHandler(event)}>
                            {
                                this.props.error !== null ?
                                    <Alert severity="error">{this.props.error}</Alert>
                                :
                                    null
                            }
                            <TextField
                                error={this.state.emailError}
                                fullWidth
                                className="m-2"
                                required
                                inputRef={this.emailRef}
                                label="El. paštas"
                                variant="outlined"
                            /><br/>
                            <TextField
                                error={this.state.passwordError}
                                fullWidth
                                className="m-2"
                                required
                                label="Slaptažodis"
                                inputRef={this.passwordRef}
                                type="password"
                                variant="outlined"
                            /><br/>
                            <Grid
                                hidden={!this.props.loading}
                                container
                                justify="center"
                            >
                                <CircularProgress className="mb-2" />
                            </Grid>

                            <Grid
                                container
                                justify="center"
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={(event) => this.loginHandler(event)}
                                >
                                    Prisijungti
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
