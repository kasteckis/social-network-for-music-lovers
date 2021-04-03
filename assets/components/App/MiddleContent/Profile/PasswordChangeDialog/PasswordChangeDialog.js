import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import {withRouter} from "react-router-dom";

class PasswordChangeDialog extends Component {
    state = {
        dialogErrorText: ''
    }

    constructor(props, context) {
        super(props, context);
        this.oldPasswordRef = React.createRef();
        this.newPasswordRef = React.createRef();
        this.newPasswordRepeatRef = React.createRef();
    }

    handleSubmitPasswordChangeHandler(event) {
        event.preventDefault();

        this.setState({dialogErrorText: ''});

        if (this.oldPasswordRef.current.value.length === 0) {
            this.setState({dialogErrorText: 'Įveskite seną slaptažodį'});
            return;
        }

        if (this.newPasswordRef.current.value.length !== this.newPasswordRepeatRef.current.value.length) {
            this.setState({dialogErrorText: 'Slaptažodžiai nesutampa'});
            return;
        }

        if (this.newPasswordRef.current.value.length < 5) {
            this.setState({dialogErrorText: 'Slaptažodis per trumpas'});
            return;
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        const data = {
            oldPassword: this.oldPasswordRef.current.value,
            newPassword: this.newPasswordRef.current.value
        }

        axios.post('/api/user/change-password', data, headers)
            .then(response => {
                if (response.data.success) {
                    this.props.history.push('/atsijungti');
                } else {
                    this.setState({dialogErrorText: response.data.error})
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <Dialog open={this.props.passwordChangeDialog} onClose={this.props.closePasswordChangeDialogHandler} aria-labelledby="form-dialog-title">
                <DialogTitle>Slaptažodžio keitimas</DialogTitle>
                <DialogContent>
                    <form onSubmit={(event) => this.handleSubmitPasswordChangeHandler(event)}>
                        <Alert severity="info">Pasikeitus slaptažodį, reikės prisijungti iš naujo!</Alert>
                        {this.state.dialogErrorText.length !== 0 ?
                            <Alert className="mt-2" severity="error">{this.state.dialogErrorText}</Alert>
                            :
                            null
                        }
                        <TextField
                            type="password"
                            error={this.state.dialogErrorText.length !== 0}
                            autoFocus
                            inputRef={this.oldPasswordRef}
                            margin="dense"
                            label="Senas slaptažodis"
                            fullWidth
                        />
                        <Divider />
                        <TextField
                            type="password"
                            error={this.state.dialogErrorText.length !== 0}
                            inputRef={this.newPasswordRef}
                            margin="dense"
                            label="Naujas slaptažodis"
                            fullWidth
                        />
                        <TextField
                            type="password"
                            error={this.state.dialogErrorText.length !== 0}
                            inputRef={this.newPasswordRepeatRef}
                            margin="dense"
                            label="Pakartokite naują slaptažodį"
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(event) => this.handleSubmitPasswordChangeHandler(event)} color="primary">
                        Keisti slaptažodį
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withRouter(PasswordChangeDialog);
