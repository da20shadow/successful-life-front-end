import React, { useState, useEffect } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { format } from 'date-fns';
import {Dialog, Fab, Slide} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {NavLink} from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const GoalsList = () => {

    const [goals, setGoals] = useState([
        {id: 1,title: 'Goal Title One', createdAt: '2023-03-05',deadline: '2023-04-09',
            completedTargets: 2, totalTargets: 10 },
        {id: 2,title: 'Goal Title Two', createdAt: '2023-03-08',deadline: '2023-04-07',
            completedTargets: 4, totalTargets: 10 },
        {id: 3,title: 'Goal Title Three', createdAt: '2023-02-08',deadline: '2023-03-07',
            completedTargets: 6, totalTargets: 10 },
        {id: 4,title: 'Goal Title Four', createdAt: '2023-02-18',deadline: '2023-03-04',
            completedTargets: 9, totalTargets: 10 },
        {id: 5,title: 'Goal Title Five', createdAt: '2023-02-18',deadline: '2023-03-04',
            completedTargets: 10, totalTargets: 10 }
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

    const goalCardStyle = `p-5 cursor-pointer relative bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-[#283445] 
    shadow hover:shadow-lg hover:-translate-y-1 active:scale-[0.95] transition duration-500 ease-in-out 
    border border-transparent hover:border-gray-300 hover:dark:border-gray-300 rounded-md`;

    return (
        <>
            <div className="m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {goals.map((goal) => {
                    const progress = Math.floor((goal.completedTargets / goal.totalTargets) * 100);
                    return (
                        <NavLink key={goal.id} to={`/goals/${goal.id}`}>
                    <div className={goalCardStyle}>
                            <h3 className="text-lg font-bold mb-2">{goal.title}</h3>
                        <p className="text-gray-500 text-sm mb-2">Created: {format(new Date(goal.createdAt), 'MMM dd, yyyy')}</p>
                        <p className="text-gray-500 text-sm mb-4">Deadline: {format(new Date(goal.deadline), 'MMM dd, yyyy')}</p>
                        <div className="p-12 flex items-center justify-center mb-4">
                            <CircularProgressbar value={progress} text={`${progress}%`}
                                                 strokeWidth={6}
                                                 styles={{ path: { stroke: `hsl(${progress}, 100%, 50%)` } }} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-gray-500 text-sm">{goal.completedTargets} of {goal.totalTargets} targets completed</p>
                            <p className="text-gray-500 text-sm">{goal.category}</p>
                        </div>
                    </div>
                        </NavLink>
                )})}
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
                <p>TODO: create add goal form</p>

            </Dialog>
        </>
    );
};

export default GoalsList;
