import {post, get, patch, del} from '../../../services/requester';

const PATH = 'tasks';

const addTask = (taskData) => {
    return post(`${PATH}/add`, taskData);
}

const updateTask = (taskId,updatedTask) => {
    return patch(`${PATH}/update/${taskId}`, updatedTask);
}

const deleteTask = (taskId) => {
    return del(`${PATH}/delete/${taskId}`);
}

const getById = (taskId) => {
    return get(`${PATH}/${taskId}`);
}

const getCheckListByTaskId = (taskId) => {
    return get(`${PATH}/checklist/${taskId}`);
}

const getAll = () => {
    return get(`${PATH}`);
}

export const taskService = {
    addTask,
    updateTask,
    deleteTask,
    getById,
    getCheckListByTaskId,
    getAll,
}