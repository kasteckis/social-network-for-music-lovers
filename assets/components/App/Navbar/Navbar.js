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

                <AppBar position="static" style={{ background: '#808080' }}>
                    <Toolbar>
                        <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <img onClick={redirectToMainPageHandler} src="/logo.png" className={classes.logo}  alt="music.lt logo"/>
                        <Typography className={classes.title}>
                            {/*Tuscias komponentas, kad komponentai po juo butu desnioje puseje*/}
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

Navbar.propTypes = {
    selectedNavbarItem: PropTypes.string,
    selectNavbarItemHandler: PropTypes.func
};

export default Navbar;