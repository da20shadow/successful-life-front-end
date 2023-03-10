import {post, get, patch, del} from '../../../services/requester';

const PATH = 'goals';

const addGoal = (goalData) => {
    return post(`${PATH}/add`, goalData);
}

const updateGoal = (goalId,updatedGoal) => {
    return patch(`${PATH}/update/${goalId}`, updatedGoal);
}

const deleteGoal = (goalId) => {
    return del(`${PATH}/delete/${goalId}`);
}

const getById = (goalId) => {
    return get(`${PATH}/${goalId}`);
}

const getAll = () => {
    return get(`${PATH}`);
}

export const goalService = {
    addGoal,
    updateGoal,
    deleteGoal,
    getById,
    getAll,
}