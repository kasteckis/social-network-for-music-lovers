import React from 'react';
import {Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import DraftsIcon from '@material-ui/icons/Drafts';
import {ChatBubble} from "@material-ui/icons";
import {useHistory} from "react-router";

function CreateContent() {
    const history = useHistory();

    return (
        <Card className="mt-2">
            <CardContent>
                <Typography color="textPrimary" gutterBottom align="center">
                    Ką norėsite kurti šiandien?
                </Typography>
                <Divider />
                <List>
                    <ListItem button onClick={() => history.push('./irasai/naujas')}>
                        <ListItemIcon>
                            <ChatBubble />
                        </ListItemIcon>
                        <ListItemText primary="Kurti įrašą" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Kurti kažką kito" />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}

export default CreateContent;