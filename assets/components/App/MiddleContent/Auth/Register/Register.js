import React, {Component, createRef} from 'react';
import {
    Button,
    Card,
    CardContent, Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";

class Register extends Component {
    constructor(props) {
        super(props);
        this.usernameRef = createRef();
        this.emailRef = createRef();
        this.passwordRef = createRef();
        this.passwordRepeatRef = createRef();
    }

    registerHandler() {
        // todo register user
        console.log(this.usernameRef.current.value);
        console.log(this.passwordRef.current.value);
    }

    render() {
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
                            <TextField
                                fullWidth
                                className="m-2"
                                required
                                inputRef={this.usernameRef}
                                label="Slapyvardis"
                                variant="outlined"
                            /><br/>
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
                                label="Slaptažodis"
                                required
                                inputRef={this.passwordRef}
                                type="password"
                                variant="outlined"
                            /><br/>
                            <TextField
                                fullWidth
                                className="m-2"
                                required
                                label="Pakartokite slaptažodį"
                                inputRef={this.passwordRepeatRef}
                                type="password"
                                variant="outlined"
                            /><br/>
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    value="end"
                                    control={<Checkbox color="primary" />}
                                    label="Susipažinau ir sutinku su taisyklėmis ir privatumo politika"
                                    labelPlacement="end"
                                />
                            </FormGroup><br/>
                            <Button
                                variant="contained"
                                color="primary"
                                className="ml-5"
                                onClick={() => this.registerHandler()}
                            >
                                Registruotis
                            </Button>
                        </form>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default Register;