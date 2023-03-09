import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {format} from "date-fns";
import ListIcon from "@mui/icons-material/List";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from "@mui/material";
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import {CustomDateTimePicker, DropdownMenu} from "../../../../components";
import ProgressBar from "../../../Goal/components/common/ProgressBar";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TaskDetails() {

    const taskId = useParams();

    const [showEditStartDate, setShowEditStartDate] = useState(false);
    const [showEditEndDate, setShowEditEndDate] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [task, setTask] = useState({
        title: 'Task title here..',
        description: 'Task description is longer as always..',
        status: 'To Do',
        priority: 'Medium',
        urgent: false,
        important: true,
        createdAt: '2023-03-09 18:00',
        startDate: '2023-03-09 18:00',
        endDate: '2023-04-09 18:00',
        subtasks: [
            {id: 1, title: 'Subtask title one!', completed: false},
            {id: 2, title: 'Subtask title Two!', completed: false},
            {id: 3, title: 'Subtask title Three!', completed: true},
        ]
    })

    const startDatetimePickerRef = useRef(null);
    const endDatetimePickerRef = useRef(null);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const allSubtasksCompleted = task.subtasks.every(s => s.completed);
        if (allSubtasksCompleted) {
            setTask(prevState => ({...prevState, status: 'Completed'}));
        } else {
            setTask(prevState => ({...prevState, status: 'In Progress'}));
        }
    }, [task.subtasks]);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (startDatetimePickerRef.current && !startDatetimePickerRef.current.contains(event.target) &&
                endDatetimePickerRef.current && !endDatetimePickerRef.current.contains(event.target)) {
                setShowEditStartDate(false);
                setShowEditEndDate(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [startDatetimePickerRef, endDatetimePickerRef]);

    const handleUrgencyChange = () => {
        console.log(`Change Urgency From ${task.urgent} To: ${!task.urgent}`)
        setTask(oldTask => ({
            ...oldTask,
            urgent: !task.urgent
        }));
    }

    const handleImportanceChange = () => {
        setTask(oldTask => ({
            ...oldTask,
            important: !task.important
        }));
    }

    const handleStatusChange = (newStatus) => {

        if (newStatus === 'Completed') {
            const subtasksMarkedAsCompleted = task.subtasks.map(s => ({...s, completed: true}));
            return setTask(prevState => ({...prevState, subtasks: subtasksMarkedAsCompleted}));
        }

        const allSubtasksCompleted = task.subtasks.every(s => s.completed);
        if (allSubtasksCompleted && newStatus !== 'In Revision' && newStatus !== 'Completed') {
            alert('All subtasks are completed. The status can not be other than Completed or In Revision!')
            setTask(oldTask => ({
                ...oldTask,
                status: 'In Revision'
            }));
        } else {
            setTask(oldTask => ({
                ...oldTask,
                status: newStatus
            }));
        }

    };

    const handlePriorityChange = (newPriority) => {
        setTask(oldTask => ({
            ...oldTask,
            priority: newPriority
        }));
    };

    const handleStartDateChange = (newStartDate) => {
        //TODO: call updateTask and if not success reverse to old state!
        const prevStateTask = task;
        setTask(oldTask => ({
            ...oldTask,
            startDate: newStartDate
        }));
        // taskService.updateTask(task).then(t => {
        //
        // }).catch(err => {
        //     setTask(prevStateTask)
        // })
    };

    const handleEndDateChange = (newEndDate) => {
        //TODO: call updateTask and if not success reverse to old state!
        setTask(oldTask => ({
            ...oldTask,
            endDate: newEndDate
        }));
    };

    const updateTask = (updatedTask) => {
        //TODO: update task
        setShowEditStartDate(false);
        setShowEditEndDate(false);
    }

    const markSubtaskAsCompleted = (subtaskId) => {
        setTask(oldState => ({
            ...oldState,
            subtasks: task.subtasks.map(s => {
                return (s.id === subtaskId ? {...s, completed: !s.completed} : s)
            })
        }));
    }

    const addSubtask = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {title} = Object.fromEntries(formData);
        //TODO: When comes from the server then set it below and remove the fake ID
        setTask(prevState => ({
            ...prevState,
            subtasks: [...task.subtasks, {id: task.subtasks.length * 33, title, completed: false}]
        }));
        e.currentTarget.title.value = '';
    }

    const deleteSubtask = (subtaskId) => {
        //TODO: delete from DB then remove from the task state!
        setTask(oldState => ({
            ...oldState,
            subtasks: task.subtasks.filter(s => s.id !== subtaskId)
        }));

        setOpenDeleteModal(false);
    }

    const priorityArr = [
        {name: 'High', icon: <FlagIcon color={'error'}/>},
        {name: 'Medium', icon: <FlagIcon color={'warning'}/>},
        {name: 'Low', icon: <FlagIcon color={'info'}/>},
        {name: 'No Priority', icon: <OutlinedFlagTwoToneIcon/>},
    ];

    const createPriorityFlag = (priorityName) => {
        const priority = priorityArr.find(p => p.name.toLowerCase() === priorityName.toLowerCase());
        return (priority.icon);
    }

    let completedSubtasks = task.subtasks.filter((task) => {
        return task.completed === true;
    }).length;
    const progressPercentage = Math.floor((completedSubtasks / task.subtasks.length) * 100);

    const taskProgressBgColor = progressPercentage <= 33
        ? 'bg-rose-600' : progressPercentage <= 66 && progressPercentage > 33
            ? 'bg-orange-600' : 'bg-green-600';

    return (
        <>
            <h1 className="text-gray-700 dark:text-gray-300 text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-center">
                {task.urgent ? '🔥' : ''}
                {task.important ? '⚠️' : ''}
                Task Title
            </h1>
            <section className={'mx-1 md:mx-5 p-5 bg-white dark:bg-gray-800 border rounded-lg shadow-lg'}>

                <header className="flex flex-wrap gap-5 pb-5 border-b">

                    {/*Urgent & Important Marks*/}
                    <div className="flex items-center">
                        <Checkbox onClick={() => handleUrgencyChange()}
                                  checked={task.urgent}
                                  icon={<LocalFireDepartmentOutlinedIcon sx={{fontSize: '39px'}} className="text-gray-700 dark:text-gray-300"/>}
                                  checkedIcon={<LocalFireDepartmentIcon sx={{fontSize: '39px'}} className="text-orange-300"/>}/>
                        <Checkbox onClick={() => handleImportanceChange()}
                                  checked={task.important}
                                  icon={<NewReleasesOutlinedIcon sx={{fontSize: '39px'}} className="text-gray-700 dark:text-gray-300"/>}
                                  checkedIcon={<NewReleasesIcon sx={{fontSize: '39px'}} className="text-orange-300"/>}/>
                    </div>

                    {/*Priority*/}
                    <div className={'my-[9px] border rounded-full'}>
                        <DropdownMenu
                            isLeftPosition={true}
                            options={priorityArr}
                            value={createPriorityFlag(task.priority)}
                            onChange={handlePriorityChange}
                        />
                    </div>

                    {/*Status*/}
                    <div className={'min-w-[105px] my-[9px] border rounded-lg'}>
                        <DropdownMenu
                            isLeftPosition={true}
                            options={[{name: "To Do"}, {name: "In Progress"}, {name: "In Revision"}, {name: "Completed"}]}
                            value={task.status}
                            onChange={handleStatusChange}
                        />
                    </div>

                    {/*Created at*/}
                    <div className={'pr-3 text-sm border-r'}>
                        <p className={'uppercase'}>Created</p>
                        {format(new Date(task.createdAt), 'd MMM, yyyy HH:mm')}
                    </div>

                    {/*Start Date*/}
                    <div className={'pr-3 relative text-sm border-r'} ref={startDatetimePickerRef}
                         onDoubleClick={() => setShowEditStartDate(true)}>
                        <p className={'uppercase'}>Start Date</p>
                        <TodayOutlinedIcon/>
                        {format(new Date(task.startDate), 'd MMM, yyyy HH:mm')}
                        {showEditStartDate
                            ? (
                                <div
                                    className="fixed centered md:absolute z-50 md:top-10 md:left-[-110px] p-5 bg-gray-100 dark:bg-gray-900 border rounded-md shadow-lg">
                                    <span>Start Date:</span>
                                    <CustomDateTimePicker inputValue={task.startDate}
                                                          onChange={handleStartDateChange}/>
                                    <div className={'flex justify-start'}>
                                        <Button onClick={() => setShowEditStartDate(false)}>Cancel</Button>
                                        <Button onClick={updateTask}>Set</Button>
                                    </div>
                                </div>
                            )
                            : ''
                        }
                    </div>

                    {/*End Date*/}
                    <div className={'pr-3 relative text-sm border-r'} ref={endDatetimePickerRef}
                         onDoubleClick={() => setShowEditEndDate(true)}>
                        <p className={'uppercase'}>End Date</p>
                        <InsertInvitationOutlinedIcon/>
                        {format(new Date(task.endDate), 'd MMM, yyyy HH:mm')}
                        {showEditEndDate
                            ? (
                                <div
                                    className="fixed centered md:absolute z-50 md:top-10 md:left-[-110px] p-5 bg-gray-100 dark:bg-gray-900 border rounded-md shadow-lg">
                                    <span>End Date:</span>
                                    <CustomDateTimePicker inputValue={task.endDate}
                                                          onChange={handleEndDateChange}/>
                                    <div className={'flex justify-start'}>
                                        <Button onClick={() => setShowEditEndDate(false)}>Cancel</Button>
                                        <Button onClick={updateTask}>Set</Button>
                                    </div>
                                </div>
                            )
                            : ''
                        }
                    </div>

                </header>

                <main className={'my-5'}>

                    {/* Task Progress */}
                    <ProgressBar bgColor={taskProgressBgColor} progress={progressPercentage}/>

                    {/*Task Description*/}
                    <h4 className={'mt-5 mb-1 text-xl text-gray-700 dark:text-gray-300'}>
                        <TextSnippetIcon/> Task Description
                    </h4>

                    <div className={'mb-5 p-2 md:p-5 border bg-gray-50 dark:bg-gray-800'}>
                        {task.description}
                    </div>

                </main>

                {/*Sub tasks list*/}
                <h4 className={'text-lg font-semibold'}>Subtasks:</h4>
                {
                    task.subtasks.map(s => (
                        <div key={s.id} >
                            <Checkbox onChange={() => markSubtaskAsCompleted(s.id)}
                                   className={'mr-2 text-gray-700 dark:text-gray-300'}
                                   color={'success'}
                                   checked={s.completed === true}/>
                            <span onClick={() => markSubtaskAsCompleted(s.id)}
                                  className={`${s.completed ? 'line-through' : ''} hover:text-gray-600 cursor-pointer`}>{s.title}</span>
                            <span onClick={()=>setOpenDeleteModal(true)} className={'ml-3 cursor-pointer text-rose-300'}>
                                <DeleteIcon />
                            </span>

                            {/*Open DELETE confirmation Modal*/}
                            <Dialog
                                open={openDeleteModal}
                                TransitionComponent={Transition}
                                onClose={()=>setOpenDeleteModal(false)}
                                aria-describedby="alert-dialog-slide-description"
                            >

                                <DialogTitle className={'text-center text-rose-900 bg-rose-50 dark:bg-rose-100'} >
                                    <WarningAmberIcon sx={{fontSize: '65px'}} />
                                </DialogTitle>

                                <DialogContent className={'bg-rose-50 dark:bg-rose-100'}>

                                    {/*<h2 className={'text-2xl font-bold text-center text-rose-900 bg-rose-50 dark:bg-rose-100'}>DELETE Idea</h2>*/}

                                    <DialogContentText sx={{textAlign: 'center'}} id="alert-dialog-slide-description">
                                        Are you sure you want to delete the subtask:
                                        <span className="italic text-gray-700"> "{s.title}" </span>?
                                    </DialogContentText>

                                </DialogContent>

                                <DialogActions className={'bg-rose-50 dark:bg-rose-100'}>
                                    <Button onClick={()=>setOpenDeleteModal(false)}>Cancel</Button>
                                    <Button color="error" onClick={()=>deleteSubtask(s.id)}>DELETE</Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                    ))
                }

                {/*Add Subtask input*/}
                <div className={'mt-5'}>
                    <form onSubmit={addSubtask} className={'flex w-full bg-gray-100 dark:bg-gray-900 border rounded-lg'}>
                        <input name={'title'} className={'px-2 w-full py-1 border-none outline-none text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-l-lg'}
                               type="text"
                               placeholder={'Subtask title..'}
                               minLength={'3'}
                               required />
                        <Button type={'submit'} className={'m-0'}>
                            <AddTaskOutlinedIcon/>
                            <span className={'ml-2'}>Add</span>
                        </Button>
                    </form>
                </div>

            </section>

        </>
    );
}