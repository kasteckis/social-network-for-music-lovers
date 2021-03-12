import React, {Component, createRef} from 'react';
import {Button, Card, CardContent, Grid, TextField, Typography} from "@material-ui/core";

class Login extends Component {

    constructor(props) {
        super(props);
        this.emailRef = createRef();
        this.passwordRef = createRef();
    }

    loginHandler() {
        // todo login user
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
                        <form noValidate autoComplete="off">
                            <TextField
                                fullWidth
                                className="m-2"
                                required
                                inputRef={this.emailRef}
                                label="El. paštas"
                                variant="outlined"
                            /><br/>
                            <TextField
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

export default Login;