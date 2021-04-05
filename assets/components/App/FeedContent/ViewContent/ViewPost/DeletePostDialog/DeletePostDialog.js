import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";

class DeletePostDialog extends Component {
    render() {
        return (
            <Dialog open={this.props.postDeleteDialog} onClose={this.props.closePostDeleteDialog} aria-labelledby="form-dialog-title">
                <DialogTitle>Ar tikrai norite ištrinti šį įrašą?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => this.props.deletePostHandler()} color="primary">
                        Ištrinti
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DeletePostDialog;
