import React, {Component, createRef} from 'react';
import {
    Button,
    Card,
    CardContent, Checkbox, CircularProgress,
    FormControlLabel,
    FormGroup, FormHelperText,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import * as actions from "../../../../../actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Alert} from "@material-ui/lab";

class Register extends Component {
    state = {
        emailError: false,
        usernameError: false,
        passwordError: false,
        passwordRepeatError: false,
        checkboxError: false,
        rulesAccepted: false,
        errorText: null
    }

    constructor(props) {
        super(props);
        this.usernameRef = createRef();
        this.emailRef = createRef();
        this.passwordRef = createRef();
        this.passwordRepeatRef = createRef();
    }

    registerHandler() {
        let foundErrors = false;
        this.setState({
            emailError: false,
            usernameError: false,
            passwordError: false,
            passwordRepeatError: false,
            checkboxError: false,
            errorText: null
        });

        if (this.emailRef.current.value === '' || !this.emailRef.current.value.match('.+@.+\\..+')) {
            foundErrors = true;
            this.setState({emailError: true});
        }

        if (this.usernameRef.current.value === '') {
            foundErrors = true;
            this.setState({usernameError: true});
        }

        if (this.passwordRef.current.value === '') {
            foundErrors = true;
            this.setState({passwordError: true});
        }

        if (this.passwordRepeatRef.current.value === '') {
            foundErrors = true;
            this.setState({passwordRepeatError: true});
        }

        if (this.passwordRef.current.value !== this.passwordRepeatRef.current.value) {
            foundErrors = true;
            this.setState({
                passwordError: true,
                passwordRepeatError: true,
                errorText: 'Slaptažodžiai privalo sutapti!'
            });
        }

        if (!this.state.rulesAccepted) {
            foundErrors = true;
            this.setState({checkboxError: true});
        }

        if (foundErrors) {
            return;
        }

        this.props.register(this.emailRef.current.value, this.usernameRef.current.value, this.passwordRef.current.value);
    }

    render() {
        if (this.props.token !== null) {
            return (<Redirect to="/" />);
        }

        return (
            <Card className="mt-2">
                <CardContent>
                    <Typography color="textPrimary" gutterBottom align="center">
                        Registracija
                    </Typography>
                    <Grid
                        container
                        justify="center"
                    >
                        <form autoComplete="off">
                            <Alert hidden={this.props.error === null} severity="error">{this.props.error}</Alert>
                            <TextField
                                fullWidth
                                className="m-2"
                                required
                                error={this.state.usernameError}
                                inputRef={this.usernameRef}
                                label="Slapyvardis"
                                variant="outlined"
                            /><br/>
                            <TextField
                                fullWidth
                                className="m-2"
                                required
                                error={this.state.emailError}
                                inputRef={this.emailRef}
                                label="El. paštas"
                                variant="outlined"
                            /><br/>
                            <TextField
                                fullWidth
                                className="m-2"
                                label="Slaptažodis"
                                required
                                error={this.state.passwordError}
                                inputRef={this.passwordRef}
                                type="password"
                                variant="outlined"
                            /><br/>
                            <TextField
                                fullWidth
                                className="m-2"
                                required
                                label="Pakartokite slaptažodį"
                                error={this.state.passwordRepeatError}
                                inputRef={this.passwordRepeatRef}
                                type="password"
                                variant="outlined"
                            /><br/>
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    value="end"
                                    control={<Checkbox onChange={(event) => this.setState({rulesAccepted: event.target.checked})} color="primary" />}
                                    label="Susipažinau ir sutinku su taisyklėmis ir privatumo politika"
                                    labelPlacement="end"
                                />
                            </FormGroup>
                            <FormHelperText hidden={!this.state.checkboxError} style={{color: 'red'}}>Norint užsiregistruoti, būtina sutikti su taisyklėmis</FormHelperText>
                            <FormHelperText hidden={this.state.errorText === null} style={{color: 'red'}}>{this.state.errorText}</FormHelperText>
                            <Grid
                                hidden={!this.props.loading}
                                container
                                justify="center"
                            >
                                <CircularProgress className="mb-2" />
                            </Grid>
                            <br/>
                            <Grid
                                container
                                justify="center"
                            >
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: 'orange'}}
                                    onClick={() => this.registerHandler()}
                                >
                                    Registruotis
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
        register: (email, username, password) => dispatch(actions.register(email, username, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
