import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    IconButton, List,
    makeStyles,
    SwipeableDrawer,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {AccountCircle, ExitToApp} from "@material-ui/icons";
import {useHistory} from "react-router";
import LeftSideMenu from "./LeftSideMenu/LeftSideMenu";

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
            maxWidth: '100px',
            marginRight: '10px'
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
            <LeftSideMenu />
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

                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <img onClick={redirectToMainPageHandler} src="https://www.freepnglogos.com/uploads/apple-music-logo-hd-png-10.png" className={classes.logo}  alt="music.lt logo"/>
                        {/*<Typography onClick={redirectToMainPageHandler} variant="h6" className={classes.title}>*/}
                        {/*    MUSIC.LT*/}
                        {/*</Typography>*/}
                    </Toolbar>
                </AppBar>

                {/*<nav className="navbar navbar-expand-lg navbar-light bg-warning">*/}
                {/*    <a className="navbar-brand" href="#">MUSIC.LT</a>*/}
                {/*    <button className="navbar-toggler" type="button" data-toggle="collapse"*/}
                {/*            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"*/}
                {/*            aria-expanded="false" aria-label="Toggle navigation">*/}
                {/*        <span className="navbar-toggler-icon"/>*/}
                {/*    </button>*/}

                {/*    <div className="collapse navbar-collapse" id="navbarSupportedContent">*/}
                {/*        <ul className="navbar-nav mr-auto">*/}
                {/*            <li className={props.selectedNavbarItem === 'muzika' ? 'nav-item active' : 'nav-item'}>*/}
                {/*                <a onClick={() => props.selectNavbarItemHandler('muzika')} className="nav-link">Muzika</a>*/}
                {/*            </li>*/}
                {/*            <li className={props.selectedNavbarItem === 'pramogos' ? 'nav-item active' : 'nav-item'}>*/}
                {/*                <a onClick={() => props.selectNavbarItemHandler('pramogos')}  className="nav-link">Pramogos</a>*/}
                {/*            </li>*/}
                {/*            <li className={props.selectedNavbarItem === 'informacija' ? 'nav-item active' : 'nav-item'}>*/}
                {/*                <a onClick={() => props.selectNavbarItemHandler('informacija')} className="nav-link">Informacija</a>*/}
                {/*            </li>*/}
                {/*            <li className={props.selectedNavbarItem === 'bendruomene' ? 'nav-item active' : 'nav-item'}>*/}
                {/*                <a onClick={() => props.selectNavbarItemHandler('bendruomene')} className="nav-link">Bendruomenė</a>*/}
                {/*            </li>*/}
                {/*            <li className={props.selectedNavbarItem === 'kita' ? 'nav-item active' : 'nav-item'}>*/}
                {/*                <a onClick={() => props.selectNavbarItemHandler('kita')} className="nav-link">Kita</a>*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*</nav>*/}
            </div>
    );
}

Navbar.propTypes = {
    selectedNavbarItem: PropTypes.string,
    selectNavbarItemHandler: PropTypes.func
};

export default Navbar;