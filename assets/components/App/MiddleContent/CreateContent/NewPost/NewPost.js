import React, {Component} from 'react';
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

class NewPost extends Component {
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
                        <form style={{width: '100%'}} onSubmit={(event) => this.loginHandler(event)}>
                            {/*{*/}
                            {/*    this.props.error !== null ?*/}
                            {/*        <Alert severity="error">{this.props.error}</Alert>*/}
                            {/*        :*/}
                            {/*        null*/}
                            {/*}*/}
                            <TextField
                                // error={this.state.emailError}
                                fullWidth
                                className="mt-2"
                                required
                                // inputRef={this.emailRef}
                                label="Pavadinimas"
                                variant="outlined"
                            /><br/>
                            <TextField
                                // error={this.state.emailError}
                                fullWidth
                                className="mt-2"
                                // inputRef={this.emailRef}
                                label="Spotify dainos nuoroda"
                                variant="outlined"
                            /><br/>
                            <TextField
                                placeholder="Turinys"
                                className="mt-2"
                                fullWidth
                                multiline
                                rows={10}
                                variant="outlined"
                                rowsMax={Infinity}
                            /><br/>
                            {/*<Grid*/}
                            {/*    hidden={!this.props.loading}*/}
                            {/*    container*/}
                            {/*    justify="center"*/}
                            {/*>*/}
                            {/*    <CircularProgress className="mb-2" />*/}
                            {/*</Grid>*/}

                            <Grid
                                container
                                justify="center"
                                className="mt-2"
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={(event) => console.log("kurti")}
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