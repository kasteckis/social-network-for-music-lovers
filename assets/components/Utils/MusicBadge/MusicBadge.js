import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Badge} from "@material-ui/core";
import {Mail} from "@material-ui/icons";


function MusicBadge(props) {
    const useStyles = makeStyles({
        customBadge: {
            backgroundColor: "#2882CE",
            color: "white"
        }
    });

    const classes = useStyles();

    return (
        <Badge
            classes={{ badge: classes.customBadge }}
            badgeContent={props.badgeContent}
            anchorOrigin={props.anchorOrigin}
        >
            {props.children}
        </Badge>
    );
}

export default MusicBadge;
