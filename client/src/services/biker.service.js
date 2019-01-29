import config from 'config';
import { authHeader } from '../helpers';

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            } else if(response.status === 202) { // update operation has not been commited yet
                return Promise.reject(error);
            } else { // other errors
                return Promise.reject(error);
            }
        } else {
            /* Start: for future use */
            // if(response.status === 200) { // update operation commited (with additional data)
            //     return data;
            // } else if(response.status === 204) { // update operation commited (without additional data)
            //     return data;
            // } else {
            //     return data;
            // }
            /* End: for future use */
            return data;
        }
    });
}, getAll = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/bikers`, requestOptions).then(handleResponse);
};

export const bikerService = {
    getAll
};
