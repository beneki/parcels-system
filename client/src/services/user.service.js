import config from 'config';
import { authHeader } from '../helpers';
import jwt_decode from 'jwt-decode';

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            if (response.status === 401) { // unauthorized
                // auto logout if 401 response returned from api
               // logout();
                //location.reload(true);
                return Promise.reject(error);
            } else {
                return Promise.reject(error);
            }
        } else {
            return Promise.resolve(data);
        }

        return data;
    });
}, login = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    
    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            let decodedTK = '';
            if (user.token) {
                decodedTK = jwt_decode(user.token);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify({ ...user, role: decodedTK.role }));
            }

            return { ...user, role: decodedTK.role };
        });
}, logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}, getAll = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}; 

export const userService = {
    login,
    logout,
    getAll
};