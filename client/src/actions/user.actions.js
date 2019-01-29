import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';


const login = (username, password) => {
    const request = (user) => ({ type: userConstants.LOGIN_REQUEST, user }),
          success = (user) => ({ type: userConstants.LOGIN_SUCCESS, user }),
          failure = (error) => ({ type: userConstants.LOGIN_FAILURE, error });
    
        
          return dispatch => {
            return new Promise((resolve, reject) => {
                dispatch(request({ username }));

                userService.login(username, password)
                    .then(
                        user => { 
                            dispatch(success(user));
                            dispatch(alertActions.success("ok"));
                            resolve(user);
                        },
                        error => {
                            dispatch(alertActions.error(error));
                            dispatch(failure(error));
                           // reject(error);
                        }
                    );
            });
          };
        


}, logout = () => {
    userService.logout();
    return { type: userConstants.LOGOUT };

}, getAll = () => {
    const request = () => { return { type: userConstants.GETALL_REQUEST } },
          success = (users) => { return { type: userConstants.GETALL_SUCCESS, users } },
          failure = (error) => { return { type: userConstants.GETALL_FAILURE, error } };

    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

};

export const userActions = {
    login,
    logout,
    getAll
};