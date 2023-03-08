import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Routes, Route, Navigate, useParams, NavLink, useNavigate} from 'react-router-dom';

import {Footer, Header, Home, NotFound} from "./components";
import {login, logout} from "./Features/User/Store/userReducer";
import Dashboard from "./Features/User/components";
import {
    AppBar, BottomNavigation, BottomNavigationAction,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    IconButton, ListItem, ListItemText, Slide,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Toolbar,
    Typography
} from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CloseIcon from "@mui/icons-material/Close";
import {AddIdeaForm, Ideas} from "./Features/Ideas/components";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {GoalDetails, GoalsList} from "./Features/Goal/components";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import GradeIcon from "@mui/icons-material/Grade";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {TargetDetails} from "./Features/Target/components";

function App() {

    const navigate = useNavigate();

    const [mobileNav, setMobileNav] = useState(0);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(login())
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const [open, setOpen] = useState(false);



    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>

            <main className={'bg-[#F2F7FF] dark:bg-[#0b1727] text-[#5e6e82] dark:text-[#9da9bb] h-100 relative'}>
                <Header toRemoveThisOne={handleLogin} user={user} isLoggedIn={user.isLoggedIn}
                        handleLogout={handleLogout}/>

                <div className={'my-10'}>

                    <Routes>

                        <Route exact path={'/'} element={<Home/>}/>
                        <Route path={'/dashboard'} element={user.isLoggedIn ? <Dashboard user={user}/> :
                            <Navigate to={'/login'} replace={true}/>}/>
                        <Route path={'/ideas/goal/:goalId'}
                               element={user.isLoggedIn ? <Ideas/> : <Navigate to={'/login'} replace={true}/>}/>
                        <Route path={'/ideas'}
                               element={user.isLoggedIn ? <Ideas/> : <Navigate to={'/login'} replace={true}/>}/>
                        <Route path={'/goals/:goalId'}
                               element={user.isLoggedIn ? <GoalDetails/> : <Navigate to={'/login'} replace={true}/>}/>
                        <Route path={'/goals'}
                               element={user.isLoggedIn ? <GoalsList/> : <Navigate to={'/login'} replace={true}/>}/>
                        <Route path={'/targets/:targetId'}
                               element={user.isLoggedIn ? <TargetDetails/> : <Navigate to={'/login'} replace={true}/>}/>
                        <Route path={'*'} element={<NotFound isLoggedIn={user.isLoggedIn}/>}/>

                    </Routes>

                </div>

                {user.isLoggedIn ? (
                    <section className={'md:hidden fixed bottom-0 w-full'}>
                        <BottomNavigation
                            showLabels
                            value={mobileNav}
                            onChange={(event, newValue) => {
                                setMobileNav(newValue);
                                navigate(newValue);
                            }}
                            className={'bg-gray-100 dark:bg-gray-900'}
                        >
                            <BottomNavigationAction className={'text-gray-700 dark:text-gray-300'} label="Agenda"
                                                    icon={<ViewAgendaIcon/>} value="/agenda"/>
                            <BottomNavigationAction className={'text-gray-700 dark:text-gray-300'} label="Favorites"
                                                    icon={<GradeIcon/>} value="/favorites"/>
                            <BottomNavigationAction className={'text-gray-700 dark:text-gray-300'} label="Dashboard"
                                                    icon={<DashboardIcon/>} value="/dashboard"/>
                        </BottomNavigation>
                    </section>
                ) : ''}
                <Footer/>

            </main>

        </>
    );
}

export default App;
