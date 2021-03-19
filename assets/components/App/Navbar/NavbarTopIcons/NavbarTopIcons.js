import React, {useState} from 'react';
import {IconButton} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";
import './NavbarTopIcons.css';
import CreateContentPopup from "../../MiddleContent/CreateContent/CreateContentPopup/CreateContentPopup";

function NavbarTopIcons() {

    const [dialogOpen, setDialogOpen] = useState(false);

    const openCreateContentDialogHandler = () => {
        setDialogOpen(true);
    };

    const closeCreateContentDialogHandler = () => {
        setDialogOpen(false);
    }

    return (
        <React.Fragment>
            {dialogOpen ? <CreateContentPopup open={dialogOpen} close={closeCreateContentDialogHandler} /> : null}
            <IconButton className="navbar-top-icons" color="inherit" onClick={() => openCreateContentDialogHandler()}>
                <AddCircle />
            </IconButton>
        </React.Fragment>
    );
}

export default NavbarTopIcons;
