import React, {Component} from 'react';
import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";

class DeletePostCommentDialog extends Component {
    render() {
        return (
            <Dialog open={this.props.postCommentDeleteDialog} onClose={this.props.closePostCommentDeleteDialog} aria-labelledby="form-dialog-title">
                <DialogTitle>Ar tikrai norite ištrinti šį komentarą?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => this.props.deletePostCommentHandler()} color="primary">
                        Ištrinti
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DeletePostCommentDialog;
