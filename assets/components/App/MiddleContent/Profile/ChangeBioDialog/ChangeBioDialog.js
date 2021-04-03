import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";

class ChangeBioDialog extends Component {
    render() {
        return (
            <Dialog open={this.props.bioDialog} onClose={this.props.closeBioDialogHandler} aria-labelledby="form-dialog-title">
                <DialogTitle>Bio</DialogTitle>
                <DialogContent>
                    <form onSubmit={(event) => this.props.handleSubmitBioHandler(event)}>
                        <TextField
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={this.props.dialogErrorText.length !== 0}
                            helperText={this.props.dialogErrorText}
                            autoFocus
                            inputRef={this.props.bioRef}
                            margin="dense"
                            label="Jūsų biografinė žinutė"
                            fullWidth
                            multiline
                            rows={10}
                            rowsMax={Infinity}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(event) => this.props.handleSubmitBioHandler(event)} color="primary">
                        Išsaugoti
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ChangeBioDialog;
