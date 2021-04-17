import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {
    Announcement,
    ChatBubble,
    Description,
    MusicNote,
    Poll,
    PostAdd,
    QueueMusic,
    RecordVoiceOver
} from "@material-ui/icons";
import {useHistory} from "react-router";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CreateContentPopup(props) {

    const history = useHistory();

    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.close}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="simple-dialog-title">Kurti turinį</DialogTitle>
                <List>
                    <ListItem button onClick={() => {
                        history.push('/irasai/naujas');
                        props.close();
                    }}>
                        <ListItemAvatar>
                            <Avatar>
                                <ChatBubble />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Kurti įrašą" />
                    </ListItem>
                    {props.auth.roles.includes("ROLE_MOD") ?
                        <ListItem button onClick={() => {
                            history.push('/naujienos/naujas');
                            props.close();
                        }}>
                            <ListItemAvatar>
                                <Avatar>
                                    <Announcement />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Kurti naujieną" />
                        </ListItem>
                        :
                        null
                    }
                    {/*<ListItem button onClick={() => console.log("aagfasdfas")}>*/}
                    {/*    <ListItemAvatar>*/}
                    {/*        <Avatar>*/}
                    {/*            <MusicNote />*/}
                    {/*        </Avatar>*/}
                    {/*    </ListItemAvatar>*/}
                    {/*    <ListItemText primary="Pridėti mėgstamą dainą" />*/}
                    {/*</ListItem>*/}
                    {/*<ListItem button onClick={() => console.log("aagfasdfas")}>*/}
                    {/*    <ListItemAvatar>*/}
                    {/*        <Avatar>*/}
                    {/*            <QueueMusic />*/}
                    {/*        </Avatar>*/}
                    {/*    </ListItemAvatar>*/}
                    {/*    <ListItemText primary="Pridėti grojaraštį" />*/}
                    {/*</ListItem>*/}
                    {/*<ListItem button onClick={() => console.log("aagfasdfas")}>*/}
                    {/*    <ListItemAvatar>*/}
                    {/*        <Avatar>*/}
                    {/*            <RecordVoiceOver />*/}
                    {/*        </Avatar>*/}
                    {/*    </ListItemAvatar>*/}
                    {/*    <ListItemText primary="Pridėti mėgstamą atlikėją" />*/}
                    {/*</ListItem>*/}
                    {/*<ListItem button onClick={() => console.log("aagfasdfas")}>*/}
                    {/*    <ListItemAvatar>*/}
                    {/*        <Avatar>*/}
                    {/*            <Description />*/}
                    {/*        </Avatar>*/}
                    {/*    </ListItemAvatar>*/}
                    {/*    <ListItemText primary="Pridėti dainos tekstą" />*/}
                    {/*</ListItem>*/}
                    {/*<ListItem button onClick={() => console.log("aagfasdfas")}>*/}
                    {/*    <ListItemAvatar>*/}
                    {/*        <Avatar>*/}
                    {/*            <PostAdd />*/}
                    {/*        </Avatar>*/}
                    {/*    </ListItemAvatar>*/}
                    {/*    <ListItemText primary="Pridėti blogo įrašą" />*/}
                    {/*</ListItem>*/}
                    {/*<ListItem button onClick={() => console.log("aagfasdfas")}>*/}
                    {/*    <ListItemAvatar>*/}
                    {/*        <Avatar>*/}
                    {/*            <Poll />*/}
                    {/*        </Avatar>*/}
                    {/*    </ListItemAvatar>*/}
                    {/*    <ListItemText primary="Sukurti balsavimą" />*/}
                    {/*</ListItem>*/}
                </List>
            </Dialog>
        </div>
    );
}

export default CreateContentPopup;