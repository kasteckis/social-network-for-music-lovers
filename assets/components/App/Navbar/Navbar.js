import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    IconButton,
    makeStyles,
    SwipeableDrawer,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import {useHistory} from "react-router";
import LeftSideMenu from "./LeftSideMenu/LeftSideMenu";
import NavbarTopIcons from "./NavbarTopIcons/NavbarTopIcons";

function Navbar(props) {

    const useStyles = makeStyles((theme) => ({
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        logo: {
            maxWidth: '200px',
            marginRight: '10px',
            flexGrow: 1, // padaro kad visas kitas contentas butu desniausioje puseje
        }
    }));

    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const redirectToMainPageHandler = () => {
        history.push('/');
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <LeftSideMenu
                auth={props.auth}
            />
        </div>
    );

    return (
            <div className={classes.root}>
                <React.Fragment key={'left'}>
                    <SwipeableDrawer
                        anchor={'left'}
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                        onOpen={toggleDrawer('left', true)}
                    >
                        {list('left')}
                    </SwipeableDrawer>
                </React.Fragment>

                <AppBar position="static" style={{ background: '#000000' }}>
                    <Toolbar>
                        <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <img style={{maxWidth: 40}} src="/menu.svg" alt="menu button"/>
                        </IconButton>
                        {/*<img onClick={redirectToMainPageHandler} src="/logo.png" className={classes.logo}  alt="music.lt logo"/>*/}
                        <Typography className={classes.title} variant="h5" component="h2">
                            MUSIC.LT
                        </Typography>
                        {props.auth.token === null ?
                                null
                            :
                                <NavbarTopIcons/>
                        }
                    </Toolbar>
                </AppBar>
            </div>
    );
}

export default Navbar;