import React, {useState, useEffect} from "react";
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {format} from 'date-fns';
import {Chip, Dialog, Fab, Slide} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {NavLink} from "react-router-dom";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SchoolIcon from "@mui/icons-material/School";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MosqueIcon from "@mui/icons-material/Mosque";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import {calculateDaysLeft} from "../../utils/helpers";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const GoalsList = () => {

    const [goals, setGoals] = useState([
        {
            id: 1, title: 'Goal Title One', createdAt: '2023-03-05', deadline: '2023-04-09', category: 'Educational',
            completedTargets: 2, totalTargets: 10
        },
        {
            id: 2, title: 'Goal Title Two', createdAt: '2023-03-08', deadline: '2023-04-07', category: 'Business',
            completedTargets: 4, totalTargets: 10
        },
        {
            id: 3, title: 'Goal Title Three', createdAt: '2023-02-08', deadline: '2023-03-07', category: 'Relationship',
            completedTargets: 6, totalTargets: 10
        },
        {
            id: 4, title: 'Goal Title Four', createdAt: '2023-02-18', deadline: '2023-03-04', category: 'Health',
            completedTargets: 9, totalTargets: 10
        },
        {
            id: 5, title: 'Goal Title Five', createdAt: '2023-02-18', deadline: '2023-03-04', category: 'Financial',
            completedTargets: 10, totalTargets: 10
        }
    ]);

    //Set states for Goal modal
    const [openAddGoalModal, setOpenAddGoalModal] = useState(false);

    useEffect(() => {
        // Make API call to get goals data

    }, []);

    //Open modal for adding new goal
    const addNewGoal = () => {
        setOpenAddGoalModal(true);
    };

    const goalCategories = [
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

    const createGoalCategoryLabel = (categoryName) => {
        const category = goalCategories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
        return (
            <div className="w-fit flex gap-2 items-center text-gray-500 text-sm">
                {category.icon} <span>{category.name}</span>
            </div>
        );
    }

    const goalCardStyle = `p-5 cursor-pointer relative bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-[#283445] 
    shadow hover:shadow-lg hover:-translate-y-1 active:scale-[0.95] transition duration-500 ease-in-out 
    border border-transparent hover:border-gray-300 hover:dark:border-gray-300 rounded-md`;

    return (
        <>
            <h1 className="text-gray-700 dark:text-gray-300 text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
                Goals 🏆
            </h1>

            <div className="m-3 sm:m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {goals.map((goal) => {
                    const progress = Math.floor((goal.completedTargets / goal.totalTargets) * 100);
                    const daysLeft = calculateDaysLeft(goal.createdAt, goal.deadline);
                    return (
                        <NavLink key={goal.id} to={`/goals/${goal.id}`}>
                            <div className={goalCardStyle}>
                                <div className="px-12 py-5 flex items-center justify-center">
                                    <CircularProgressbar value={progress} text={`${progress}%`}
                                                         strokeWidth={6}
                                                         styles={{path: {stroke: `hsl(${progress}, 100%, 50%)`}}}/>
                                </div>
                                <h3 className="text-lg text-center font-bold mb-2">{goal.title}</h3>
                                <p className="text-gray-500 text-sm mb-2"><InsertInvitationOutlinedIcon/> Deadline: {format(new Date(goal.deadline), 'MMM dd, yyyy')}</p>
                                <p className="text-gray-500 text-sm mb-2"><WatchLaterOutlinedIcon/> Days Left: {daysLeft}</p>

                                <p className="mb-3 text-gray-500 text-sm">
                                    <GpsFixedIcon/> {goal.completedTargets} of {goal.totalTargets} targets completed</p>
                                {createGoalCategoryLabel(goal.category)}
                            </div>
                        </NavLink>
                    )
                })}
            </div>

            {/*Add Goal Button*/}
            <Fab sx={{position: 'fixed', bottom: 65, right: 16}}
                 onClick={() => addNewGoal()}
                 color="primary" aria-label="add">
                <AddIcon/>
            </Fab>

            <Dialog
                fullWidth
                open={openAddGoalModal}
                TransitionComponent={Transition}
                onClose={() => setOpenAddGoalModal(false)}
                aria-describedby="add-idea-modal"
            >
                <h2>Add New Goal</h2>
                <input type="time"/>
                <input type="date"/>
                <input type="datetime-local"/>
                <input type="week"/>
                <input type="month"/>
                <input type="search"/>
                <p>TODO: create add goal form</p>

            </Dialog>
        </>
    );
};

export default GoalsList;
