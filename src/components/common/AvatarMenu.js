import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Menu, MenuItem} from '@mui/material';
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from '@mui/icons-material/Logout';

function AvatarMenu({isLoggedIn, user, handleLogout}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const avatarNavLinks = [
        {icon: <PersonIcon/>, name: 'Profile', path: '/profile'},
        {icon: <EditIcon/>, name: 'Edit Profile', path: '/edit-profile'},
        {icon: <SettingsIcon/>, name: 'Settings', path: '/settings'}
    ];

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <button
                        className="mr-4 focus:outline-none"
                        onClick={handleClick}
                        aria-label="User menu"
                    >
                        <Avatar alt={user.name} src={user.avatar}/>
                    </button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >

                        {avatarNavLinks.map((link) => (
                            <MenuItem key={link.name} onClick={handleClose}>
                                <Link to={link.path} className="flex items-center space-x-2">
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            </MenuItem>
                        ))}
                        <MenuItem className="flex items-center space-x-2"
                                  onClick={() => handleLogout()}>
                            <LogoutIcon/> <span>Logout</span>
                        </MenuItem>

                    </Menu>
                </div>
            ) : ''}
        </div>
    );
}

export default AvatarMenu;
