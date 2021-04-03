import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

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

        console.log("keiciam pswq");
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

export default PasswordChangeDialog;
