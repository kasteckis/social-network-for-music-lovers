import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {Group, Headset, Info, InsertEmoticon} from "@material-ui/icons";

function Navbar(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            MUSIC.LT
                        </Typography>
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <Headset />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <InsertEmoticon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Info />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Group />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
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