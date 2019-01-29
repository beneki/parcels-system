import { bikerConstants } from '../constants';
import { bikerService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

const getAll = () => {
    const request = () => { return { type: bikerConstants.GETBIKERS_REQUEST } },
          success = (bikers) => { return { type: bikerConstants.GETBIKERS_SUCCESS, bikers } },
          failure = (error) => { return { type: bikerConstants.GETBIKERS_FAILURE, error } };

    return dispatch => {
        dispatch(request());

        bikerService.getAll()
            .then(
                bikers => dispatch(success(bikers)),
                error => dispatch(failure(error))
            );
    };

}, bikerAssign = (biker) => {
    const change = () => { return { type: bikerConstants.SETASSIGNE_BIKER, biker } };

    return dispatch => { 
        dispatch(change());
    }

};

export const bikerActions = {
    getAll,
    bikerAssign
};