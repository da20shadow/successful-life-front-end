import {ENV} from "../constants";

const request = async (path, data, method) => {
    const options = {method, headers: {"Content-type": "Application/JSON"},credentials: 'include'};
    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${ENV.API_URL}/${path}`, options);
    return responseHandler(response);
}

export const get = async (path) => {
    return request(path, '', 'GET');
}
export const post = async (path,data) => {
    return request(path, data,'POST');
}
export const patch = async (path,data) => {
    return request(path,data,'PATCH');
}
export const del = async (path,data) => {
    return request(path,data,'DELETE');
}

async function responseHandler(response) {
    const result = await response.json();

    if (response.ok) {
        return result;
    } else {
        if (response.status === 401) {
            localStorage.removeItem('token');
        }
        throw result;
    }
}