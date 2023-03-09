import React, {useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import {format} from "date-fns";
import ProgressBar from "../../../Goal/components/common/ProgressBar";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import FlagIcon from '@mui/icons-material/Flag';
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TasksList from "../../../Task/components";
import {CKERichTextEditor} from "../../../../components";
import {Button, Dialog, Fab, Slide} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TargetDetails() {

    const {targetId} = useParams();

    const [editDescription, setEditDescription] = useState(false);

    //Set states for adding Task modal
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);

    //TODO: Get Target Details and tasks
    const target = {
        title: 'Target title here',
        description: 'Target Description is here...',
        createdAt: '2023-03-05',
        tasks: [
            {
                id: 1,
                title: 'Task zero!',
                status: 'In Progress',
                priority: 'High',
                urgent:true,
                important: true,
                startDate: '2023-03-01 15:30:00',
                endDate: '2023-04-09 18:30:00'
            },
            {
                id: 2,
                title: 'Task one!',
                status: 'To Do',
                priority: 'Medium',
                urgent:true,
                important: false,
                startDate: '2023-03-01 15:30:00',
                endDate: '2023-04-09 18:30:00'
            },
            {
                id: 3,
                title: 'Task two!',
                status: 'In Revision',
                priority: 'Low',
                urgent:false,
                important: false,
                startDate: '2023-03-01 15:30:00',
                endDate: '2023-04-09 18:30:00'
            },
            {
                id: 4,
                title: 'Task three!',
                status: 'Completed',
                priority: 'No Priority',
                urgent:false,
                important: false,
                startDate: '2023-03-01 15:30:00',
                endDate: '2023-04-09 18:30:00'
            },
        ]
    }

    const completedTasks = target.tasks.filter((task) => {
        return task.status === 'Completed';
    }).length;
    const progressPercentage = Math.floor((completedTasks / target.tasks.length) * 100);

    const targetProgressBgColor = progressPercentage <= 33
        ? 'bg-rose-600' : progressPercentage <= 66 && progressPercentage > 33
            ? 'bg-orange-600' : 'bg-green-600';

    const tableBodyRow = `text-center border border-transparent hover:border-gray-300 hover:text-gray-600 bg-gray-50 odd:bg-gray-100
    dark:hover:border-gray-600 dark:hover:text-[#f0f8ff] dark:bg-[#252f3f] dark:hover:bg-gray-900 dark:odd:bg-gray-800`;
    const tableBodyRowTD = `py-3 text-center whitespace-nowrap hover:bg-gray-200 dark:hover:bg-[#4b5563] border-l dark:border-gray-600 cursor-pointer text-sm`;

    const statuses = ['To Do', 'In Progress', 'In Revision', 'Completed'];

    const priorityArr = [
        {name: 'High', icon: <FlagIcon color={'error'}/>},
        {name: 'Medium', icon: <FlagIcon color={'warning'}/>},
        {name: 'Low', icon: <FlagIcon color={'info'}/>},
        {name: 'No Priority', icon: <FlagIcon color={'disabled'}/>},
    ];

    const createPriorityFlag = (priorityName) => {
        const priority = priorityArr.find(p => p.name.toLowerCase() === priorityName.toLowerCase());
        return ( priority.icon );
    }

    const handleTaskStatusChange = (status) => {
        console.log('Status for task ID changed! New Status: ', status)
    }
    const handleStartDateChange = (taskId, newStartDate) => {
        console.log('Task ID: ', taskId)
        console.log('New Start Date: ', newStartDate)
    }
    const handleEndDateChange = (taskId, newEndDate) => {
        console.log('Task ID: ', taskId)
        console.log('New End Date: ', newEndDate)
    }
    const handleCloseEditor = () => {
        setEditDescription(false);
    }
    return (
        <>
            {/*Target TITLE*/}
            <h1 className="text-center text-gray-700 dark:text-gray-300 text-[25px] md:text-3xl font-bold">
                <span className="dark:text-orange-200">🎯 Target: </span>{target.title}
            </h1>

            {/*Target Details*/}
            <div className="m-1 md:m-5 px-4 py-6 bg-white dark:bg-gray-800 border rounded shadow">

                {/*Target Progress bar & daily target info*/}
                <ProgressBar bgColor={targetProgressBgColor} progress={progressPercentage}/>

                <h4 className={'mt-5 text-xl text-gray-700 dark:text-gray-300'}>
                    <TextSnippetIcon/> Target Description
                </h4>

                <div onDoubleClick={()=>setEditDescription(true)}
                     className={'my-5 p-2 md:p-5 border'}>

                    {/*TODO: create my own rich text editor*/}
                    {editDescription
                        ? (<><CKERichTextEditor initialValue={target.description} />
                            <Button onClick={()=>setEditDescription(false)}>Close Editor</Button></>)
                        : target.description }


                </div>

                <div className="flex flex-wrap items-center justify-between">
                    {/*Tasks completed/total*/}
                    <div className="flex gap-3 text-gray-700 dark:text-gray-300">
                            <span>
                                <PlaylistAddCheckOutlinedIcon/> Tasks:
                            </span>
                        <span className="h-[23px] text-sm px-3 flex justify-center items-center border rounded-full">
                                <DoneIcon/> {completedTasks} of {target.tasks.length}
                            </span>
                    </div>

                    {/*Created at*/}
                    <p className="mt-5 text-sm text-gray-700 dark:text-gray-300">
                        <TodayOutlinedIcon/> Created: {format(new Date(target.createdAt), 'MMM dd, yyyy')}
                    </p>
                </div>

            </div>

            {/*Tasks List*/}
            <section className={'m-1 md:my-10 md:mx-5'}>
                <TasksList tasks={target.tasks} />
            </section>

            {/*Add Task Button*/}
            <Fab sx={{position: 'fixed', bottom: 65, right: 16}}
                 onClick={() => setOpenAddTaskModal(true)}
                 color="primary" aria-label="add">
                <AddIcon/>
            </Fab>

            <Dialog
                fullWidth
                open={openAddTaskModal}
                TransitionComponent={Transition}
                onClose={() => setOpenAddTaskModal(false)}
                aria-describedby="add-idea-modal"
            >
                <h2>Add New Goal Task</h2>
                <p>TODO: create add goal task form</p>

            </Dialog>

        </>
    )
}

export default TargetDetails;