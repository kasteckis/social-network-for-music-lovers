import React, {useState} from 'react';

import './MobileNavbar.css';
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import {AddCircle, ExitToApp, Group, Person, RssFeed, Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import {useHistory} from "react-router";
import CreateContentPopup from "../FeedContent/CreateContent/CreateContentPopup/CreateContentPopup";

function MobileNavbar(props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [value, setValue] = React.useState('srautas');
    const history = useHistory();

    const handleChange = (event, newValue) => {
        switch (newValue) {
            case 'ikelti':
                openCreateContentDialogHandler();
                break;
            default:
                history.push('/' + newValue);
                setValue(newValue);
        }
    };

    const openCreateContentDialogHandler = () => {
        setDialogOpen(true);
    };

    const closeCreateContentDialogHandler = () => {
        setDialogOpen(false);
    }

    const useStyles = makeStyles({
        root: {
            backgroundColor: '#2882CE',
            actionItemStyles: {
                "&$selected": {
                    color: "red"
                }
            },
        },
        label: {
            color: 'white'
        }
    });

    const classes = useStyles();

    const white = {
        color: 'white'
    }

    return (
        <React.Fragment>
                {props.auth.token === null ?
                    <BottomNavigation value={value} onChange={handleChange} classes={{root: classes.root}} className="mobile-navbar" showLabels>
                        <BottomNavigationAction classes={{label: classes.label}} label="Srautas" value="" icon={<RssFeed style={white} />} />
                        <BottomNavigationAction classes={{label: classes.label}} label="Paieška" value="paieska" icon={<Search style={white} />} />
                        <BottomNavigationAction classes={{label: classes.label}} label="Registruotis" value="registruotis" icon={<ExitToApp style={white} />} />
                        <BottomNavigationAction classes={{label: classes.label}} label="Prisijungti" value="prisijungti" icon={<ExitToApp style={white} />} />

                    </BottomNavigation>
                    :
                    <BottomNavigation value={value} onChange={handleChange} classes={{root: classes.root}} className="mobile-navbar" showLabels>
                        {dialogOpen ? <CreateContentPopup open={dialogOpen} close={closeCreateContentDialogHandler} /> : null}
                        <BottomNavigationAction classes={{label: classes.label}} label="Srautas" value="" icon={<RssFeed style={white} />} />
                        <BottomNavigationAction classes={{label: classes.label}} label="Paieška" value="paieska" icon={<Search style={white} />} />
                        <BottomNavigationAction classes={{label: classes.label}} label="Įkelti" value="ikelti" icon={<AddCircle style={white} />} />
                        <BottomNavigationAction classes={{label: classes.label}} label="Draugai" value="draugai" icon={<Group style={white} />} />
                        <BottomNavigationAction classes={{label: classes.label}} label="Profilis" value="profilis" icon={<Person style={white} />} />
                    </BottomNavigation>
                }
        </React.Fragment>
    );
}

export default MobileNavbar;