import React, {Component, createRef} from 'react';
import {Button, Card, CardContent, CircularProgress, FormControl, Grid, TextField, Typography} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import axios from "axios";

class ForgotPassword extends Component {

    state = {
        emailErrorText: '',
        emailSuccessText: ''
    }

    constructor(props) {
        super(props);
        this.emailRef = createRef();
    }

    submitForgotPasswordHandler(event) {
        event.preventDefault();
        let foundErrors = false;
        this.setState({
            emailErrorText: '',
            emailSuccessText: ''
        });

        if (this.emailRef.current.value === '' || !this.emailRef.current.value.match('.+@.+\\..+')) {
            foundErrors = true;
            this.setState({emailErrorText: "El. paštas neįvestas arba neatitinka el. pašto formato"});
        }

        if (foundErrors) {
            return;
        }

        const postData = {
            email: this.emailRef.current.value
        };

        axios.post('/api/forgot-password', postData)
            .then(response => {
                this.setState({emailSuccessText: response.data.text})
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
                        Pamiršau slaptažodį
                    </Typography>
                    <Grid
                        container
                        justify="center"
                    >
                        <form onSubmit={(event) => this.submitForgotPasswordHandler(event)}>
                            {
                                this.state.emailErrorText.length !== 0 ?
                                    <Alert severity="error">{this.state.emailErrorText}</Alert>
                                    :
                                    null
                            }
                            {
                                this.state.emailSuccessText.length !== 0 ?
                                    <Alert severity="success">{this.state.emailSuccessText}</Alert>
                                    :
                                    null
                            }
                            <TextField
                                error={this.state.emailErrorText.length !== 0}
                                fullWidth
                                className="m-2"
                                required
                                inputRef={this.emailRef}
                                label="El. paštas"
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
                                    onClick={(event) => this.submitForgotPasswordHandler(event)}
                                >
                                    Pamiršau slaptažodį
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default ForgotPassword;
