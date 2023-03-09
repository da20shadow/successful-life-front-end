import {NavLink} from "react-router-dom";
import {
    Container, AppBar, Box,
    Toolbar, IconButton, Typography,
    Menu, Avatar, Button, Tooltip, MenuItem, BottomNavigation, BottomNavigationAction
} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import Sidebar from "./Sidebar";
import DarkModeSwitch from "../ui/DarkModeSwitch";
import AvatarMenu from "../common/AvatarMenu";

const Header = ({toRemoveThisOne,user,isLoggedIn,handleLogout}) => {

    //Sidebar menu state
    const [sidebarState, setSidebarState] = useState(false);

    const toggleDrawer = (open) => {
        setSidebarState(open);
    };

    const handleDarkModeChange = (isDarkMode) => {
        // TODO: Handle dark mode change
    };

    const topPublicNavLinks = [
        {name: 'Home',path: '/'},
        {name: 'FAQ',path: '/faq'},
        {name: 'About',path: '/about'},
        {name: 'Login',path: '/login'},
        {name: 'Register',path: '/register'}
    ];
    const topPrivateNavLinks = [
        {name:'Dashboard', path: '/dashboard'},
        {name:'Ideas', path: '/ideas'},
        {name:'Goals', path: '/goals'},
        {name:'Agenda', path: '/agenda'},
        {name:'Favorites', path: '/favorites'},
    ];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);


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
        handleLogout();
        handleCloseUserMenu();
    }

    return (
        <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-700">

            <div className="flex flex-wrap items-center">
                {
                    isLoggedIn
                        ? (
                            <button
                                className="text-gray-700 dark:text-gray-300 p-1 ml-4 rounded-md"
                                onClick={() => toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </button>
                        )
                        : ( <p>LOGO</p> )
                }
                {/* TODO: REMOVE THIS BUTTON AND THE FUNCTION PROP */}
                <Button onClick={()=> toRemoveThisOne()} variant="contained" size="small">
                    Login
                </Button>
            </div>

            <nav className="hidden ml-6 space-x-4 md:block">
                {isLoggedIn ? (
                    topPrivateNavLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-3 py-2 text-gray-700 dark:text-gray-300 font-medium rounded-md bg-gray-100 dark:bg-gray-700'
                                    : 'px-3 py-2 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))
                ) : (
                    topPublicNavLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-3 py-2 text-gray-700 dark:text-gray-300 font-medium rounded-md bg-gray-100 dark:bg-gray-700'
                                    : 'px-3 py-2 text-gray-700 dark:text-gray-300 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700'
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))
                )}
            </nav>

            <div className="flex items-center">
                <DarkModeSwitch />
                <AvatarMenu
                    isLoggedIn={isLoggedIn}
                    user={user}
                    handleLogout={handleLogout}
                />
            </div>
            <Sidebar
                sidebarState={sidebarState}
                toggleDrawer={toggleDrawer}
            />
        </header>
    );
}

export default Header;
