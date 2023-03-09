import React from "react";
import TaskTableRow from "../common/TaskTableRow";

function TasksList({tasks}){
    return (
        <table className="table-auto w-full">
            <thead>
            <tr className={'bg-white dark:bg-[#364962]'}>
                <th className="py-4 uppercase text-center w-[45%]">Task Title</th>
                <th className="py-4 uppercase text-center w-[15%]">Status</th>
                <th className="py-4 uppercase text-center w-[10%]">Priority</th>
                <th className="py-4 uppercase text-center hidden md:table-cell w-[15%]">Start Date</th>
                <th className="py-4 uppercase text-center hidden md:table-cell w-[15%]">End Date</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((task) => (
                <TaskTableRow key={task.id} task={task} />
            ))}
            </tbody>
        </table>
    )
}
export default TasksList;