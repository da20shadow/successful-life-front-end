import {Link, NavLink} from "react-router-dom";
import {
    Container, AppBar, Box,
    Toolbar, IconButton, Typography,
    Menu, Avatar, Button, Tooltip, MenuItem
} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

import Sidebar from "./Sidebar";

const Header = () => {
    //TODO: Remove isLogged
    const isLogged = true;

    //Sidebar menu state
    const [sidebarState, setSidebarState] = useState(false);
   
    const toggleDrawer = (open) => {
        setSidebarState(open);
    };

    const topPublicNavLinks = ['Home', 'FAQ', 'About', 'Login', 'Register'];
    const topPrivateNavLinks = [
        {name:'Dashboard', path: '/dashboard'},
        {name:'Agenda', path: '/agenda'},
        {name:'Favorites', path: '/favorites'},
    ];
    const avatarNavLinks = [
        {icon: <PersonIcon/> ,name:'Profile',path: '/profile'},
        {icon: <EditIcon /> ,name:'Edit Profile',path: '/edit-profile'},
        {icon: <SettingsIcon />, name:'Settings',path: '/settings'}
    ];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutHandler = () => {
        //TODO: logout the user
        handleCloseUserMenu();
    }

    return (
        <AppBar position="static" className={'mb-8'}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/*Logo*/}
                    {isLogged
                        ? ''
                        : (
                            <>
                                <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        display: {xs: 'none', md: 'flex'},
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    LOGO
                                </Typography>
                            </>
                        )
                    }

                    {/*Sidebar nav*/}
                    <Box sx={{flexGrow: 1, display: {xs: 'flex'}}}>

                        {/*Side bar open/close sidebar menu icon*/}
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => toggleDrawer(true)}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>

                        {/*Side bar menu*/}
                        <Sidebar sidebarState={sidebarState}
                                 toggleDrawer={toggleDrawer}/>
                    </Box>

                    {/*Top Nav Links*/}
                    {
                        isLogged
                            ? (
                                <Box sx={{flexGrow: 1, display: 'flex'}}>
                                    {topPrivateNavLinks.map((navLink) => (
                                        <Button
                                            key={navLink.name}
                                            onClick={handleCloseNavMenu}
                                            sx={{my: 2, color: 'white', display: 'block'}}
                                        >
                                            <NavLink to={navLink.path}>{navLink.name}</NavLink>
                                        </Button>
                                    ))}
                                </Box>
                            )
                            : (
                                <Box sx={{flexGrow: 1, display: 'flex'}}>
                                    {topPublicNavLinks.map((navLink) => (
                                        <Button
                                            key={navLink}
                                            onClick={handleCloseNavMenu}
                                            sx={{my: 2, color: 'white', display: 'block'}}
                                        >
                                            {navLink}
                                        </Button>
                                    ))}
                                </Box>
                            )
                    }


                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {avatarNavLinks.map((link) => (
                                <MenuItem key={link.name} onClick={handleCloseUserMenu}>
                                    {link.icon}
                                    <NavLink className={'ml-3'} to={link.path}>{link.name}</NavLink>
                                </MenuItem>
                            ))}
                            <MenuItem onClick={logoutHandler}>
                                <LogoutIcon />
                                <div className={'ml-3'} >Sign out</div>
                            </MenuItem>
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
