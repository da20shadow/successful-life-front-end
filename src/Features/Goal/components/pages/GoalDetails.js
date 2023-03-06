import React, {useState} from 'react';
import ProgressBar from '../common/ProgressBar';
import {calculateDailyTargetPercentage, calculateDaysLeft} from "../../utils/helpers";
import {useParams} from "react-router-dom";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {Dialog, Fab, Slide} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DoneIcon from '@mui/icons-material/Done';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import {format} from "date-fns";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const GoalDetails = () => {
    const {goalId} = useParams();
    //Set states for Goal modal
    const [openAddTargetModal, setOpenAddTargetModal] = useState(false);

    //TODO: Get Goal Details and targets
    const goal = {
        title: 'Goal title here',
        description: 'Goal Description is here...',
        category: 'Business',
        createdAt: '2023-03-05',
        deadline: '2023-04-09',
        targets: [
            {title: 'Target zero!', completedTasks: 10, totalTasks: 10},
            {title: 'Target one!', completedTasks: 8, totalTasks: 10},
            {title: 'Target two!', completedTasks: 4, totalTasks: 9},
            {title: 'Target three!', completedTasks: 0, totalTasks: 5},
        ]
    }

    const daysLeft = calculateDaysLeft(goal.createdAt, goal.deadline);

    const [targets, setTargets] = useState(goal.targets);

    const handleTargetCompletion = (index, isCompleted) => {
        //TODO:
        const updatedTargets = [...targets];
        updatedTargets[index].isCompleted = isCompleted;
        setTargets(updatedTargets);
    };

    const completedTargets = targets.filter((target) => {
        return target.totalTasks > 0 && target.completedTasks === target.totalTasks;
    }).length;
    const progressPercentage = Math.floor((completedTargets / targets.length) * 100);

    const goalProgressBgColor = progressPercentage <= 33
        ? 'bg-rose-600' : progressPercentage <= 66 && progressPercentage > 33
            ? 'bg-orange-600' : 'bg-green-600';
    const goalProgressTextColor = progressPercentage <= 33
        ? 'text-rose-500' : progressPercentage <= 66 && progressPercentage > 33
            ? 'text-orange-500' : 'text-green-500';


    //Open modal for adding new goal
    const addNewTarget = () => {
        setOpenAddTargetModal(true);
    };

    const tableBodyRow = `text-center border border-transparent dark:hover:border-gray-600 dark:hover:text-[#f0f8ff] dark:bg-[#252f3f] dark:hover:bg-gray-900 dark:odd:bg-gray-800`;
    const tableBodyRowTD = `py-3 whitespace-nowrap border-l dark:border-gray-600 cursor-pointer`;
    return (
        <>
            {/*Goal TITLE*/}
            <h1 className="text-center text-gray-700 dark:text-gray-300 text-[25px] md:text-3xl font-bold">
                <span className="dark:text-orange-200">🏆 GOAL: </span>{goal.title}
            </h1>

            <div className="m-5 px-4 py-6 bg-white dark:bg-gray-800 border rounded shadow">

                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 mb-4">

                    {/*Category, Progress and Targets*/}
                    <div>
                        <p className="mb-3 text-gray-700 dark:text-gray-300">
                            <LabelImportantIcon/> Category: {goal.category}</p>
                        <p className="mb-3 text-gray-700 dark:text-gray-300">
                            <DonutLargeIcon/> Progress:
                            <span className={goalProgressTextColor}> {progressPercentage}%</span>
                        </p>
                        <div className="flex gap-3 text-gray-700 dark:text-gray-300">
                            <GpsFixedIcon/>Targets:
                            <span className="text-sm px-3 flex justify-center items-center border rounded-full">
                                <DoneIcon/> {completedTargets} of {goal.targets.length}
                            </span>
                        </div>

                    </div>

                    {/*Created at, Deadline and days left*/}
                    <div>
                        <p className="mb-3 text-gray-700 dark:text-gray-300">
                            <TodayOutlinedIcon/> Created: {format(new Date(goal.createdAt), 'MMM dd, yyyy')}</p>
                        <p className="mb-3 text-gray-700 dark:text-gray-300">
                            <InsertInvitationOutlinedIcon/> Deadline: {format(new Date(goal.deadline), 'MMM dd, yyyy')}
                        </p>
                        <p className="mb-3 text-gray-700 dark:text-gray-300">
                            <WatchLaterOutlinedIcon/> Days Left: {daysLeft}
                        </p>
                    </div>

                </div>

                {/*Goal Progress bar & daily target info*/}
                <section
                    className="mb-4 flex flex-wrap md:flex-nowrap gap-3 justify-start md:justify-center items-center">
                    <ProgressBar bgColor={goalProgressBgColor} progress={progressPercentage}/>
                    <span className={'px-2 text-sm whitespace-nowrap border'}>
                        <PlaylistAddCheckOutlinedIcon/>
                        Today's target: <strong>{calculateDailyTargetPercentage(goal.deadline)}%</strong>
                    </span>
                </section>

                <h4 className={'mb-3 text-xl text-gray-700 dark:text-gray-300 border-b'}>
                    <TextSnippetIcon/> Goal Description</h4>
                <div>
                    {goal.description}
                </div>

            </div>

            {/*Targets List*/}
            <section className="mx-5">
                <table className="table-auto w-full">
                    <thead>
                    <tr className={'bg-[#364962] dark:bg-[#364962]'}>
                        <th className="py-4 uppercase text-center">Target</th>
                        <th className="py-4 uppercase text-center">Progress</th>
                    </tr>
                    </thead>
                    <tbody>
                    {goal.targets.map((target, index) => (
                        <tr key={index} className={tableBodyRow}>
                            <td className={tableBodyRowTD + ' w-[75%]'}>{target.title}</td>
                            <td className={tableBodyRowTD}>
                                <div className={'w-[82%] mx-auto flex justify-between text-[12px]'}>
                                    <span>tasks</span>
                                    <span>{target.completedTasks}/{target.totalTasks}</span>
                                </div>
                                <div className={'w-[85%] mx-auto'}>
                                    <ProgressBar bgColor={'bg-green-600'}
                                                 progress={Math.floor((target.completedTasks / target.totalTasks) * 100)}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            {/*Add Target Button*/}
            <Fab sx={{position: 'fixed', bottom: 65, right: 16}}
                 onClick={() => addNewTarget()}
                 color="primary" aria-label="add">
                <AddIcon/>
            </Fab>

            <Dialog
                fullWidth
                open={openAddTargetModal}
                TransitionComponent={Transition}
                onClose={() => setOpenAddTargetModal(false)}
                aria-describedby="add-idea-modal"
            >
                <h2>Add New Goal Target</h2>
                <p>TODO: create add goal target form</p>

            </Dialog>
        </>
    );
};

export default GoalDetails;
