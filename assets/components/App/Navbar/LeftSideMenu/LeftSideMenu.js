import React from 'react';
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {
    AccountCircle, Album,
    Announcement,
    ChatBubble, Event,
    ExitToApp, Face, Forum,
    Group,
    LabelImportant, LibraryMusic,
    RssFeed,
    Search, SpeakerGroup, VideoLibrary
} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import {useHistory} from "react-router";

function LeftSideMenu() {
    const history = useHistory();

    const redirectToProfilePageHandler = () => {
        history.push('./profilis');
    };

    const redirectToMainPageHandler = () => {
        history.push('/');
    };

    const logoutHandler = () => {
        console.log("logout");
    };

    return (
        <div>
            <List>
                <ListItem button onClick={redirectToProfilePageHandler}>
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="admin@admin.dev" />
                </ListItem>
                <ListItem button onClick={logoutHandler}>
                    <ListItemIcon>
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
            <Divider />
            {/*Naujienos*/}
            {/*Draugai*/}
            {/*Srautas*/}
            {/*TOP40*/}
            {/*Lietuvos TOP30*/}
            {/*Paieška*/}
            {/*Įrašai*/}
            <List>
                <ListItem button>
                    <ListItemIcon><Announcement /></ListItemIcon>
                    <ListItemText primary={"Naujienos"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Group /></ListItemIcon>
                    <ListItemText primary={"Draugai"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><RssFeed /></ListItemIcon>
                    <ListItemText primary={"Srautas"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><LabelImportant /></ListItemIcon>
                    <ListItemText primary={"TOP40"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><LabelImportant /></ListItemIcon>
                    <ListItemText primary={"Lietuvos TOP30"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Search /></ListItemIcon>
                    <ListItemText primary={"Paieška"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><ChatBubble /></ListItemIcon>
                    <ListItemText primary={"Įrašai"} />
                </ListItem>
            </List>
            <Divider />
            {/*Grupės*/}
            {/*Albumai*/}
            {/*Vaizdo klipai*/}
            {/*Dainų vertimai*/}
            {/*Renginiai*/}
            <List>
                <ListItem button>
                    <ListItemIcon><SpeakerGroup /></ListItemIcon>
                    <ListItemText primary={"Grupės"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Album /></ListItemIcon>
                    <ListItemText primary={"Albumai"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><VideoLibrary /></ListItemIcon>
                    <ListItemText primary={"Vaizdo klipai"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><LibraryMusic /></ListItemIcon>
                    <ListItemText primary={"Dainų vertimai"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Event /></ListItemIcon>
                    <ListItemText primary={"Renginiai"} />
                </ListItem>
            </List>
            <Divider />
            {/*Forumas*/}
            {/*Narių sąrašas*/}
            <List>
                <ListItem button>
                    <ListItemIcon><Forum /></ListItemIcon>
                    <ListItemText primary={"Diskusijos"} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Face /></ListItemIcon>
                    <ListItemText primary={"Narių sąrašas"} />
                </ListItem>
            </List>
        </div>
    );
}

export default LeftSideMenu;