import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GradeIcon from '@mui/icons-material/Grade';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import {NavLink} from "react-router-dom";
import {IconButton, Typography} from "@mui/material";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ListIcon from '@mui/icons-material/List';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SchoolIcon from '@mui/icons-material/School';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import MosqueIcon from '@mui/icons-material/Mosque';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function Sidebar({sidebarState, toggleDrawer}) {

    const sidebarTopLinks = [
        {icon: <GradeIcon/>, name: 'Favorites', path: '/favorites'},
        {icon: <TipsAndUpdatesIcon/>, name: 'Ideas', path: '/ideas'},
        {icon: <CalendarMonthIcon/>, name: 'Calendar', path: '/calendar'}
    ];

    const sidebarTasksLinks = [
        {icon: <LocalFireDepartmentIcon/>, name: 'Urgent', path: '/urgent-tasks'},
        {icon: <NewReleasesIcon/>, name: 'Important', path: '/important-tasks'},
        {icon: <ListIcon/>, name: 'All Tasks', path: '/tasks'},
    ];

    const sidebarGoalsLinks = [
        {icon: <EmojiEventsIcon/>, name: 'Achievements', path: '/achievements'},
        {icon: <SportsScoreIcon/>, name: 'All Goals', path: '/goals'},
        {icon: <FitnessCenterIcon/>, name: 'Health', path: '/health'},
        {icon: <SchoolIcon/>, name: 'Educational', path: '/educational'},
        {icon: <MonetizationOnIcon/>, name: 'Financial', path: '/financial'},
        {icon: <BusinessIcon/>, name: 'Business', path: '/business'},
        {icon: <WorkIcon/>, name: 'Career', path: '/career'},
        {icon: <VolunteerActivismIcon/>, name: 'Relationship', path: '/relationship'},
        {icon: <MosqueIcon/>, name: 'Spiritual', path: '/spiritual'},
        {icon: <SelfImprovementIcon/>, name: 'Personal', path: '/personal'},
    ];

    const sidebarOtherLinks = [
        {icon: <SettingsIcon/>, name: 'Settings', path: '/settings'},
        {icon: <HistoryIcon/>, name: 'History', path: '/history'},
        {icon: <AutoDeleteIcon/>, name: 'Trash', path: '/trash'},
    ];

    const list = () => (
        <Box
            sx={{width: 220}}
            role="presentation"
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
        >
            <List>
                {
                    sidebarTopLinks.map(link => {
                        return (
                            <ListItem key={link.name} disablePadding>
                                <ListItemButton>
                                    {link.icon}
                                    <NavLink className={'ml-3'} to={link.path}>{link.name}</NavLink>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
            <Divider/>
            <List>
                <Typography variant={'h5'} className={'pl-2'}>
                    TASKS
                </Typography>
                {
                    sidebarTasksLinks.map(link => {
                        return (
                            <ListItem key={link.name} disablePadding>
                                <ListItemButton>
                                    {link.icon}
                                    <NavLink className={'ml-3'} to={link.path}>{link.name}</NavLink>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
            <Divider/>
            <List>
                <Typography variant={'h5'} className={'pl-2'}>
                    GOALS
                </Typography>
                {
                    sidebarGoalsLinks.map(link => {
                        return (
                            <ListItem key={link.name} disablePadding>
                                <ListItemButton>
                                    {link.icon}
                                    <NavLink className={'ml-3'} to={link.path}>{link.name}</NavLink>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
            <Divider/>
            <List>
                <Typography variant={'h5'} className={'pl-2'}>
                    OTHER
                </Typography>
                {
                    sidebarOtherLinks.map(link => {
                        return (
                            <ListItem key={link.name} disablePadding>
                                <ListItemButton>
                                    {link.icon}
                                    <NavLink className={'ml-3'} to={link.path}>{link.name}</NavLink>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    );

    return (
        <Drawer
            anchor={'left'}
            open={sidebarState}
            onClose={() => toggleDrawer(false)}
        >
            <div className="absolute right-3.5">
                <IconButton onClick={() => toggleDrawer(false)} >
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            {/*<Button onClick={()=>toggleDrawer(false)}>x</Button>*/}
            <div className={'mt-10'}>
            <Divider />
            {list()}
            </div>
        </Drawer>
    );
}