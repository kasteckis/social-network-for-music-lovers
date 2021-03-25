import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Divider, TextField,
    Typography
} from "@material-ui/core";
import axios from "axios";
import Linkify from 'react-linkify';

class ChatBox extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.newMessageRef = React.createRef();
    }

    state = {
        messages: [],
        openDialog: false,
        newMessageErrorText: ''
    }

    handleClickOpen = () => {
        this.setState({openDialog: true});
    };

    handleClose = () => {
        this.setState({openDialog: false});
    };

    handleSubmitMessage = (event) => {
        event.preventDefault();
        this.setState({newMessageErrorText: ''});

        if (this.newMessageRef.current.value.length === 0) {
            this.setState({newMessageErrorText: 'Žinutė negali būti tusčia'});
            return;
        }

        const headers = {
            headers: {
                Authorization: 'Bearer ' + this.props.auth.token
            }
        };

        const data = {
            message: this.newMessageRef.current.value
        }

        axios.post('/api/chat-messages', data, headers)
            .then(response => {
                this.setState({messages: response.data});
            })
            .catch(error => {
                console.log(error);
            })

        this.setState({openDialog: false});
    }

    componentDidMount() {
        axios.get('/api/chat-messages')
            .then(response => {
                this.setState({messages: response.data});
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {

        const dialog = (
            <Dialog open={this.state.openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Pokalbiai</DialogTitle>
                <DialogContent>
                    <form onSubmit={(event) => this.handleSubmitMessage(event)}>
                        <TextField
                            error={this.state.newMessageErrorText.length !== 0}
                            helperText={this.state.newMessageErrorText}
                            autoFocus
                            inputRef={this.newMessageRef}
                            margin="dense"
                            label="Jūsų tekstas"
                            fullWidth
                            multiline
                            rows={10}
                            rowsMax={Infinity}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(event) => this.handleSubmitMessage(event)} color="primary">
                        Rašyti
                    </Button>
                </DialogActions>
            </Dialog>
        );

        return (
            <Card className="mt-2" variant="outlined">
                {dialog}
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        <b>Pokalbiai</b>
                    </Typography>
                    <Divider />
                    {this.props.auth.token === null ?
                        null
                        :
                        <Button className="mt-2 mb-2" variant="contained" style={{backgroundColor: 'orange'}} onClick={() => this.handleClickOpen()}>
                            Komentuoti
                        </Button>
                    }
                    {this.state.messages.map((message) => (
                        <React.Fragment key={message.id}>
                            <Typography variant="body2" component="p">
                                {message.date}
                            </Typography>
                            <Typography variant="body1" component="p" className="mb-2">
                                <a href="#">{message.username}</a>: <Linkify>{message.message}</Linkify>
                            </Typography>
                        </React.Fragment>
                    ))}
                </CardContent>
            </Card>
        );
    }
}

export default ChatBox;