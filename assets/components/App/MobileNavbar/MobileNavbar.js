import React from 'react';

import './MobileNavbar.css';
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import {AddCircle, Group, Person, RssFeed, Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import {useHistory} from "react-router";

function MobileNavbar() {
    const [value, setValue] = React.useState('recents');
    const history = useHistory();

    const handleChange = (event, newValue) => {
        history.push('./' + newValue);
        setValue(newValue);
    };

    const useStyles = makeStyles({
        root: {
            backgroundColor: 'orange',
        }
    });

    const classes = useStyles();

    return (
        <BottomNavigation value={value} onChange={handleChange} classes={{root: classes.root}} className="mobile-navbar">
            <BottomNavigationAction label="Srautas" value="srautas" icon={<RssFeed />} />
            <BottomNavigationAction label="Paieška" value="paieska" icon={<Search />} />
            <BottomNavigationAction label="Įkelti" value="ikelti" icon={<AddCircle />} />
            <BottomNavigationAction label="Draugai" value="draugai" icon={<Group />} />
            <BottomNavigationAction label="Profilis" value="profilis" icon={<Person />} />
        </BottomNavigation>
    );
}

export default MobileNavbar;