import React, {useState} from "react";
import {DropdownMenu} from "../../../../components";
import {NavLink} from "react-router-dom";
import {CustomDateTimePicker} from "../../../../components";
import {Button, Tooltip} from "@mui/material";
import {format} from "date-fns";
import FlagIcon from "@mui/icons-material/Flag";
import OutlinedFlagTwoToneIcon from '@mui/icons-material/OutlinedFlagTwoTone';

export default function TaskTableRow({task}) {
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority);
    const [startDate, setStartDate] = useState(task.startDate);
    const [endDate, setEndDate] = useState(task.endDate);

    const [showSetStartDate, setShowStartDate] = useState(false);
    const [showSetEndDate, setShowEndDate] = useState(false);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    const handlePriorityChange = (newPriority) => {
        setPriority(newPriority);
    };

    const handleStartDateChange = (newStartDate) => {
        setStartDate(newStartDate);
    };

    const handleEndDateChange = (newEndDate) => {
        setEndDate(newEndDate);
    };

    const updateTask = () => {

        //TODO: If update is successful close the datetime picker popup!
        setTimeout(() => {
            setShowStartDate(false);
            setShowEndDate(false);
        },1500)
        console.log('New Start Date: ',startDate)
    }

    const priorityArr = [
        {name: 'High', icon: <FlagIcon color={'error'}/>},
        {name: 'Medium', icon: <FlagIcon color={'warning'}/>},
        {name: 'Low', icon: <FlagIcon color={'info'}/>},
        {name: 'No Priority', icon: <OutlinedFlagTwoToneIcon />},
    ];

    const createPriorityFlag = (priorityName) => {
        const priority = priorityArr.find(p => p.name.toLowerCase() === priorityName.toLowerCase());
        return ( priority.icon );
    }

    const tableBodyRow = `text-center border border-transparent hover:border-gray-300 hover:text-gray-600 bg-gray-50 odd:bg-gray-100
    dark:hover:border-gray-600 dark:hover:text-[#f0f8ff] dark:bg-[#252f3f] dark:hover:bg-gray-900 dark:odd:bg-gray-800`;
    const tableBodyRowTD = `py-2 text-center whitespace-nowrap hover:bg-gray-200 dark:hover:bg-[#4b5563] border-l dark:border-gray-600 text-sm`;

    return (
        <tr className={tableBodyRow}>
            <td className={tableBodyRowTD + ' px-2 w-[45%]'}>
                <div className="flex justify-between items-center">
                    <NavLink to={`/tasks/${task.id}`}>
                        {task.title}
                    </NavLink>
                    <div className="flex">
                        {task.urgent ? (<Tooltip title="Urgent" placement="top"><span className={'text-lg'}>🔥</span></Tooltip>) : ''}
                        {task.important ? (<Tooltip title="Important" placement="top"><span className={'text-lg'}>⚠️</span></Tooltip>) : ''}
                    </div>
                </div>
            </td>
            <td className={tableBodyRowTD + ' w-[15%]'}>
                <DropdownMenu
                    options={[{name:"To Do"}, {name:"In Progress"}, {name:"In Revision"}, {name:"Completed"}]}
                    value={status}
                    onChange={handleStatusChange}
                />
            </td>
            <td className={tableBodyRowTD + ' w-[10%]'}>
                <DropdownMenu
                    options={priorityArr}
                    value={createPriorityFlag(priority)}
                    onChange={handlePriorityChange}
                />
            </td>
            <td className={tableBodyRowTD + ' w-[15%] hidden md:table-cell relative'} onDoubleClick={() => setShowStartDate(true)}>
                {format(new Date(startDate), 'd MMM, yyyy HH:mm')}
                {showSetStartDate
                    ? (
                        <div
                            className="absolute z-50 top-10 left-[-110px] p-5 bg-gray-100 dark:bg-gray-900 border rounded-md">
                            <span className={'text-gray-700 dark:text-gray-300'}>Start Date:</span>
                            <CustomDateTimePicker inputValue={startDate}
                                                  onChange={handleStartDateChange}/>
                            <div className={'flex justify-start'}>
                                <Button onClick={() => setShowStartDate(false)}>Cancel</Button>
                                <Button onClick={updateTask}>Set</Button>
                            </div>
                        </div>
                    )
                    : ''
                }
            </td>
            <td className={tableBodyRowTD + ' w-[15%] hidden md:table-cell relative'} onDoubleClick={()=>setShowEndDate(true)}>
                {format(new Date(endDate), 'd MMM, yyyy HH:mm')}
                {showSetEndDate
                    ? (
                        <div
                            className="absolute z-50 top-10 left-[-110px] p-5 bg-gray-100 dark:bg-gray-800 border rounded-md">
                            <span className={'text-gray-700 dark:text-gray-300'}>End Date:</span>
                            <CustomDateTimePicker inputValue={endDate}
                                                  onChange={handleEndDateChange}/>
                            <div className={'flex justify-start'}>
                                <Button onClick={() => setShowEndDate(false)}>Cancel</Button>
                                <Button onClick={updateTask}>Set</Button>
                            </div>
                        </div>
                    )
                    : ''
                }
            </td>
        </tr>
    );
}
