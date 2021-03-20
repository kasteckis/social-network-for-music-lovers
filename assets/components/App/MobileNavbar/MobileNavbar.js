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
            backgroundColor: 'orange',
        }
    });

    const classes = useStyles();

    return (
        <React.Fragment>
                {props.auth.token === null ?
                    <BottomNavigation value={value} onChange={handleChange} classes={{root: classes.root}} className="mobile-navbar" showLabels>
                        <BottomNavigationAction label="Srautas" value="" icon={<RssFeed />} />
                        <BottomNavigationAction label="Paieška" value="paieska" icon={<Search />} />
                        <BottomNavigationAction label="Registruotis" value="registruotis" icon={<ExitToApp />} />
                        <BottomNavigationAction label="Prisijungti" value="prisijungti" icon={<ExitToApp />} />

                    </BottomNavigation>
                    :
                    <BottomNavigation value={value} onChange={handleChange} classes={{root: classes.root}} className="mobile-navbar" showLabels>
                        {dialogOpen ? <CreateContentPopup open={dialogOpen} close={closeCreateContentDialogHandler} /> : null}
                        <BottomNavigationAction label="Srautas" value="" icon={<RssFeed />} />
                        <BottomNavigationAction label="Paieška" value="paieska" icon={<Search />} />
                        <BottomNavigationAction label="Įkelti" value="ikelti" icon={<AddCircle />} />
                        <BottomNavigationAction label="Draugai" value="draugai" icon={<Group />} />
                        <BottomNavigationAction label="Profilis" value="profilis" icon={<Person />} />
                    </BottomNavigation>
                }
        </React.Fragment>
    );
}

export default MobileNavbar;