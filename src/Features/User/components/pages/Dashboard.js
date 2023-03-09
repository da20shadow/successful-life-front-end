import React, {useState} from "react";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {Dialog, Slide, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {AddIdeaForm} from "../../../Ideas/components";
import {NavLink} from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Dashboard({user}) {
    //Set states for Goal, Idea and Task modals
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
    const [openAddIdeaModal, setOpenAddIdeaModal] = useState(false);
    const [openAddGoalModal, setOpenAddGoalModal] = useState(false);

    const boxesInfo = {
        urgentTasks: 3,
        importantTasks: 5,
        ideas: 13,
        achievements: 13,
    };

    const tasks = [
        {id: 1, title: 'Task 1', status: 'In Progress', dueDate: '2022-03-01'},
        {id: 2, title: 'Task 2', status: 'Not Started', dueDate: '2022-03-05'},
        {id: 3, title: 'Task 3', status: 'Completed', dueDate: '2022-03-03'}
    ];

    //Add new goal,idea or task actions
    const actions = [
        {icon: <SportsScoreIcon/>, name: 'Goal'},
        {icon: <AddTaskIcon/>, name: 'Task'},
        {icon: <TipsAndUpdatesIcon/>, name: 'Idea'},
    ];
    //Open modal for adding new goal idea or task
    const addNew = (name) => {
        if (name === 'task') {
            setOpenAddTaskModal(true);
        } else if (name === 'idea') {
            setOpenAddIdeaModal(true);
        } else if (name === 'goal') {
            //TODO: open add goal modal form
            setOpenAddGoalModal(true);
        }
    };

    const boxCardStyle = `p-5 text-center cursor-pointer bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-[#283445] 
    shadow hover:shadow-lg hover:-translate-y-1 active:scale-[0.95] transition duration-500 ease-in-out 
    border border-transparent hover:border-gray-300 hover:dark:border-gray-300 rounded-md`;

    return (
        <>
            <div className="container mx-auto">

                <h1 className="text-gray-700 dark:text-gray-300 text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
                    Welcome, {user.firstName}!
                </h1>

                {/*TODO: add links for each to redirect to urgent/important tasks ideas etc*/}
                <div className="mb-20 mx-1 md:mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <NavLink to={'/urgent-tasks'}>
                        <div className={boxCardStyle}>
                            <div className="flex gap-3 justify-center items-center">
                                <LocalFireDepartmentIcon sx={{fontSize: '55px', color: '#da7326'}}/>
                                <div>
                                    <p className="text-gray-700 dark:text-blue-300 text-3xl font-bold">{boxesInfo.urgentTasks}</p>
                                    <h4 className="whitespace-nowrap text-gray-700 dark:text-gray-300 text-lg mb-4">Urgent Tasks</h4>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={'/important-tasks'}>
                        <div className={boxCardStyle}>
                            <div className="flex gap-3 justify-center items-center">
                                <NewReleasesIcon sx={{fontSize: '55px', color: '#ecc06e'}}/>
                                <div>
                                    <p className="text-gray-700 dark:text-blue-300 text-3xl font-bold">{boxesInfo.importantTasks}</p>
                                    <h4 className="whitespace-nowrap text-gray-700 dark:text-gray-300 text-lg mb-4">Important Tasks</h4>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={'/ideas'}>
                        <div className={boxCardStyle}>
                            <div className="flex gap-3 justify-center items-center">
                                <TipsAndUpdatesIcon sx={{fontSize: '55px', color: '#ecc06e'}}/>
                                <div>
                                    <p className="text-gray-700 dark:text-blue-300 text-3xl font-bold">{boxesInfo.ideas}</p>
                                    <h4 className="whitespace-nowrap text-gray-700 dark:text-gray-300 text-lg mb-4"> Ideas</h4>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={'/ideas'}>
                        <div className={boxCardStyle}>
                            <div className="flex gap-3 justify-center items-center">
                                <EmojiEventsIcon sx={{fontSize: '55px', color: '#ecc06e'}}/>
                                <div>
                                    <p className="text-gray-700 dark:text-blue-300 text-3xl font-bold">{boxesInfo.achievements}</p>
                                    <h4 className="whitespace-nowrap text-gray-700 dark:text-gray-300 text-lg mb-4">Achievements</h4>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                </div>

                <h2 className={'text-gray-700 dark:text-rose-100 text-3xl font-bold text-center'}>Urgent tasks!</h2>

                {/*Urgent tasks*/}
                <table className="mt-5 w-full">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due
                            Date
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task.id} className={`${index % 2 === 0
                            ? 'dark:bg-gray-700 bg-gray-200'
                            : 'dark:bg-gray-700 bg-gray-100'} dark:hover:bg-gray-900 bg-gray-300`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>

            {/*Add Idea,Task or Goal Button*/}
            {
                user.isLoggedIn
                    ? (<>
                            <SpeedDial
                                ariaLabel="Add new idea, task or goal."
                                sx={{position: 'fixed', bottom: 65, right: 16}}
                                icon={<SpeedDialIcon openIcon={<CloseIcon/>}/>}
                            >
                                {actions.map((action) => (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        tooltipOpen
                                        onClick={() => addNew(action.name.toLowerCase())}
                                    />
                                ))}
                            </SpeedDial>

                            <Dialog
                                open={openAddTaskModal}
                                TransitionComponent={Transition}
                                onClose={() => setOpenAddTaskModal(false)}
                                aria-describedby="add-task-modal"
                            >
                                <h1>ADD NEW TASK!</h1>
                                <p>TODO: add modal component instead direct text</p>

                            </Dialog>

                            <Dialog
                                fullWidth
                                open={openAddIdeaModal}
                                TransitionComponent={Transition}
                                onClose={() => setOpenAddIdeaModal(false)}
                                aria-describedby="add-idea-modal"
                            >
                                <AddIdeaForm handleClose={setOpenAddIdeaModal}/>

                            </Dialog>

                            <Dialog
                                open={openAddGoalModal}
                                TransitionComponent={Transition}
                                onClose={() => setOpenAddGoalModal(false)}
                                aria-describedby="add-goal-modal"
                            >
                                <h1>ADD NEW GOAL!</h1>
                                <p>TODO: add modal component instead direct text</p>

                            </Dialog>
                        </>
                    )
                    : ''
            }
        </>
    );
}

export default Dashboard;
