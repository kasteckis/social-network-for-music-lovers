import React from "react";
import {
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider, IconButton, TextField,
    Typography
} from "@material-ui/core";
import AddCommentIcon from '@material-ui/icons/AddComment';
import axios from "axios";
import Linkify from 'react-linkify';
import {Redirect} from "react-router-dom";

class ChatBox extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.newMessageRef = React.createRef();
    }

    state = {
        messages: [],
        openDialog: false,
        newMessageErrorText: '',
        redirectToChatBoxFull: false,
        redirectTo: null
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.redirectToChatBoxFull || this.state.redirectTo) {
            this.setState({
                redirectToChatBoxFull: false,
                redirectTo: null
            });
        }
    }

    redirectToFullMessagesHandler(event) {
        event.preventDefault();
        this.setState({redirectToChatBoxFull: true});
    }

    redirectToUserHandler(event, name) {
        event.preventDefault();
        this.setState({redirectTo: '/profilis/' + name});
    }

    render() {
        let redirect = null;

        if (this.state.redirectToChatBoxFull) {
            redirect = (
                <Redirect to="/pokalbiai" />
            );
        }

        if (this.state.redirectTo) {
            redirect = (
                <Redirect to={this.state.redirectTo} />
            );
        }

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
                {redirect}
                {dialog}
                <CardContent>
                    <Typography className="mb-3" color="textPrimary" gutterBottom>
                        <b>Pokalbiai</b>
                        {this.props.auth.token === null ?
                            null
                            :
                            <IconButton className="float-right" style={{color: 'orange'}} onClick={() => this.handleClickOpen()}>
                                <AddCommentIcon />
                            </IconButton>
                        }
                    </Typography>
                    <Divider />
                    {/*{this.props.auth.token === null ?*/}
                    {/*    null*/}
                    {/*    :*/}
                    {/*    <Button className="mt-2 mb-2" variant="contained" style={{backgroundColor: 'orange'}} onClick={() => this.handleClickOpen()}>*/}
                    {/*        Komentuoti*/}
                    {/*    </Button>*/}
                    {/*}*/}
                    {this.state.messages.map((message) => (
                        <React.Fragment key={message.id}>
                            <Typography variant="body2" component="p">
                                {message.date}
                            </Typography>
                            <Typography variant="body1" component="p" className="mb-2">
                                <a onClick={(event) => this.redirectToUserHandler(event, message.username)} href="#">{message.username}</a>: <Linkify><span style={{wordBreak: 'break-word'}}>{message.message}</span></Linkify>
                            </Typography>
                        </React.Fragment>
                    ))}
                    <a href="#"
                       onClick={(event) => this.redirectToFullMessagesHandler(event)}
                       style={{textAlign: 'center', margin: '0 auto', display: 'block'}}
                    >
                        Daugiau žinučių
                    </a>
                </CardContent>
            </Card>
        );
    }
}

export default ChatBox;