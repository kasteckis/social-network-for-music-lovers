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
import {useHistory} from "react-router";

function LeftSideMenu() {
    const history = useHistory();

    const redirectToProfilePageHandler = () => {
        history.push('/profilis');
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
                    <ListItemText primary="Atsijungti" />
                </ListItem>
                <ListItem button onClick={() => history.push('/prisijungti')}>
                    <ListItemIcon >
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Prisijungti" />
                </ListItem>
                <ListItem button onClick={() => history.push('/registruotis')}>
                    <ListItemIcon>
                        <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Registruotis" />
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
                <ListItem button onClick={() => history.push('/naujienos')}>
                    <ListItemIcon><Announcement /></ListItemIcon>
                    <ListItemText primary={"Naujienos"} />
                </ListItem>
                <ListItem button onClick={() => history.push('/draugai')}>
                    <ListItemIcon><Group /></ListItemIcon>
                    <ListItemText primary={"Draugai"} />
                </ListItem>
                <ListItem button onClick={() => history.push('/')}>
                    <ListItemIcon><RssFeed /></ListItemIcon>
                    <ListItemText primary={"Srautas"} />
                </ListItem>
                <ListItem button onClick={() => history.push('/top40')}>
                    <ListItemIcon><LabelImportant /></ListItemIcon>
                    <ListItemText primary={"TOP40"} />
                </ListItem>
                <ListItem button onClick={() => history.push('/top30lt')}>
                    <ListItemIcon><LabelImportant /></ListItemIcon>
                    <ListItemText primary={"Lietuvos TOP30"} />
                </ListItem>
                <ListItem button onClick={() => history.push('/paieska')}>
                    <ListItemIcon><Search /></ListItemIcon>
                    <ListItemText primary={"Paieška"} />
                </ListItem>
                <ListItem button onClick={() => history.push('/irasai')}>
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
                <ListItem button onClick={() => history.push('/grupes')}>
                    <ListItemIcon><SpeakerGroup /></ListItemIcon>
                    <ListItemText primary={"Grupės"} />
                </ListItem>
                <ListItem button onClick={() => history.push('/albumai')}>
                    <ListItemIcon><Album /></ListItemIcon>
                    <ListItemText primary={"Albumai"} />
                </ListItem>
                <ListItem button onClick={() => history.push('/klipai')}>
                    <ListItemIcon><VideoLibrary /></ListItemIcon>
                    <ListItemText primary={"Vaizdo klipai"} />
                </ListItem>
                <ListItem button onClick={() => history.push('/vertimai')}>
                    <ListItemIcon><LibraryMusic /></ListItemIcon>
                    <ListItemText primary={"Dainų vertimai"} />
                </ListItem>
                <ListItem button onClick={() => history.push('/renginiai')}>
                    <ListItemIcon><Event /></ListItemIcon>
                    <ListItemText primary={"Renginiai"} />
                </ListItem>
            </List>
            <Divider />
            {/*Forumas*/}
            {/*Narių sąrašas*/}
            <List>
                <ListItem button onClick={() => history.push('/diskusijos')}>
                    <ListItemIcon><Forum /></ListItemIcon>
                    <ListItemText primary={"Diskusijos"} />
                </ListItem>
                <ListItem button onClick={() => history.push('/nariai')}>
                    <ListItemIcon><Face /></ListItemIcon>
                    <ListItemText primary={"Narių sąrašas"} />
                </ListItem>
            </List>
        </div>
    );
}

export default LeftSideMenu;