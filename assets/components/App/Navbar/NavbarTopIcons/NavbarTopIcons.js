import React from 'react';
import {IconButton, useMediaQuery} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";
import './NavbarTopIcons.css';
import {useHistory} from "react-router";

function NavbarTopIcons() {

    const history = useHistory();

    return (
        <IconButton className="navbar-top-icons" color="inherit" onClick={() => history.push('/ikelti')}>
            <AddCircle />
        </IconButton>
    );
}

export default NavbarTopIcons;
