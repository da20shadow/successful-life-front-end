import React, {useState} from "react";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {Dialog, Slide, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {AddIdeaForm} from "../../../Ideas/components";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Dashboard({ user }) {
    //Set states for Goal, Idea and Task modals
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
    const [openAddIdeaModal, setOpenAddIdeaModal] = useState(false);
    const [openAddGoalModal, setOpenAddGoalModal] = useState(false);

    const goals = [
        { label: 'Urgent Tasks', count: 3 },
        { label: 'Important Tasks', count: 8 },
        { label: 'Ideas', count: 2 },
        { label: 'Achievements', count: 10 },
    ];

    const tasks = [
        { id: 1, title: 'Task 1', status: 'In Progress', dueDate: '2022-03-01' },
        { id: 2, title: 'Task 2', status: 'Not Started', dueDate: '2022-03-05' },
        { id: 3, title: 'Task 3', status: 'Completed', dueDate: '2022-03-03' }
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

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-gray-700 dark:text-gray-300 text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
                    Welcome, {user.firstName}!
                </h1>
                <div className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {goals.map((goal) => (
                        <div
                            key={goal.label}
                            className="bg-white dark:bg-gray-600 shadow-md p-8 rounded-md flex flex-col justify-center items-center"
                        >
                            <p className="text-gray-700 dark:text-blue-300 text-3xl font-bold">{goal.count}</p>
                            <h4 className="text-gray-700 dark:text-gray-300 text-lg mb-4">{goal.label}</h4>
                        </div>
                    ))}
                </div>

                <h2 className={'text-gray-700 dark:text-rose-100 text-3xl font-bold text-center'}>Urgent tasks!</h2>

                <table className="mt-5 w-full">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task.id} className={`${index % 2 === 0 
                            ? 'dark:bg-gray-700 bg-gray-200' 
                            : 'dark:bg-gray-700 bg-gray-100' } dark:hover:bg-gray-900 bg-gray-300`}>
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
