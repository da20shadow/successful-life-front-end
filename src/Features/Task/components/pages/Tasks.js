import React, {useEffect, useState} from "react";
import TasksList from "../layout/TasksList";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ListIcon from '@mui/icons-material/List';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

export default function Tasks({type}) {
    const iconStyle = {fontSize: '55px', color: '#ecc06e'};
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    useEffect(() => {
        // Fetch the appropriate tasks from the server based on the type prop
        let tasksList = [{id:1, title: 'Task title',status: 'To Do', priority: 'Medium',urgent:true,important:true, startDate: '2023-03-13 15:00', endDate: '2023-04-09 18:00'}];
        switch (type) {
            case 'urgent':
                setTitle( '🔥 Urgent Tasks')
                //TODO: make request to get all urgent tasks!
                // '/api/urgent-tasks';
                break;
            case 'important':
                setTitle('⚠️ Important Tasks')
                //TODO: make request to get all urgent tasks!
                // '/api/important-tasks';
                break;
            default:
                setTitle('All Tasks')
            //TODO: make request to get all tasks!
            // '/api/all-tasks';
        }
        setTasks(tasksList);
    }, [type]);

    return (
        <>
            <h1 className="text-gray-700 dark:text-gray-300 text-2xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
                {title}
            </h1>
            <section className="mx-1 md:mx-5">
                <TasksList tasks={tasks}/>
            </section>
        </>
    )
}