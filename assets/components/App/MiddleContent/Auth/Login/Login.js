import React, {Component, createRef} from 'react';
import { connect } from 'react-redux';
import {Button, Card, CardContent, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import * as actions from '../../../../../actions/index';

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

    loginHandler() {
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
                        <form autoComplete="off">
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
                            <Button
                                variant="contained"
                                color="primary"
                                className="ml-5"
                                onClick={() => this.loginHandler()}
                            >
                                Prisijungti
                            </Button>
                        </form>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Login);
